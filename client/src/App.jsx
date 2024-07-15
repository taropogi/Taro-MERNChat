import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./contextProviders/AuthContext";
import { ChatProvider } from "./contextProviders/ChatContext";
import { lazy, Suspense } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage/SpinnerFullPage";
// import Home from "./pages/home/Home";
// import SignUp from "./pages/signup/SignUp";
// import Login from "./pages/login/Login";

const Home = lazy(() => import("./pages/home/Home"));
const SignUp = lazy(() => import("./pages/signup/SignUp"));
const Login = lazy(() => import("./pages/login/Login"));

function App() {
  const { authUser } = useAuth();
  return (
    <div className="p-4 h-screen flex items-center">
      <Suspense fallback={<SpinnerFullPage />}>
        <Routes>
          <Route
            path="/"
            element={
              authUser ? (
                <ChatProvider className={`mx-auto`}>
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
      </Suspense>
      <div>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
