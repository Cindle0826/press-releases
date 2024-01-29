import React, { Fragment } from 'react'
import { useRoutes } from 'react-router-dom'
import Redirect from './Redirect'
import { Auth } from './view/types'
import NoPermission from './view/sandbox/nopermission/NoPermission'
import NewsSandBox from './view/sandbox/NewsSandBox'

const IndexRoutes = () => {

    const router = useRoutes([
        {
            path: "/login",
            element: lazyLoad("login/Login"),
            children: [

            ]
        },
        {
            path: "/newsSandBox",
            // 特別注意 登入驗證時如果 children 加入懶加載 會導致 每一次切換路由都要重新加載 newSandBox
            element: <AuthComponent children={<NewsSandBox />} toPath='login' />,
            children : [
                {
                    path : "home",
                    element : lazyLoad("sandbox/home/Home")
                },
                {
                    path : "user-manage/list",
                    element : lazyLoad("sandbox/user-manage/UserList")
                },
                {
                    path : "right-manage/role/list",
                    element : lazyLoad("sandbox/right-manage/RoleList")
                },
                {
                    path : "right-manage/right/list",
                    element : lazyLoad("sandbox/right-manage/RightList")
                },
                {
                    path : "",
                    element : <Redirect to='home' />
                },
                {
                    path : "*",
                    element : <NoPermission />
                }
                

            ]
        },
        {
            path: "",
            element: <Redirect to='newsSandBox' />
        }
    ])

    return router
}

/**
 * AuthComponent 函數式組件 
 * @param {AuthComponent} param - 組件屬性
 * @param {ReactNode} param.children - 子組件
 * @param {string} param.toPath - 導向的路徑
 * @returns 
 */
const AuthComponent: Auth = ({ children, toPath }) => {

    const isLogin = localStorage.getItem('token')
    return isLogin ? children : <Redirect to={`/${toPath}`} />
}

/**
 * 路由懶加載
 * @param path 路徑 ./view/${path or Component}`
 * @returns Component 懶加載後的組件
 */
const lazyLoad = (path: string) => {
    const Component = React.lazy(() => import(`./view/${path}`))
    return (
        <React.Suspense fallback={<Fragment>加載中...</Fragment>} >
            <Component />
        </React.Suspense>
    )
}

export default IndexRoutes