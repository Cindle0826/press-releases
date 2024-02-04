export interface TopHeaderProps {
    onMenuToggle: () => void,
    isMobile: boolean
}

export interface SideMenuProps extends TopHeaderProps {
    isMenuOpen: boolean
}

export interface Item {
    id: number
    name: string
    url?: string
    open?: boolean
    userPermission : number
    childrens?: Item[]
}