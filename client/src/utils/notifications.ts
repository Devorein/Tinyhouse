import { notification, message } from "antd";

export const displaySuccessNotification = (message: string, description?: string) => {
  notification["success"]({
    placement: "topLeft",
    description,
    message,
    style: {
      marginTop: 50
    }
  })
}

export const displayErrorMessage = (error: string) => {
  return message.error(error)
}
