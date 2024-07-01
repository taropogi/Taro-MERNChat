import Login from "./pages/login/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div className="p-4 h-screen flex items-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <div>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
