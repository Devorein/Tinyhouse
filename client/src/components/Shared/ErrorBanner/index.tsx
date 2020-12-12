import React from "react";
import { Alert } from "antd";
import { ErrorBannerProps } from "./types";

export function ErrorBanner({ message = "Something went wrong", description = "Please check your internet connection and try again" }: ErrorBannerProps) {
  return <Alert closable type="error" message={message} description={description} banner className="error-banner" />
} 