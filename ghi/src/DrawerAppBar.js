import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, Avatar } from "@mui/material";
import ManagementMenu from "./Manage/ManagementMenu";
import { useGetTokenQuery } from "./redux/api";
import { useLogoutMutation } from "./redux/api";
import { useDispatch } from "react-redux";
import {
  SIGNUP_MODAL,
  openModal,
  LOGIN_MODAL,
} from "./redux/slices/modalSlice";
import { NavLink } from "react-router-dom";


const drawerWidth = 240;

function DrawerAppBar(props) {
  const dispatch = useDispatch();

  const {
    data: tokenData,
    error: tokenError,
    isLoading: tokenLoading,
  } = useGetTokenQuery();
  const [logout, { data: logoutData }] = useLogoutMutation();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <div align='center' sx={{ my: 2 }}>
        <Avatar
          alt='Cute Logo'
          src='../images/cute-icon.png'
          sx={{ width: 60, height: 60 }}
        />
      </div>
      <Divider />
      <List>
        <Link href='/' underline='none'>
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href='/pets' underline='none'>
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={"Find a Friend"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href='/stories' underline='none'>
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={"Stories"} />
            </ListItemButton>
          </ListItem>
        </Link>
        {!tokenData ? (
          <>
            <Link underline='none'>
              <ListItem disablePadding>
                <ListItemButton sx={{ mx: "auto" }}>
                  <Box
                    sx={{ mx: "auto" }}
                    onClick={() => {
                      dispatch(openModal(SIGNUP_MODAL));
                    }}
                  >
                    Signup
                  </Box>
                </ListItemButton>
              </ListItem>
            </Link>
            <Link underline='none'>
              <ListItem disablePadding>
                <ListItemButton sx={{ mx: "auto" }}>
                  <Box
                    sx={{ mx: "auto" }}
                    onClick={() => {
                      dispatch(openModal(LOGIN_MODAL));
                    }}
                  >
                    Login
                  </Box>
                </ListItemButton>
              </ListItem>
            </Link>
          </>
        ) : (
          <>
            <Link href='/' underline='none'>
              <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: "center" }} onClick={logout}>
                  <ListItemText primary={"Logout"} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href='/accounts/profile/' underline='none'>
              <ListItem disablePadding>
                <ListItemButton
                  size='large'
                  aria-haspopup='true'
                  color='inherit'
                  align='center'
                >
                  <AccountCircle />
                </ListItemButton>
              </ListItem>
            </Link>
          </>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component='nav' sx={{ backgroundColor: "#294C60" }}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component='div'
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Avatar
              alt='Cute Logo'
              src='/images/cute-icon.png'
              sx={{ width: 60, height: 60 }}
            />
          </Box>
          {tokenData ? (
            <ManagementMenu
              is_staff={tokenData.account.roles.includes("staff")}
              is_admin={tokenData.account.roles.includes("admin")}
            />
          ) : null}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button href='/' sx={{ color: "#fff" }}>
              Home
            </Button>
            <Button color='inherit' href='/pets'>
              Find a Friend
            </Button>
            <Button href='/stories' sx={{ color: "#fff" }}>
              Stories
            </Button>
            {tokenData ? (
              <>
                <Button href='/' sx={{ color: "#fff" }} onClick={logout}>
                  Logout
                </Button>
                <NavLink to="/accounts/profile/" style={() => ({color: "white"})}>
                  <IconButton
                    size='large'
                    aria-label='account of current user'
                    aria-controls='menu-appbar'
                    aria-haspopup='true'
                    color='inherit'
                    // href='/accounts/profile/'
                  >
                    <AccountCircle />
                  </IconButton>
                </NavLink>
              </>
            ) : (
              <>
                <Button
                  sx={{ color: "#fff" }}
                  onClick={() => {
                    dispatch(openModal(SIGNUP_MODAL));
                  }}
                >
                  Signup
                </Button>

                <Button
                  sx={{ color: "#fff" }}
                  onClick={() => {
                    dispatch(openModal(LOGIN_MODAL));
                  }}
                >
                  Login
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component='nav'>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
