import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/actions/AuthenticationActions";
import {Link} from "react-router-dom";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import {useNavigate} from "react-router";

const NavbarMenu = () => {

    const dispatch = useDispatch();
    const dataUser = JSON.parse(localStorage.getItem('user'));
    const Auth = useSelector(state=>state.Auth);
    const navigate = useNavigate();
    if(!dataUser)
    {
        navigate('/login')
    }

    const logoutHandler = () =>{
        dispatch(logout())
    }


    return(
        <div className="nav-menu NavbarMenu">
            <ul>
                {!JSON.parse(localStorage.getItem('user')) && <li><Link to="/Login">Login</Link></li>}
                {!JSON.parse(localStorage.getItem('user')) && <li><Link to="/Signup">Signup</Link></li>}
                {
                    dataUser?.roles[0] === 'ROLE_ADMIN' && <li><Link to="/Dashboard">Admin Interface</Link></li>
                }

                <li><a href="src/components/Home#">About Us</a></li>
                {JSON.parse(localStorage.getItem('user')) && <li><Link to="/" onClick={logoutHandler}><PowerSettingsNewIcon/> Logout</Link></li>}

            </ul>
        </div>
    )
}

export default NavbarMenu;