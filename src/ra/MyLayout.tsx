import * as React from "react";
import {
  UserMenu,
  MenuItemLink,
  Layout,
  Sidebar,
  Menu,
  useLocale,
  useSetLocale,
  AppBar,
} from "react-admin";

import { ListItemIcon, MenuItem } from "@material-ui/core";
import * as Icons from "@material-ui/icons";

const MyMenu = (props) => (
  <Menu {...props}>
    <MenuItemLink to="/" primaryText="Home" leftIcon={<Icons.Home />} />
    {/* <MenuItemLink to="/orders" primaryText="Orders" leftIcon={<Icons.ShoppingCart />}/> */}
  </Menu>
);

const MySidebar = (props) => {
  return <Sidebar {...props} />;
};
const ConfigurationMenu = React.forwardRef((props: any, ref) => {
  const locale = useLocale();
  const setLocale = useSetLocale();
  return (
    <MenuItem
      onClick={() => {
        setLocale(locale === "en" ? "ar" : "en");
        props.onClick();
      }}
    >
      <ListItemIcon>
        <Icons.Language />
      </ListItemIcon>
      {locale === "en" ? "عربي" : "En"}
    </MenuItem>
  );
});

const MyUserMenu = (props) => (
  <UserMenu {...props}>
    <ConfigurationMenu />
  </UserMenu>
);

const MyAppBar = (props) => (
  <AppBar {...props} color="primary" userMenu={<MyUserMenu />} />
);

export const MyLayout = (props) => (
  <Layout {...props} appBar={MyAppBar} sidebar={MySidebar} menu={MyMenu} />
);
