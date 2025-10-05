import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	margin: 0 auto;
`;

export const Header = styled.div`
	background: var(--color-muted);
	border-bottom: 1px solid var(--color-border);
	padding: 0;
`;

export const NavTabs = styled.div`
	display: flex;
	align-items: center;
	padding: 12px 20px;
`;

export const NavTab = styled.button<{ active?: boolean }>`
	background: ${(props) =>
		props.active ? "var(--color-card)" : "transparent"};
	border: 1px solid var(--color-border);
	padding: 4px 20px;
	margin-right: 16px;
	font-size: 16px;
	cursor: pointer;
	border-radius: 6px;
	transition: all 0.2s ease;
	font-weight: 600;
	color: var(--color-foreground);
	${(props) => props.active && `border-color: var(--color-card);`}
	&:focus {
		outline: none;
		box-shadow: none;
	}
	&:hover {
		background: ${(props) =>
			props.active ? "var(--color-card)" : "var(--color-accent)"};
	}
`;

export const Content = styled.div`
	padding: 24px 20px;
`;

export const Title = styled.h2`
	font-size: 18px;
	font-weight: 600;
	color: var(--color-foreground);
	margin: 0 0 4px 0;
`;

export const Subtitle = styled.p`
	font-size: 14px;
	color: var(--color-muted-foreground);
	margin: 0 0 20px 0;
`;

export const SearchContainer = styled.div`
	display: flex;
	align-items: center;
	background: var(--color-card);
	border: 1px solid var(--color-border);
	border-radius: 8px;
	padding: 12px 16px;
	margin-bottom: 16px;
	gap: 12px;
`;

export const SearchInput = styled.input`
	flex: 1;
	border: none;
	outline: none;
	font-size: 14px;
	color: var(--color-foreground);
	background: transparent;
	&::placeholder {
		color: var(--color-muted-foreground);
	}
`;

export const SendButton = styled.button`
	background: var(--color-primary);
	color: var(--color-primary-foreground);
	border: none;
	padding: 8px 16px;
	border-radius: 6px;
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
	transition: filter 0.2s ease;
	&:hover:not(:disabled) {
		filter: brightness(0.95);
	}
	&:disabled {
		background: var(--color-muted);
		color: var(--color-muted-foreground);
		cursor: not-allowed;
	}
`;

export const ResultsList = styled.div`
	background: var(--color-card);
	border-radius: 8px;
	overflow: hidden;
	border: 1px solid var(--color-border);
	width: 95%;
	margin: 0 auto;

	max-height: calc(5 * 73px);
	overflow-y: auto;

	/* Custom scrollbar */
	&::-webkit-scrollbar {
		width: 6px;
	}

	&::-webkit-scrollbar-track {
		background: var(--color-muted);
	}

	&::-webkit-scrollbar-thumb {
		background: var(--color-border);
		border-radius: 3px;
	}

	&::-webkit-scrollbar-thumb:hover {
		background: var(--color-primary);
	}
`;

export const ResultItem = styled.div<{ selected?: boolean }>`
	display: flex;
	align-items: center;
	padding: 12px 16px;
	min-height: 37px;
	border-bottom: 1px solid var(--color-border);
	cursor: pointer;
	transition: background-color 0.2s ease;
	background-color: ${(props) =>
		props.selected ? "var(--color-muted)" : "var(--color-card)"};
	border-left: ${(props) =>
		props.selected
			? "3px solid var(--color-primary)"
			: "3px solid transparent"};

	flex-shrink: 0;

	&:last-child {
		border-bottom: none;
	}

	&:hover {
		background-color: ${(props) =>
			props.selected ? "var(--color-accent)" : "var(--color-muted)"};
		border-left: 3px solid var(--color-primary);
	}
`;

export const Avatar = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	object-fit: cover;
	margin-right: 12px;
	background: var(--color-muted);
`;

export const UserInfo = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`;

export const UserName = styled.div`
	font-size: 14px;
	font-weight: 600;
	color: var(--color-foreground);
	margin-bottom: 2px;
`;

export const UserHandle = styled.div`
	font-size: 13px;
	color: var(--color-muted-foreground);
`;

export const MutualFriends = styled.div`
	font-size: 13px;
	color: var(--color-muted-foreground);
`;

export const SectionHeader = styled.div`
	font-size: 14px;
	font-weight: 600;
	color: var(--color-foreground);
	margin-bottom: 16px;
`;

export const ActionButton = styled.button<{
	variant?: "accept" | "decline" | "unfriend";
}>`
	background: ${(props) =>
		props.variant === "accept"
			? "var(--color-primary)"
			: props.variant === "decline" || props.variant === "unfriend"
				? "var(--color-destructive)"
				: "var(--color-primary)"};
	color: var(--color-primary-foreground);
	border: none;
	padding: 6px 12px;
	border-radius: 6px;
	font-size: 12px;
	font-weight: 500;
	cursor: pointer;
	transition: filter 0.2s ease;
	margin-left: 8px;
	&:hover {
		filter: brightness(0.95);
	}
	&:first-child {
		margin-left: 0;
	}
`;

export const ActionButtons = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;

export const UnfriendButton = styled.button`
	background: none;
	border: none;
	color: var(--color-destructive);
	font-size: 20px;
	cursor: pointer;
	padding: 4px;
	border-radius: 4px;
	transition: background-color 0.2s ease;
	&:hover {
		background-color: var(--color-accent);
	}
`;

export const Modal = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
`;

export const ModalContent = styled.div`
	background: var(--color-card);
	border-radius: 12px;
	padding: 40px 32px;
	text-align: center;
	min-width: 500px;
	margin: 20px;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
`;

export const ModalTitle = styled.h3`
	font-size: 30px;
	font-weight: 600;
	color: var(--color-primary);
	margin: 0 0 20px 0;
`;

export const SendImg = styled.img`
	width: 120px;
	height: 120px;
	margin: 10px auto;
`;

export const ModalMessage = styled.p`
	font-size: 16px;
	color: var(--color-foreground);
	margin: 0 0 32px 0;
	line-height: 1.5;
	font-weight: 300;
`;

export const ModalButton = styled.button`
	background: var(--color-primary);
	color: var(--color-primary-foreground);
	border: none;
	padding: 12px 40px;
	border-radius: 8px;
	font-size: 16px;
	font-weight: 600;
	cursor: pointer;
	width: 100%;
	transition: filter 0.2s ease;
	&:hover {
		filter: brightness(0.95);
	}
`;
