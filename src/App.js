
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

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

            {/*routes that require a user to be connected to access*/}
        </Routes>
    </BrowserRouter>
  );
}

export default App;
