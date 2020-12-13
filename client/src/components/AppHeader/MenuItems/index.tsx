import React from "react";
import { Avatar, Button, Menu } from "antd"
import { HomeOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { MenuItemsProps } from "./types";

const { Item, SubMenu } = Menu

export const MenuItems = ({ viewer }: MenuItemsProps) => {
  const SubMenuItem = viewer.id && viewer.avatar ? <SubMenu title={<Avatar src={viewer.avatar} />}>
    <Item>
      <Link to="/user">
        <UserOutlined />
        Profile
      </Link>
    </Item>
    <Item>
      <Link to="/logout">
        <LogoutOutlined />
        Logout
      </Link>
    </Item>
  </SubMenu> :
    <Item>
      <Link to="/login">
        <Button type="primary">
          Sign In
        </Button>
      </Link>
    </Item>;

  return <Menu selectable={false} className="menu" mode="horizontal">
    <Item>
      <Link to="/host">
        <HomeOutlined type="home" />
        Host
      </Link>
    </Item>
    {SubMenuItem}
  </Menu>
}

export * from "./types"