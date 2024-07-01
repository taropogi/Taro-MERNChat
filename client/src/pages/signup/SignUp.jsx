import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";

import useSignup from "../../hooks/useSignup";
export default function SignUp() {
  const { inputs, signup, isLoading, setInputs } = useSignup();
  function handleSubmit(e) {
    e.preventDefault();
    signup();
  }

  function handleCheckboxChange(gender) {
    setInputs((inputs) => ({ ...inputs, gender }));
  }

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-blue-500"> MERNChat</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label">
              <span className="text-base label-text">First Name</span>
            </label>
            <input
              value={inputs.firstName}
              onChange={(e) =>
                setInputs({ ...inputs, firstName: e.target.value })
              }
              type="text"
              placeholder="Enter first name"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Last Name</span>
            </label>
            <input
              value={inputs.lastName}
              onChange={(e) =>
                setInputs({ ...inputs, lastName: e.target.value })
              }
              type="text"
              placeholder="Enter Last name"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              value={inputs.userName}
              onChange={(e) =>
                setInputs({ ...inputs, userName: e.target.value })
              }
              type="text"
              placeholder="Enter Username"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              type="password"
              placeholder="Enter password"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
              type="password"
              placeholder="Enter password"
              className="w-full input input-bordered h-10"
            />
          </div>

          <GenderCheckbox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />

          <Link
            to="/login"
            className="text-sm hover:underline hover:text-blue-600 mt-4 inline-block"
          >
            Already have an account?
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-2 border border-slate-700">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

//starter code

// import GenderCheckbox from "./GenderCheckbox";

// export default function SignUp() {
//   return (
//     <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
//       <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20">
//         <h1 className="text-3xl font-semibold text-center text-gray-300">
//           Sign Up <span className="text-blue-500"> MERNChat</span>
//         </h1>
//         <form>
//           <div>
//             <label className="label">
//               <span className="text-base label-text">First Name</span>
//             </label>
//             <input
//               type="text"
//               placeholder="Enter first name"
//               className="w-full input input-bordered h-10"
//             />
//           </div>
//           <div>
//             <label className="label">
//               <span className="text-base label-text">Last Name</span>
//             </label>
//             <input
//               type="text"
//               placeholder="Enter Last name"
//               className="w-full input input-bordered h-10"
//             />
//           </div>
//           <div>
//             <label className="label">
//               <span className="text-base label-text">Username</span>
//             </label>
//             <input
//               type="text"
//               placeholder="Enter Username"
//               className="w-full input input-bordered h-10"
//             />
//           </div>
//           <div>
//             <label className="label">
//               <span className="text-base label-text">Password</span>
//             </label>
//             <input
//               type="password"
//               placeholder="Enter password"
//               className="w-full input input-bordered h-10"
//             />
//           </div>
//           <div>
//             <label className="label">
//               <span className="text-base label-text">Confirm Password</span>
//             </label>
//             <input
//               type="password"
//               placeholder="Enter password"
//               className="w-full input input-bordered h-10"
//             />
//           </div>

//           <GenderCheckbox />

//           <a
//             href="#"
//             className="text-sm hover:underline hover:text-blue-600 mt-4 inline-block"
//           >
//             Already have an account?
//           </a>

//           <div>
//             <button className="btn btn-block btn-sm mt-2 border border-slate-700">
//               Sign Up
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
