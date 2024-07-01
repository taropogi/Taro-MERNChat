import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

export default function LogoutButton() {
  const { logout, isLoading } = useLogout();

  return (
    <div className="mt-auto" onClick={logout}>
      {isLoading ? (
        <span className="loading loading-dots loading-xs"></span>
      ) : (
        <BiLogOut className="w-6 h-6 text-white cursor-pointer" />
      )}
    </div>
  );
}
