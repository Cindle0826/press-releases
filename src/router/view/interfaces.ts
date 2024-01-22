

export interface TopHeaderProps {
    onMenuToggle: () => void,
    isMobile: boolean
}

export interface SideMenuProps extends TopHeaderProps {
    isMenuOpen: boolean
}