import React, { useLayoutEffect } from "react"
import icon1 from "../../../icons/ellipse1.svg";
import icon2 from "../../../icons/ellips2.svg";
import icon3 from "../../../icons/ellips3.svg";
import icon4 from "../../../icons/ellips4.svg";
import Withdraw from "../../../layout/withdraw";
import Deposit from "../../../layout/deposit";

const Overview:React.FC = () => {

  useLayoutEffect(() => {

    document.title = "Overview | ABC";

  }, []);

  return (
    <div>
      <h2 className="border-b border-[#c4c4c4] py-5 flex justify-between items-center font-bold text-[20px]">
        Overview
      </h2>
      {/* Parent container */}

      <div className="w-full  flex justify-between gap-5 overflow-auto pt-8">
        {/* row1 */}
        <div className="p-4 w-[25%] min-w-[14rem] space-y-3">
          <div className="space-y-2">
            <img src={icon1} alt="" />
            <p className="text-[19px] font-medium">Total Users</p>
            <b className="text-[22px]">20</b>
          </div>
        </div>
        {/* row2 */}
        <div className="p-4  border-l w-[25%] min-w-[14rem]  space-y-3">
          <div className="space-y-2">
            <img src={icon3} alt="" />
            <p className="text-[19px] font-medium">Deposit</p>
            <b className="text-[22px]">£ 99273782382 </b>
          </div>
        </div>
        {/* row3 */}
        <div className="p-4  border-l w-[25%] min-w-[14rem] space-y-3">
          <div className="space-y-2">
            <img src={icon2} alt="" />
            <p className="text-[19px] font-medium">withdraw</p>
            <b className="text-[22px]">£ 332938 </b>
          </div>
        </div>
        {/* row4 */}
        <div className="p-4  border-l w-[25%] min-w-[14rem] space-y-3">
          <div className="space-y-2">
            <img src={icon4} alt="" />
            <p className="text-[19px] font-medium">Overdraft</p>
            <b className="text-[22px]">£ 4532</b>
          </div>
        </div>
      </div>

      <div className="flex gap-4 lg:hidden">
        <Withdraw />
        <Deposit />
      </div>
    </div>
  );
}
export default Overview