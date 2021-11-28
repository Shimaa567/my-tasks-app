import React from "react";
import { DashboardMenuItem, Menu, MenuItemLink } from "react-admin";

export const MyMenu = (props) => {
  return (
    <div>
      <Menu {...props}>
        <MenuItemLink to="/" leftIcon={<DashboardMenuItem />} />
      </Menu>
    </div>
  );
};
