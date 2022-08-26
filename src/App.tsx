import Home from "./pages/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { useAppSelector } from "./redux/store";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";

function App() {
  const token = useAppSelector(state => state.auth.token)
  if(token){
    return (
      <Routes>
      <Route  path="/" element={<MainLayout />}>
      <Route path="/people" element={<Home />} />
      <Route path="/account" element={<Profile />} />
      <Route path="/EditProfile" element={<EditProfile />} />
      <Route path="/signUp" element={<Navigate to='/'/>} />
      <Route path="/signIn" element={<Navigate to='/'/>} />
      </Route>
     </Routes>
    );
  }else{
    return (
      <Routes>
      <Route  path="/" element={<MainLayout />}>
      <Route path="/people" element={<Home />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/signIn" element={<SignIn />} />
      </Route>
     </Routes>
    );
  }
 
}

export default App;
