import { app, BrowserWindow, ipcMain, Notification } from "electron";
import path from "node:path";
import started from "electron-squirrel-startup";
import nativeAPI from "./native/native-api";

const SCHEME = "devchat";

let mainWindow: BrowserWindow | null = null;

interface DeepLinkPayload {
  url: string;
  code?: string;
}

let pendingDeepLink: DeepLinkPayload | undefined; // store until window ready

function extractDeepLinkFromArgv(argv: string[]): string | undefined {
  return argv.find(a => a.startsWith(`${SCHEME}://`));
}

function parseDeepLink(url: string): DeepLinkPayload {
  let code: string | undefined;
  try {
    const u = new URL(url);
    if (u.protocol.replace(/:$/, "") === SCHEME) {
      code = u.searchParams.get("code") ?? undefined;
    }
  } catch (err) {
    console.warn("Failed to parse deep link", url, err);
  }
  return { url, code };
}

function handleDeepLink(url: string) {
  const payload = parseDeepLink(url);
  // console.log("Deep link received:", payload);
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
    // Send structured payload { url, code }
    mainWindow.webContents.send("deep-link", payload);
  } else {
    pendingDeepLink = payload; // will be sent once window created
  }
}

// Capture deep link on first instance launch (Windows/Linux). On macOS first link may come via open-url.
const firstLaunchLink = extractDeepLinkFromArgv(process.argv);
if (firstLaunchLink) {
  pendingDeepLink = parseDeepLink(firstLaunchLink);
}

// Single instance lock must be acquired before setting up second-instance handling.
const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on("second-instance", (_event, argv) => {
    const url = extractDeepLinkFromArgv(argv);
    if (url) handleDeepLink(url);
  });
}

// macOS deep link event
app.on("open-url", (event, url) => {
  event.preventDefault();
  handleDeepLink(url);
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    autoHideMenuBar: true
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  mainWindow.maximize();

  mainWindow.on("closed", () => { mainWindow = null; });

  // After first paint, deliver any pending deep link
  mainWindow.webContents.once("did-finish-load", () => {
    if (pendingDeepLink) {
      if (pendingDeepLink) {
        mainWindow?.webContents.send("deep-link", pendingDeepLink);
      }
      pendingDeepLink = undefined;
    }
  });

  // Open the DevTools (uncomment if needed)
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  Object.entries(nativeAPI).forEach(([key, val]) => ipcMain.handle(key, val));

  // Register custom protocol (returns false if failed / already registered by another build)
  const registered = process.defaultApp
    ? app.setAsDefaultProtocolClient(SCHEME, process.execPath, [path.resolve(process.argv[1])])
    : app.setAsDefaultProtocolClient(SCHEME);
  console.log(`Protocol ${SCHEME} registration result:`, registered);

  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
