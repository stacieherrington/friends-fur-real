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
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, Avatar } from "@mui/material";
import ManagementMenu from "./Manage/ManagementMenu";
import { useEffect, useState } from "react";
import { useGetTokenQuery } from "./redux/api";
import { useLogoutMutation } from "./redux/api";

const drawerWidth = 240;

// function DrawerAppBar(props) {
//   const { window } = props;
//   const [mobileOpen, setMobileOpen] = React.useState(false);
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [anchorEl1, setAnchorEl1] = React.useState(null);
//   const [anchorEl2, setAnchorEl2] = React.useState(null);
//   const [anchorEl3, setAnchorEl3] = React.useState(null);

//   const { roles, setRoles } = props;

//   // const [roles, setRoles] = useState([]);
//   // useEffect(() => {
//   //   const checkTokenUrl = `${process.env.REACT_APP_API_HOST}/token/`;
//   //   const fetchConfig = {
//   //     method: 'get',
//   //     credentials: "include",
//   //   }
//   //   fetch(checkTokenUrl, fetchConfig)
//   //     .then(res => res.json())
//   //     .then(data => {
//   //       if (data) {
//   //         setRoles(data.account.roles);
//   //       }
//   //     })
//   //     .catch(e => console.error(e));
//   //   console.log(roles.includes("staff"));
//   // }, [])

//   const logout = async () => {
//     const response = await fetch(`${process.env.REACT_APP_API_HOST}/token`, {
//       method: 'DELETE',
//       credentials: "include",
//     });
//     if (response.ok) {
//       setRoles([]);
//       console.log("logged out");
//     } else {
//       console.error(response)
//     }
//   }

function DrawerAppBar(props) {
  const {
    data: tokenData,
    error: tokenError,
    isLoading: tokenLoading,
  } = useGetTokenQuery();
  const [logout, { data: logoutData }] = useLogoutMutation();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [anchorEl3, setAnchorEl3] = React.useState(null);

  const handleMenu1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleMenu2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenu3 = (event) => {
    setAnchorEl3(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleClose3 = () => {
    setAnchorEl3(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        FFR Logo
      </Typography>
      <Divider />
      <List>
        <Link href='/'>
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <ListItem disablePadding>
          <ListItemButton onClick={handleMenu3} sx={{ textAlign: "center" }}>
            <ListItemText primary={"Rescues"} />
          </ListItemButton>
          <Menu
            id='menu-appbar1'
            anchorEl={anchorEl3}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl3)}
            onClose={handleClose3}
          >
            <MenuItem onClick={handleClose3}>Rescue Link 1</MenuItem>
            <MenuItem onClick={handleClose3}>Rescue Link 2</MenuItem>
            <MenuItem onClick={handleClose3}>Rescue Link 3</MenuItem>
          </Menu>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={handleMenu} sx={{ textAlign: "center" }}>
            <ListItemText primary={"Adopters"} />
          </ListItemButton>
        </ListItem>
        <Menu
          id='menu-appbar2'
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Adopter Link 1</MenuItem>
          <MenuItem onClick={handleClose}>Adopter Link 2</MenuItem>
        </Menu>
        <Link href='/signup'>
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={"Signup"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href='/login'>
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={"Login"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href='/login'>
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }} onClick={logout}>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </ListItem>
        </Link>
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
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Avatar
              alt='Cute Logo'
              src='images/cute-icon.png'
              sx={{ width: 60, height: 60 }}
            />
          </Typography>
          {/* <ManagementMenu
            is_staff={roles.includes("staff")}
            is_admin={roles.includes("admin")}
          /> */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button href='/' sx={{ color: "#fff" }}>
              Home
            </Button>
            <Button onClick={handleMenu1} sx={{ color: "#fff" }}>
              Rescues
            </Button>
            <Menu
              id='menu-appbar3'
              anchorEl={anchorEl1}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl1)}
              onClose={handleClose1}
            >
              <MenuItem onClick={handleClose1}>Rescue Link 1</MenuItem>
              <MenuItem onClick={handleClose1}>Rescue Link 2</MenuItem>
            </Menu>
            <Button onClick={handleMenu2} sx={{ color: "#fff" }}>
              Adopters
            </Button>
            <Menu
              id='menu-appbar4'
              anchorEl={anchorEl2}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl2)}
              onClose={handleClose2}
            >
              <MenuItem onClick={handleClose2}>Adopters Link 1</MenuItem>
              <MenuItem onClick={handleClose2}>Adopters Link 2</MenuItem>
            </Menu>
            {tokenData ? (
              <Button href='/login' sx={{ color: "#fff" }} onClick={logout}>
                Logout
              </Button>
            ) : (
              <>
                <Button href='/signup' sx={{ color: "#fff" }}>
                  Signup
                </Button>

                <Button href='/login' sx={{ color: "#fff" }}>
                  Login
                </Button>
              </>
            )}
          </Box>
          <div>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              // onClick={}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
          </div>
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
