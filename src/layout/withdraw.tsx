import { Button, Col, Form, Input, Modal, Row } from "antd";
import { useState } from "react";

const Withdraw = () => {
      const [isModalOpen, setIsModalOpen] = useState(false);

      const showModal = () => {
        setIsModalOpen(true);
      };

      const handleOk = () => {
        setIsModalOpen(false);
      };

      const handleCancel = () => {
        setIsModalOpen(false);
      };
  return (
    <div>
      <Button className="text-black border rounded" onClick={showModal}>
        Withdraw
      </Button>
      <Modal
        okText="Withdraw"
        style={{ color: "black" }}
        title="Withdraw Transaction"
        open={isModalOpen}
        onOk={handleOk}
        okType="primary"
        footer
        onCancel={handleCancel}
      >
        <div className="pt-4">
          <Form layout="vertical" requiredMark="optional">
            <Row gutter={12}>
              <Col md={12} xs={24}>
                <Form.Item
                  label={<div className="font-semibold">Account Number</div>}
                  rules={[
                    { required: true, message: "Account Number required" },
                  ]}
                  name="accountNumber"
                >
                  <Input
                    type="accountNumber"
                    maxLength={8}
                    value={"accountNumber"}
                    name="AccountNumber"
                    placeholder="0128873645"
                    className="py-2"
                  />
                </Form.Item>
              </Col>
              <Col md={12} xs={24}>
                <Form.Item
                  label={<div className="font-semibold">Amount(₦)</div>}
                  rules={[{ required: true, message: "Amount required" }]}
                  name="amount"
                >
                  <Input
                    type="number"
                    value={"amount"}
                    name="amount"
                    placeholder="₦ 0.00"
                    className="py-2"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Col span={24}>
              <Button className="w-[100%] h-10">Withdraw</Button>
            </Col>
          </Form>
        </div>
      </Modal>
    </div>
  );
}
export default Withdraw