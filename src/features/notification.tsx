import { notification } from "antd";
import { WarningOutlined, CheckCircleOutlined } from "@ant-design/icons";

export const Notify = (message: string, isSuccess: boolean) => {
  return notification.open({
    message: isSuccess ? "Success" : "Error",
    description: message,
    icon: !isSuccess ? (
      <WarningOutlined style={{ color: "red" }} />
    ) : (
      <CheckCircleOutlined style={{ color: "green" }} />
    ),
  });
};
