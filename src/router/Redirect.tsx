import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * 
 * @param {string} to 要導入的路徑 ex: /${to}
 * @returns {null} 回傳 null
 */
const Redirect = ({ to }: { to: string }) => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(to, { replace: true })
    })
    return null
}

export default Redirect