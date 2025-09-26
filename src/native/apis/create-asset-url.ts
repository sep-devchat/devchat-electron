import path from 'path';
import { app } from 'electron';
import { NativeAPIHandler } from '../types';

const createAssetUrl: NativeAPIHandler = async (e, relPath: string) => {
    if (!app.isPackaged) {
        return path.join('assets', relPath);
    }

    // Packaged: renderer likely loaded via file:// so direct file reference works.
    const assetsPath = path.join(process.resourcesPath, 'assets', relPath);
    const prefix = process.platform === 'win32' ? 'file:///' : 'file://';
    return `${prefix}${assetsPath.replace(/\\/g, '/')}`;
};

export default createAssetUrl;