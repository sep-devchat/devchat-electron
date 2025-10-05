import styled from "styled-components";

export const PageWrapper = styled.div<{ backgroundImage: string }>`
	height: 100vh;
	width: 100%;
	background-image: url(${(props) => props.backgroundImage});
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	/* Use fixed so it stays put while content can scroll inside layout (future proof) */
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 0; /* Explicitly behind the main layout */
	pointer-events: none; /* Prevent blocking interactions */
`;
