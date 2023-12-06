import { Col, Form, Input, Row, Spin, Table } from "antd";
import { ColumnProps } from "mdb-react-ui-kit/dist/types/free/layout/Column/types";
import { useApi } from "../../hooks/useApi";
import { useUserInfo } from "../../hooks/userInfo";
import { useGetDataOnActionMutation } from "../../service/global";
import { useEffect, useLayoutEffect, useState } from "react";

const UserTransaction = () => {

  useLayoutEffect(() => {
    document.title = "Transaction | ABC";
  }, []);

  const { userInfo } = useUserInfo();

  const [responses, setResponse] = useState();
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

  const { response, isFetching } = useApi(
    `Transaction/statement?accountNumber=${result?.data?.data.accountNumber}`
  );

  const columns: ColumnProps[] = [
    {
      title: "SN",
      key: "01",
      dataIndex: "key",
      width: "60px",
    },
    {
      title: "Account Number",
      key: "accountNumber",
      dataIndex: "accountNumber",
      ellipsis: true,
    },
    {
      title: "Amount",
      key: "amount",
      dataIndex: "amount",
      ellipsis: true,
    },
    {
      title: "Date Created",
      key: "dateCreated",
      dataIndex: "dateCreated",
      ellipsis: true,
    },
    {
      title: "Sender Name",
      key: "senderName",
      ellipsis: true,
      dataIndex: "senderName",
    },
    {
      title: "Sender Account",
      key: "senderAccount",
      ellipsis: true,
      dataIndex: "senderAccount",
    },
    {
      title: "Sender Bank",
      key: "senderBank",
      ellipsis: true,
      dataIndex: "senderBank",
    },
    {
      title: "Remarks",
      key: "remarks",
      ellipsis: true,
      dataIndex: "remarks",
    },
    {
      title: "Beneficiary Name",
      key: "beneficiaryName",
      ellipsis: true,
      dataIndex: "beneficiaryName",
    },
    {
      title: "type",
      key: "type",
      ellipsis: true,
      dataIndex: "type",
    },
    {
      title: "TransMethod",
      key: "transMethod",
      ellipsis: true,
      dataIndex: "transMethod",
    },
    {
      title: "Session Id",
      key: "sessionId",
      ellipsis: true,
      dataIndex: "sessionId",
    },
    {
      title: "Customer AccountId",
      key: "customerAccountId",
      ellipsis: true,
      dataIndex: "customerAccountId",
    },
  ];
  return (
    <div>
      <h2 className="border-b border-[#c4c4c4] py-5 flex justify-between items-center font-bold text-[20px]">
        Transactions
      </h2>
      <div className="pt-8 border-b border-[#c4c4c4]">
        <Form requiredMark="optional">
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                label={<div className="font-semibold">Start Date</div>}
                rules={[{ required: true, message: "Start Date" }]}
                name="startDate"
              >
                <Input
                  type="number"
                  maxLength={10}
                  // value={"email"}
                  placeholder="MM/DD/YYYY"
                  name="startDate"
                  className=" py-2 min-w-[5rem] md:w-[12rem] h-10"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<div className="font-semibold">End Date</div>}
                rules={[{ required: true, message: "End Date" }]}
                name="endDate"
              >
                <Input
                  type="number"
                  maxLength={10}
                  // value={"email"}
                  placeholder="MM/DD/YYYY"
                  name="endDate"
                  className=" py-2 min-w-[5rem] md:w-[12rem] h-10"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>

      <div>
        <Spin
          tip="Please wait..."
          spinning={isFetching || result.isLoading}
          className="border border-[#C4C4C4] rounded-md mb-10 "
        >
          <Table
            scroll={{ x: "1600px" }}
            columns={columns}
            dataSource={response}
            bordered
          />
        </Spin>
      </div>
    </div>
  );
};
export default UserTransaction;
