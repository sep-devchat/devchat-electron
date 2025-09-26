import path from 'path';
import { app } from 'electron';
import { NativeAPIHandler } from '../types';

const createAssetUrl: NativeAPIHandler = async (e, relPath: string) => {
    // Build an absolute URL based on the renderer's current URL (dev: http(s)://, prod: file://)
    const base = e.sender.getURL();
    // `publicDir` serves files from its root, so do NOT prefix with 'assets/'
    const normalized = relPath.replace(/^[/\\]+/, "").replace(/\\/g, "/");
    const url = new URL(normalized, base);
    return url.toString();
};

export default createAssetUrl;