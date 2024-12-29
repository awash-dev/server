import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close"; 
import { Link } from "react-router-dom"; 
import HomeIcon from "@mui/icons-material/Home"; 
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; 
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; 
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ChecklistIcon from "@mui/icons-material/Checklist";
import logo from "../assets/react.svg"; 

export default function Navbar() {
  const [state, setState] = React.useState({ left: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className="bg-gray-100 h-full shadow-lg transition-transform duration-300 transform"
      style={{ transform: state[anchor] ? 'translateX(0)' : 'translateX(-100%)' }} // Slide-in effect
    >
      <Button
        onClick={toggleDrawer(anchor, false)}
        className="flex justify-end text-black p-2 transition-opacity duration-200"
        style={{ opacity: state[anchor] ? 1 : 0 }} // Fade effect
      >
        <CloseIcon className="flex justify-end text-black" /> 
      </Button>
      <Box className="p-4 text-center flex flex-col items-center">
        <img src={logo} alt="Logo" className="w-2/3 h-auto" />
      </Box>
      <List>
        {[
          { text: "Overview", path: "/", icon: <HomeIcon /> },
          { text: "Product List", path: "/products", icon: <ChecklistIcon /> },
          {
            text: "Product Post",
            path: "/product-post",
            icon: <CloudUploadIcon />,
          },
          { text: "Order", path: "/order", icon: <ShoppingCartIcon /> },
          { text: "User", path: "/user", icon: <AccountCircleIcon /> },
        ].map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            className="mt-2  text-black hover:bg-blue-400  transform duration-200" // Margin top for spacing
          >
            <ListItemButton 
              component={Link} 
              to={item.path}
              className="flex items-center p-2 rounded-lg transition-colors duration-300 "
            >
              <ListItemIcon >{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} className="ml-2 " />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={"left"}>
        <Button onClick={toggleDrawer("left", true)}>
          <MenuIcon className="text-black" />
        </Button>
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          transitionDuration={300} // Set duration for the drawer transition
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
