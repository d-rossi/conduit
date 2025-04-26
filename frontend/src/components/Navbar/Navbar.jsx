import { Link, useNavigate } from 'react-router-dom'
import Logo from '../Logo/Logo'
import './Navbar.css'
import { useState } from 'react';
import homeIcon from '../../assets/icons/home_icon.svg'
import pencilIcon from '../../assets/icons/pencil_icon.svg'
import infoIcon from '../../assets/icons/info_icon.svg'
import gearIcon from '../../assets/icons/gear_icon.svg'
import logoutIcon from '../../assets/icons/logout_icon.svg'
import loginIcon from '../../assets/icons/login_icon.svg'

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(localStorage.getItem("token"))
  
    const handleLogout = () => {
      localStorage.removeItem("token")
      setUser(null) // Trigger re-render
      navigate("/")
    };
    return (
        <header>
            <Logo />
            <nav className="navigation">
                <ul>
                    <li className="navigation__link"><Link to="/"><img src={homeIcon} alt="Home icon" className="navigation__link--icon"/> Home</Link></li>
                    {user && <li className="navigation__link"><Link to="/article"><img src={pencilIcon} alt="Pencil icon" className="navigation__link--icon"/> New Article</Link></li>}
                    <li className="navigation__link"><Link to="/about"><img src={infoIcon} alt="Info icon" className="navigation__link--icon"/> About</Link></li>
                    {!user && <li className="navigation__link navigation__link--auth"><Link to="/login"><img src={loginIcon} alt="Login icon" className="navigation__link--icon"/> Login</Link></li>}
                    {user && <li className="navigation__link"><Link to="/settings"><img src={gearIcon} alt="Gear icon" className="navigation__link--icon"/> Settings</Link></li>}
                    {user && <li className="navigation__link navigation__link--auth"><Link to="/" onClick={handleLogout}><img src={logoutIcon} alt="Logout icon" className="navigation__link--icon"/> Logout</Link></li>}
                </ul>
            </nav>
        </header>
    )
}

export default Navbar