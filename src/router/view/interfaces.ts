
type onMenuToggle = () => void;


export interface TopHeaderProps {
    onMenuToggle: onMenuToggle;
}

export interface SideMenuProps {
    isMenuOpen: boolean,
    onMenuToggle: onMenuToggle
}