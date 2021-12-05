// import * as React from "react";
// import {
//   UserMenu,
//   MenuItemLink,
//   Layout,
//   Sidebar,
//   Menu,
//   useLocale,
//   useSetLocale,
//   AppBar,
// } from "react-admin";

// import { ListItemIcon, MenuItem } from "@material-ui/core";
// import * as Icons from "@material-ui/icons";

// const MyMenu = (props) => (
//   <Menu {...props}>
//     <MenuItemLink to="/" primaryText="Home" leftIcon={<Icons.Home />} />
//     {/* <MenuItemLink to="/orders" primaryText="Orders" leftIcon={<Icons.ShoppingCart />}/> */}
//   </Menu>
// );

// const MySidebar = (props) => {
//   return <Sidebar {...props} />;
// };
// const ConfigurationMenu = React.forwardRef((props: any, ref) => {
//   const locale = useLocale();
//   const setLocale = useSetLocale();
//   return (
//     <MenuItem
//       onClick={() => {
//         setLocale(locale === "en" ? "ar" : "en");
//         props.onClick();
//       }}
//     >
//       <ListItemIcon>
//         <Icons.Language />
//       </ListItemIcon>
//       {locale === "en" ? "عربي" : "En"}
//     </MenuItem>
//   );
// });

// const MyUserMenu = (props) => (
//   <UserMenu {...props}>
//     <ConfigurationMenu />
//   </UserMenu>
// );

// const MyAppBar = (props) => (
//   <AppBar {...props} color="primary" userMenu={<MyUserMenu />} />
// );

// export const MyLayout = (props) => (
//   <Layout {...props} appBar={MyAppBar} sidebar={MySidebar} menu={MyMenu} />
// );
import * as React from "react";
import { MyAppBar } from "./Layout/MyAppBar";
import { MyMenu } from "./Layout/MyMenu";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Sidebar, Notification, ComponentPropType } from "react-admin";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    zIndex: 1,
    minHeight: "100vh",
    backgroundColor: theme.palette.background.default,
    position: "relative",
  },
  appFrame: {
    display: "flex",
    flexDirection: "column",
    overflowX: "auto",
  },
  contentWithSidebar: {
    display: "flex",
    flexGrow: 1,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 2,
    padding: theme.spacing(2),
    paddingLeft: 5,
  },
}));

const MyLayout = ({ children, dashboard, logout, title }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.appFrame}>
        <MyAppBar title={title} logout={logout} />
        <main className={classes.contentWithSidebar}>
          <Sidebar>
            <MyMenu logout={logout} hasDashboard={!!dashboard} />
          </Sidebar>
          <div className={classes.content}>{children}</div>
        </main>
        <Notification />
      </div>
    </div>
  );
};

MyLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  dashboard: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  logout: ComponentPropType,
  title: PropTypes.string.isRequired,
};

export default MyLayout;
