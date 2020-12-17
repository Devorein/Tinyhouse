import React from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";

import logo from "../Shared/assets/tinyhouse-logo.png";
import { MenuItems } from "./MenuItems"
import { AppHeaderProps } from "./types";

const { Header } = Layout;

export const AppHeader = ({ viewer, setViewer }: AppHeaderProps) => {
  return <Header className="app-header">
    <div className="app-header__logo-search-section">
      <div className="app-header__logo">
        <Link to="/">
          <img src={logo} alt="Tinyhouse Logo" />
        </Link>
      </div>
    </div>
    <div className="app-header__menu-section">
      <MenuItems viewer={viewer} setViewer={setViewer} />
    </div>
  </Header>
}