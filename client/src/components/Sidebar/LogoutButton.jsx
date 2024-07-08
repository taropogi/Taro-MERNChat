import { BiLogOut } from "react-icons/bi";
import { useAuth } from "../../contextProviders/AuthContext";

export default function LogoutButton() {
  const { logout, isLoading } = useAuth();

  return (
    <div className="mt-auto" onClick={logout}>
      {isLoading ? (
        <span className="loading loading-dots loading-xs"></span>
      ) : (
        <>
          <button className="btn btn-primary flex items-center text-white">
            <BiLogOut className="h-5 w-5 mr-2" />
            Logout
          </button>
          {/* Logout <BiLogOut className="w-6 h-6 text-white cursor-pointer" /> */}
        </>
      )}
    </div>
  );
}
