import { Link } from "react-router-dom";
import TextLogo from "../../components/UI/TextLogo";
import { useAuth } from "../../contextProviders/AuthContext";
import { useState } from "react";
export default function Login() {
  const { login, isLoading } = useAuth();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    login(userName, password);
  }

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20">
        <h2 className="text-3xl font-bold text-center text-gray-300 ">
          <TextLogo /> Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
            />
          </div>

          <Link
            to="/signup"
            className="text-sm hover:underline hover:text-blue-500 mt-2 inline-block"
          >
            {"Don't"} have an account?
          </Link>
          <div>
            <button disabled={isLoading} className="btn btn-block btn-sm mt-2">
              {isLoading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

//starter code for this file

// export default function Login() {
//     return (
//       <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
//         <div className="w-full p-6 round-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
//           <h1 className="text-3xl font-semibold text-center text-gray-300">
//             Login <span className="text-blue-500"> MERNChat</span>
//           </h1>
//           <form>
//             <div>
//               <label className="label p-2">
//                 <span className="text-base label-text">Username</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter username"
//                 className="w-full input input-bordered h-10"
//               />
//             </div>
//             <div>
//               <label className="label">
//                 <span className="text-base label-text">Password</span>
//               </label>
//               <input
//                 type="password"
//                 placeholder="Enter Password"
//                 className="w-full input input-bordered h-10"
//               />
//             </div>
//             <a
//               href="#"
//               className="text-sm hover:underline hover:text-blue-500 mt-2 inline-block"
//             >
//               {"Don't"} have an account?
//             </a>
//             <div>
//               <button className="btn btn-block btn-sm mt-2">Login</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     );
//   }
