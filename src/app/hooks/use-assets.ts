import { useState } from "react";

export function useAssets(relPaths: string[]) {
    const [urls, setUrls] = useState<string[]>([]);
    Promise.all(relPaths.map((path) => window.nativeAPI.createAssetUrl(path)))
        .then(setUrls);
    return urls;
}