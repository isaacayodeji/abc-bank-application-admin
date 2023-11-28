import { useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Redirect = () => {
    const [count,setCount] = useState(5)
  
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useLayoutEffect(() => {
     if (pathname === "/") {
       return navigate("/login");
     }
    // const interval = setInterval(() => {
    //     setCount((currentCount) => currentCount -1)
    // },1000)
    // count === 0 && navigate('/login')
   
  // eslint-disable-next-line no-sparse-arrays
  }, [ navigate, pathname]);


  return <div></div>;
};
export default Redirect;
