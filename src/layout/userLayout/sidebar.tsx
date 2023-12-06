import { AiOutlineAppstore, AiOutlineCreditCard } from "react-icons/ai";
import { useUserInfo } from "../../hooks/userInfo";
import profile from "../../images/profile.png";
import { useEffect, useState } from "react";
import { useGetDataOnActionMutation } from "../../service/global";

const Sidebar = () => {
 
  const { userInfo } = useUserInfo();
  const [response, setResponse] = useState();
  const [getData, result] = useGetDataOnActionMutation();

  useEffect(() => {
    getData({ url: `Customer/GetAccountDetails/${userInfo.id}` });
  }, [getData, userInfo.id]);
  // console.log(result);

  useEffect(() => {
    if (result.data) {
      if (result.data?.status === 200) {
        setResponse(result.data.data);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);
  // console.log(response);


  return (
    <nav className="border-r border-[#c4c4c4] hidden lg:block overflow-auto">
      <div className="flex flex-col items-center space-y-2 pb-4 text-[14px] font-semibold text-black">
        <div className=" mx-auto px-4 flex items-center  object-fill ">
          <img
            className="rounded-full px-4 py-4 w-[140px] h-[134px] border"
            src={profile}
            alt=""
          />
        </div>
        <h2>{userInfo.firstName}</h2>
        <h2>{userInfo.email}</h2>
        <h2>{result?.data?.data.accountNumber}</h2>
      </div>
      <hr />
      {/* user menu */}
      <ul className="flex pl-12 flex-col gap-6  p-4 pt-8">
        <li className="text-[18px] font-bold ">
          <a
            className="flex items-center gap-2"
            href="/user/overview"
            target=""
          >
            <AiOutlineAppstore />
            Overview
          </a>
        </li>
        <li className="text-[18px] font-bold ">
          <a
            className="flex items-center gap-2"
            href="/user/transaction"
            target=""
          >
            <AiOutlineCreditCard />
            Transactions
          </a>
        </li>
      </ul>
    </nav>
  );
}
export default Sidebar