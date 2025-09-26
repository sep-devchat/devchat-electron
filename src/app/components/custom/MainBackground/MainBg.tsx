import { useAssets } from "@/app/hooks/use-assets";
import { PageWrapper } from "./MainBg.styled";

export default function MainBg() {
	const [bgImage] = useAssets(["image/loginBackground.png"]);

	return <PageWrapper backgroundImage={bgImage}></PageWrapper>;
}
