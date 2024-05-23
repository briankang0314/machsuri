import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import JobRegister from "./pages/jobregister/JobRegister";
import Profile from "./pages/profile/Profile";

import "./styles/reset.scss";
import "./styles/common.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="users/login" element={<Login />} />
        <Route path="users/register" element={<Register />} />
        <Route path="jobs/register" element={<JobRegister />} />
        <Route path="users/profile/" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
