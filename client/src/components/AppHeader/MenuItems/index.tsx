import React from "react";
import { Button, Menu } from "antd"
import { HomeOutlinedIcon } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Item } = Menu

export const MenuItems = () => {
  return <Menu selectable={false} className="menu" mode="horizontal">
    <Item>
      <Link to="/host">
        <HomeOutlinedIcon type="home" />
        Host
      </Link>
    </Item>
    <Item>
      <Link to="/login">
        <Button type="primary">
          Sign In
      </Button>
      </Link>
    </Item>
  </Menu>
}