import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/actions/AuthenticationActions";
import {Link} from "react-router-dom";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const NavbarMenu = () => {

    const dispatch = useDispatch();
    const dataUser = JSON.parse(localStorage.getItem('user'))
    const Auth = useSelector(state=>state.Auth)

    const logoutHandler = () =>{
        dispatch(logout())
    }
    console.log(Auth)

    return(
        <div className="nav-menu NavbarMenu">
            <ul>
                {!JSON.parse(localStorage.getItem('user')) && <li><Link to="/Login">Login</Link></li>}
                {!JSON.parse(localStorage.getItem('user')) && <li><Link to="/Signup">Signup</Link></li>}
                {JSON.parse(localStorage.getItem('user'))?.role === 'ROLE_ADMIN' && <li><Link to="/Dashboard">Admin Interface</Link></li>}

                <li><a href="src/components/Home#">About Us</a></li>
                {JSON.parse(localStorage.getItem('user')) && <li><Link to="/" onClick={logoutHandler}><PowerSettingsNewIcon/> Logout</Link></li>}

            </ul>
        </div>
    )
}

export default NavbarMenu;