import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {CountsGroupsByAdmin} from "../../redux/actions/GroupsActions";
import {useNavigate} from "react-router";


const Welcomepage = () => {

    const dispatch = useDispatch();
    const navigate=useNavigate();
    const groupCount = useSelector((state) => state.Group.CountGroups);
    const user =JSON.parse(localStorage.getItem('user'));

    useEffect(()=>{

        const token = JSON.parse(localStorage.getItem('authTokens'));
        if(user)
        {
            dispatch(CountsGroupsByAdmin(user.id));
        }


    })


  return(
      <div>
          {user?.roles.includes("ROLE_ADMIN") && groupCount === 0 ? (
              <div className="container mt-5 mb-5 text-center">
                  <h1 className="mt-5 mb-5">You need to create a group to access more functionalities.</h1>
                  <h3 className="mt-5 mb-5">Please visit the admin dashboard to add a group.</h3>
                  <h3 className="mt-5 mb-5">Or click <Link to="/Dashboard/addGroup">Here</Link> to go to the form.</h3>
              </div>
          ) : (
              <h1>Welcome to salesHub. How can we help?</h1>
          )}
      </div>
  )
}
export default Welcomepage;