export default function GenderCheckbox({ onCheckboxChange, selectedGender }) {
  return (
    <div className="flex">
      <div className="form-control">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text">Male</span>
          <input
            checked={selectedGender === "Male"}
            onChange={() => onCheckboxChange("Male")}
            type="checkbox"
            className="checkbox border-slate-900"
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text">Female</span>
          <input
            checked={selectedGender === "Female"}
            onChange={() => onCheckboxChange("Female")}
            type="checkbox"
            className="checkbox border-slate-900"
          />
        </label>
      </div>
    </div>
  );
}

// starter code
// export default function GenderCheckbox() {
//     return (
//       <div className="flex">
//         <div className="form-control">
//           <label className="label gap-2 cursor-pointer">
//             <span className="label-text">Male</span>
//             <input type="checkbox" className="checkbox border-slate-900" />
//           </label>
//         </div>
//         <div className="form-control">
//           <label className="label gap-2 cursor-pointer">
//             <span className="label-text">Female</span>
//             <input type="checkbox" className="checkbox border-slate-900" />
//           </label>
//         </div>
//       </div>
//     );
//   }
