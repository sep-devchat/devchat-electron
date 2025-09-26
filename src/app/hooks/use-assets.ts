import { useEffect, useState } from "react";

export function useAssets(relPaths: string[]) {
	const [urls, setUrls] = useState<string[]>([]);

	useEffect(() => {
		let cancelled = false;
		Promise.all(relPaths.map((p) => window.nativeAPI.createAssetUrl(p)))
			.then((res) => {
				if (!cancelled) setUrls(res);
			})
			.catch(() => {
				if (!cancelled) setUrls(Array(relPaths.length).fill(""));
			});
		return () => {
			cancelled = true;
		};
	}, [relPaths]);

	return urls;
}
