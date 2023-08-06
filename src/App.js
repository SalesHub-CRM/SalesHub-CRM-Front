
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PublicRouteHandler from "./utils/PublicRouteHandler";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            {/*standard routes*/}
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>

            {/*change dashboard to connected only later*/}

            {/*registration and login here*/}
            <Route exact path='/' element={<PublicRouteHandler />} ></Route>
            {/*routes that require a user to be connected to access*/}
            <Route exact path='/' element={<PrivateRoute />} ></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
