import { useEffect, useState } from "react";

export function useAssets(relPaths: string[]) {
    const [urls, setUrls] = useState<string[]>(Array(relPaths.length).fill(""));

    useEffect(() => {
        let cancelled = false;
        Promise.all(relPaths.map((path) => window.nativeAPI.createAssetUrl(path)))
            .then((res) => {
                if (!cancelled) setUrls(res);
            })
            .catch(() => {
                if (!cancelled) setUrls(Array(relPaths.length).fill(""));
            });
        return () => {
            cancelled = true;
        };
    }, [JSON.stringify(relPaths)]);

    return urls;
}