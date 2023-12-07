import { useState } from "react"
import { useGetDataQuery } from "../service/global"

const useStatementApi = (getUrl:string,accountNumber:number) => {
const [response,setResponse] = useState([])
const {data} = useGetDataQuery(getUrl)
}
export default useStatementApi