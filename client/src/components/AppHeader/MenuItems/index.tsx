import React from "react";
import { useMutation } from "@apollo/client"
import { Avatar, Button, Menu } from "antd"
import { HomeOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { MenuItemsProps } from "./types";
import { LogOut as LogOutData } from "../../../graphql/mutations/__generated__/LogOut";
import { LOG_OUT } from "../../../graphql/mutations/Logout";
import { displayErrorMessage, displaySuccessNotification } from "../../../utils";

const { Item, SubMenu } = Menu

export const MenuItems = ({ viewer, setViewer }: MenuItemsProps) => {
  const [logout] = useMutation<LogOutData>(LOG_OUT, {
    onCompleted: (data) => {
      if (data?.logOut) {
        setViewer(data.logOut);
        displaySuccessNotification("You've successfully logged out!");
      }
    },
    onError: () => displayErrorMessage("Sorry we're not able to log you out!")
  })

  const SubMenuItem = viewer.id && viewer.avatar ? <SubMenu title={<Avatar src={viewer.avatar} />}>
    <Item>
      <Link to={`/user/${viewer.id}`}>
        <UserOutlined />
        Profile
      </Link>
    </Item>
    <Item>
      <div onClick={() => logout()}>
        <LogoutOutlined />
          Logout
        </div>
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