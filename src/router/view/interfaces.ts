/**
 * 上方導航欄
 */
export interface TopHeaderProps {
    onMenuToggle: () => void,
    isMobile: boolean
}

/**
 *  側邊導航欄 
 */
export interface SideMenuProps extends TopHeaderProps {
    isMenuOpen: boolean
}

export type ItemChildren = {
    id: number
    name: string
    url: string,
    page_permission: 1 | 0,
    sideMenuId: number
}

/**
 * 導航欄資料型別
 * @param id - Item id
 * @param name - Item 名稱
 * @param url - Item 路由地址
 * @param open - 是否開啟閉合導航欄
 * @param userPermission - 使用者權限 1 是開 0 是關 
 * @param childrens - 是否有子清單 
 */
export interface Item {
    id: number
    name: string
    url: string
    page_permission: 1 | 0
    open?: boolean
    children?: ItemChildren[]
}

