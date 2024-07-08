import Login from "./pages/login/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import SignUp from "./pages/signup/SignUp";
import { Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./contextProviders/AuthContext";
import { ChatProvider } from "./contextProviders/ChatContext";
function App() {
  const { authUser } = useAuth();
  return (
    <div className="p-4 h-screen flex items-center">
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <ChatProvider>
                <Home />
              </ChatProvider>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignUp />}
        />
      </Routes>
      <div>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
