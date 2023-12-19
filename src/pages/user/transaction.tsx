import { Button, Col, Form, Input, Row, Spin, Table } from "antd";
import { ColumnProps } from "mdb-react-ui-kit/dist/types/free/layout/Column/types";
import { useApi } from "../../hooks/useApi";
import { useUserInfo } from "../../hooks/userInfo";
import { useGetDataOnActionMutation } from "../../service/global";
import { useEffect, useLayoutEffect, useState } from "react";
import "jspdf-autotable";
import jsPDF from "jspdf";

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

  let account = result?.data?.data?.accountNumber;
  const { response, isFetching } = useApi(
    `Transaction/statement?accountNumber=${account}`
  );

  let info = result?.data?.data;

  // const generatePDF = () => {
  //   const pdf = new jsPDF("p", "pt", "a4");

  //   // Set column headers
  //   const headers = [
  //     "accountNumber",
  //     "amount",
  //     "dateCreated",
  //     "senderName",
  //     "senderAccount",
  //     "senderBank",
  //     "remarks",
  //     "beneficiaryName",
  //     "beneficiaryAccount",
  //     "beneficiaryBank",
  //     "type",
  //     "transMethod",
  //     "sessionId",
  //     "customerAccountId",
  //   ];

  //   // Map the response array to an array of arrays containing the data
  //   const data = response.map(
  //     (user: {
  //       accountNumber: any;
  //       amount: any;
  //       dateCreated: any;
  //       senderName: any;
  //       senderAccount: any;
  //       senderBank: any;
  //       remarks: any;
  //       beneficiaryName: any;
  //       beneficiaryAccount: any;
  //       beneficiaryBank: any;
  //       type: any;
  //       transMethod: any;
  //       sessionId: any;
  //       customerAccountId: any;
  //     }) => [
  //       user.accountNumber,
  //       user.amount,
  //       user.dateCreated,
  //       user.senderName,
  //       user.senderAccount,
  //       user.senderBank,
  //       user.remarks,
  //       user.beneficiaryName,
  //       user.beneficiaryBank,
  //       user.type,
  //       user.transMethod,
  //       user.sessionId,
  //       user.customerAccountId,
  //     ]
  //   );

  //   // Add the table to the PDF using autoTable
  //   pdf.autoTable({
  //     head: [headers],
  //     body: data,
  //     startY: 20, // Set the starting y position for the table
  //   } ,);

  //   // Save the PDF
  //   pdf.save("statements.pdf");
  // };

var generateData = function (amount: number) {
  const result = [];
  for (var i = 0; i < amount; i += 1) {
    const data = response.map((user: any) => [
      user.id,
      user.accountNumber,
      user.amount,
      user.dateCreated,
      user.senderName,
      user.senderAccount,
      user.senderBank,
      user.remarks,
      user.beneficiaryName,
      user.beneficiaryBank,
      user.type,
      user.transMethod,
      user.sessionId,
      user.customerAccountId,
    ]);

    // Set the 'id' property of the object inside the loop
    // data[0].id = (i + 1).toString();

    result.push(data[0]);
  }
  return result;
};

function createHeaders(keys: string | any[]) {
  var result = [];
  for (var i = 0; i < keys.length; i += 1) {
    result.push({
      id: keys[i],
      name: keys[i],
      prompt: keys[i],
      width: 65,
      align: "center",
      padding: 0,
    });
  }
  return result;
}

const headers = createHeaders([
  "accountNumber",
  "amount",
  "dateCreated",
  "senderName",
  "senderAccount",
  "senderBank",
  "remarks",
  "beneficiaryName",
  "beneficiaryAccount",
  "beneficiaryBank",
  "type",
  "transMethod",
  "sessionId",
  "customerAccountId",
]);

const doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
// doc.table(1, 1, generateData(100), headers, { autoSize: true });

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
      <div className="pt-8 border-b border-[#c4c4c4] flex justify-between">
        <div>
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
            <Col span={12}>
              <Button>Filter</Button>
            </Col>
          </Form>
        </div>

        <Button
          type="default"
          // onClick={generatePDF}
        >
          Download statement
        </Button>
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
