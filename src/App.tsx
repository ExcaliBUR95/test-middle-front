import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { useAppSelector } from "./redux/store";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import FullCart from "./components/FullCart/FullCart";
import People from "./pages/People";
import Home from "./pages/Home";

function App() {
  const token = useAppSelector(state => state.auth.token)
  if(token){
    return (
      <Routes>
      <Route  path="/" element={<MainLayout />}>
      <Route path="/people" element={<People />} />
      <Route path="/account" element={<Profile />} />
      <Route path="/EditProfile" element={<EditProfile />} />
      <Route path="/signUp" element={<Navigate to='/'/>} />
      <Route path="/signIn" element={<Navigate to='/'/>} />
      <Route path="/fullCart/:id" element={<FullCart />} />
      <Route path="/" element={<Home/>}/>
      </Route>
     </Routes>
    );
  }else{
    return (
      <Routes>
      <Route  path="/" element={<MainLayout />}>
      <Route path="/people" element={<People />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/EditProfile" element={<Navigate to='/'/>} />
      <Route path="/account" element={<Navigate to='/'/>} />
      <Route path="/fullCart/:id" element={<Navigate to='/'/>} />
      <Route path="/" element={<Home/>}/>
      </Route>
     </Routes>
    );
  }
 
}

export default App;
