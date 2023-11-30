import { useNavigate } from "react-router-dom";
import Transfer from "./transfer";
import { CiLogout } from "react-icons/ci";

const Topbar = () => {
const navigate = useNavigate()
    const handleLogout = () => {
      localStorage.clear();
      navigate("/");
    };
  return (
    <header className="lg:border-[#c4c4c4] lg:border flex justify-between items-center px-3 md:px-10">
      <div className="flex justify-between  w-full items-center">
        <h2 className="font-extrabold text-[20px] text-blue-600">A.B.C Bank</h2>
        <div className="flex gap-4">
          <Transfer />
          
        </div>
        <button
          className="font-bold text-[15px] text-white flex items-center gap-2 px-4 py-2 rounded bg-blue-600"
          onClick={() => handleLogout()}
        >
          Logout
          <CiLogout />
        </button>
      </div>
    </header>
  );
}
export default Topbar