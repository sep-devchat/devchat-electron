import styled from "styled-components";

export const MainLayoutContainer = styled.div`
	height: 100vh;
	background: transparent; /* Let the background image show through */
	color: var(--color-foreground);
	position: relative;
	z-index: 1; /* Above MainBg */
	display: flex;
	flex-direction: column;
`;
