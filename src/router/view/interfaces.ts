export interface TopHeaderProps {
    onMenuToggle: () => void,
    isMobile: boolean
}

export interface SideMenuProps extends TopHeaderProps {
    isMenuOpen: boolean,
    handleNavigate: (to: string) => void
}

export interface Item {
    id: number;
    url: string;
    name: string;
    open?: boolean;
    icon?: JSX.Element;
    children?: Item[];
}