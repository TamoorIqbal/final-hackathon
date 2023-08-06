import React, { useContext, useState } from "react";
import { MyContext } from "../Context/AppContext";
import { Close } from "@mui/icons-material";
import { baseUrl } from "../utils/constants";
import profile from "../assets/Profile.png";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  Box,
  Container,
  Typography,
} from "@mui/material";
import Loading from "../utils/Loading";

const sideArray = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "Dashboard",
    to: "/dashboard",
  },
  {
    name: "Profile",
    to: "/profile",
  },
  {
    name: "Cart",
    to: "/cart",
  },
  // {
  //   name: "Privacy",
  //   to: "/privacy",
  // },
];

const navStyle = {
  textDecoration: "none",
  fontWeight: 500,
  color: "#fff",
  //   color: "rgba(220, 220, 220, @.69)"
  fontSize: "1em",
  fontFamily: "Ubuntu",
};

const Header = ({ showToast }) => {
  const { setUser, user } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const logoutHandle = async () => {
    const token = localStorage.getItem("token");

    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/logout`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(response?.data);
      // alert("Logout Successfully !");
      showToast(response?.data?.message, "success");
      setUser(null);
      localStorage.removeItem("token");
      navigate("/");
      setLoading(false);
    } catch (error) {
      console.error(error.response?.data);
      setLoading(false);

      showToast(error.response?.data?.error, "error");
    }
  };
  const matches = useMediaQuery("(max-width:900px)");
  const isAdmin = user?.role === "admin";
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = React.useCallback((event) => {
    setAnchorElNav(event.currentTarget);
  }, []);

  const handleCloseNavMenu = React.useCallback(() => {
    setAnchorElNav(null);
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        {loading ? (
          <Loading loading={loading} />
        ) : (
          <Box
            // height={{ xs: "65px", md: "89px" }}
            display="flex"
            alignItems="center"
            py={2}
            // backgroundColor="#343d"
            // border="2px solid green "
            borderBottom="3px solid #fff"
          >
            <Box display="flex" flexGrow={1} alignItems="center" px={2}>
              <NavLink to="/">
                <Box mt={{ xs: 1, md: 0.5 }} marginRight={"30px"}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        height: "60px",
                        width: "60px",
                        borderRadius: "50%",
                        border: "2px solid #fff",
                        overflow: "hidden",
                      }}
                    >
                      {user ? (
                        <img
                          style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                          }}
                          src={`${baseUrl}/${user?.profileImage}`}
                          alt=""
                        />
                      ) : (
                        <img
                          style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                          }}
                          src={profile}
                          alt="logo"
                        />
                      )}
                    </Box>
                    <Typography
                      sx={{
                        fontSize: "20px",
                        fontWeight: 700,
                        color: "#fff",
                      }}
                    >
                      {user?.userName.split(" ")[0].toUpperCase()}
                    </Typography>
                  </Box>
                </Box>
              </NavLink>

              {matches ? (
                <Box
                  display={{ xs: "flex", md: "none" }}
                  flexGrow={1}
                  justifyContent={"flex-end"}
                >
                  {anchorElNav === null ? (
                    <IconButton
                      size="large"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      color="inherit"
                      onClick={handleOpenNavMenu}
                    >
                      <MenuIcon
                        sx={{
                          color: "#fff",
                          outline: "none",
                          fontSize: "25px",
                        }}
                      />
                    </IconButton>
                  ) : (
                    <IconButton
                      size="large"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      color="inherit"
                      onClick={handleCloseNavMenu}
                    >
                      <Close sx={{ color: "#fff", fontSize: "25px" }} />
                    </IconButton>
                  )}

                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: "block", md: "none" },
                      "& .MuiPaper-root": {
                        // background:
                        //   "linear-gradient(90deg, rgba(0, 151, 178, 1) 50%,rgba(126, 217, 87, 1) 100%)",
                        color: "#fff",
                        backgroundImage:
                          "url('http://cdn.wallpapersafari.com/13/6/Mpsg2b.jpg')",
                        marginTop: "30px",
                        backgroundSize: " 100% 110%",
                        width: "100%",
                      },
                    }}
                  >
                    {sideArray.map(({ name, to, icon }, i) => {
                      const isActive = location.pathname === to;
                      if (name === "Dashboard" && !isAdmin) {
                        return null;
                      }
                      return (
                        <MenuItem key={i} onClick={handleCloseNavMenu}>
                          <NavLink
                            to={to}
                            style={{
                              ...navStyle,
                              ...(isActive && {
                                color: "#000",
                              }),
                            }}
                          >
                            {name}
                          </NavLink>
                        </MenuItem>
                      );
                    })}
                    {!user ? (
                      <Box>
                        <Button
                          sx={{
                            ml: "15px",
                            // backgroundColor: " #000",
                            border: "1px solid #fff",

                            borderRadius: "10px",
                            fontWeight: 500,
                            px: 3,
                            color: "#fff ",
                            py: 1,
                            fontFamily: "cooper_hewittsemibold",
                            "&:hover": {
                              backgroundColor: "#fff",
                              color: "#000",
                            },
                          }}
                          onClick={() => navigate("/login")}
                        >
                          Login
                        </Button>
                        <Button
                          sx={{
                            ml: "15px",
                            // backgroundColor: " #000",
                            border: "1px solid #fff",

                            borderRadius: "10px",
                            fontWeight: 500,
                            px: 3,
                            color: "#fff ",
                            py: 1,
                            fontFamily: "cooper_hewittsemibold",
                            "&:hover": {
                              backgroundColor: "#fff",
                              color: "#000",
                            },
                          }}
                          onClick={() => navigate("/signup")}
                        >
                          Register
                        </Button>
                      </Box>
                    ) : (
                      <Button
                        sx={{
                          ml: "15px",
                          // backgroundColor: " #000",
                          border: "1px solid #fff",

                          borderRadius: "10px",
                          fontWeight: 500,
                          px: 3,
                          color: "#fff ",
                          py: 1,
                          fontFamily: "cooper_hewittsemibold",
                          "&:hover": {
                            backgroundColor: "#fff",
                            color: "#000",
                          },
                        }}
                        onClick={logoutHandle}
                      >
                        Logout
                      </Button>
                    )}
                  </Menu>
                </Box>
              ) : (
                <>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    flexGrow={1}
                    alignItems="center"
                    gap={"20px"}
                  >
                    {sideArray?.map(({ name, to, icon }, i) => {
                      const isActive = location.pathname === to;
                      if (name === "Dashboard" && !isAdmin) {
                        return null;
                      }
                      return (
                        <Box mr={{ md: 2.5, lg: 4 }} key={i}>
                          <NavLink
                            to={to}
                            style={{
                              ...navStyle,
                              ...(isActive && {
                                color: "#000",
                              }),
                            }}
                          >
                            {name}
                          </NavLink>
                        </Box>
                      );
                    })}
                  </Box>

                  {!user ? (
                    <>
                      <Button
                        sx={{
                          // backgroundColor: " #000",
                          border: "1px solid #fff",
                          mx: 1,
                          width: "100px",
                          color: "#fff ",
                          borderRadius: "10px",
                          fontWeight: 500,
                          px: 3,
                          py: 1,
                          fontFamily: "cooper_hewittsemibold",
                          "&:hover": {
                            backgroundColor: "#fff",
                            color: "#000 ",
                          },
                        }}
                        onClick={() => navigate("/login")}
                      >
                        Login
                      </Button>
                      <Button
                        sx={{
                          // backgroundColor: " #000",
                          border: "1px solid #fff",
                          color: "#fff ",
                          borderRadius: "10px",
                          fontWeight: 500,
                          mx: 1,
                          width: "100px",
                          px: 3,
                          py: 1,
                          fontFamily: "cooper_hewittsemibold",
                          "&:hover": {
                            backgroundColor: "#fff",
                            color: "#000 ",
                          },
                        }}
                        onClick={() => navigate("/signup")}
                      >
                        Register
                      </Button>
                    </>
                  ) : (
                    <Button
                      sx={{
                        // backgroundColor: " #000",
                        border: "1px solid #fff",
                        color: "#fff ",
                        borderRadius: "10px",
                        fontWeight: 500,
                        mx: 1,
                        width: "100px",
                        px: 3,
                        py: 1,
                        fontFamily: "cooper_hewittsemibold",
                        "&:hover": {
                          backgroundColor: "#fff",
                          color: "#000 ",
                        },
                      }}
                      onClick={logoutHandle}
                    >
                      Logout
                    </Button>
                  )}
                </>
              )}
            </Box>
          </Box>
        )}
      </Container>
    </>
  );
};

export default Header;
