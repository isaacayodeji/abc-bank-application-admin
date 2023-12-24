import { AiOutlineAppstore, AiOutlineCreditCard } from "react-icons/ai";
import { useUserInfo } from "../../hooks/userInfo";
import profile from "../../images/profile.png";
import { useEffect, useLayoutEffect, useState } from "react";
import { useGetDataOnActionMutation } from "../../service/global";
import React from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const Sidebar = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const { userInfo } = useUserInfo();
  const [response, setResponse] = useState();
  const [getData, result] = useGetDataOnActionMutation();

  useEffect(() => {
    getData({ url: `Customer/GetAccountDetails/${userInfo.id}` });
  }, [getData, userInfo.id]);
  // console.log(result);

  useLayoutEffect(() => {
    if (imageUrl) {
      window.localStorage.setItem("image", imageUrl);
    }
  });
  useEffect(() => {
    if (result.data) {
      if (result.data?.status === 200) {
        setResponse(result.data.data);
      }
      if (imageUrl) {
        window.localStorage.getItem("image");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);
  // console.log(response);
  let details = result?.data?.data;

  const getImage = () => {
    if (window.localStorage.getItem("image")) {
      const imageReturn = window.localStorage.getItem("image");
      return imageReturn;
    }
    return undefined;
  };

  return (
    <nav className="border-r border-[#c4c4c4] hidden lg:block overflow-auto">
      <div className="flex flex-col items-center space-y-2 pb-4 text-[14px] font-semibold text-black">
        <div className=" mx-auto px-4 flex items-center  object-fill py-4">
          {/* <img
            className="rounded-full px-4 py-4 w-[140px] h-[134px] border"
            src={profile}
            alt=""
          /> */}

          {/* <div className="w-[5rem] h-[5rem] grid place-content-center rounded-full bg-[#7669dc1a] text-[2.5rem] text-center text-blue-600">
            {`${userInfo?.firstName
              ?.charAt(0)
              .toLocaleUpperCase()}  ${userInfo?.middleName
              ?.charAt(0)
              .toUpperCase()}`}
          </div> */}
          <div>
            {getImage() ? (
              <img src={getImage() as string} alt="" />
            ) : (
              <Upload
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader "
                showUploadList={false}
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="avatar"
                    style={{ width: "100%" }}
                    // className="rounded-full px-4 py-4 w-[140px] h-[138px] border"
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            )}
          </div>
        </div>
        <h2>{userInfo.firstName}</h2>
        <h2>{userInfo.email}</h2>
        <h2>{details?.accountNumber}</h2>
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
};
export default Sidebar;
