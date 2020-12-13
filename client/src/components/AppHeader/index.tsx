import React from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";

import logo from "./assets/tinyhouse-logo.png";
import { MenuItems } from "./MenuItems"

const { Header } = Layout;

export const AppHeader = () => {
  return <Header className="app-header">
    <div className="app-header__logo-search-section">
      <div className="app-header__logo">
        <Link to="/">
          <img src={logo} alt="Tinyhouse Logo" />
        </Link>
      </div>
    </div>
    <div className="app-header__menu-section">
      <MenuItems />
    </div>
  </Header>
}