import { useEffect, useState } from "react";
import { url } from "inspector";
import { useGetDataQuery } from "../service/global";
import { useUserInfo } from "./userInfo";
import { ApiResponse } from "../application/client/response";

const useUserDetails = (url: string) => {
  const [response, setResponse] = useState([]);
  const { userInfo } = useUserInfo();

  const { data, isFetching, isError, refetch } = useGetDataQuery(url);
  useEffect(() => {
    if (data && !isError && !isFetching) {
      const response: ApiResponse.GetAccountDetails = data;
      if (response.customerId === userInfo.id) {
      
      }
    }
  }, [data, isError, isFetching, userInfo.id]);
};
export default useUserDetails;
