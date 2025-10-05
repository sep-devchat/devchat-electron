import styled from "styled-components";

export const HeaderContainer = styled.header`
	height: 55px;
	background: rgba(255, 255, 255, 0.55);
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 16px;
	color: var(--color-foreground);
	border-bottom: 1px solid var(--color-border);
	position: relative;
	z-index: 10;
`;
