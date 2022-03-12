import { change_login, change_mode } from '../Redux/actions'
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import "./navbar.css"


const Navbar = () => {
    const login = useSelector(store => store.login)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const mode = useSelector(store => store.mode)


    const [anchorElNav, setAnchorElNav] = React.useState(null);
    // const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    // const handleOpenUserMenu = (event) => {
    //     setAnchorElUser(event.currentTarget);
    // };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    // const handleCloseUserMenu = () => {
    //     setAnchorElUser(null);
    // };

    return (
        <AppBar position="static" color={mode === "black" ? 'secondary' : "primary"} className="navs">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                    >
                        Todo
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left"
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left"
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" }
                            }}
                        >
                            {!login ?
                                <div>
                                    <MenuItem onClick={() => navigate("/login")}>
                                        <Typography textAlign="center">Login</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => navigate("/signup")}>
                                        <Typography textAlign="center">Signup</Typography>
                                    </MenuItem>


                                </div>
                                :
                                <MenuItem onClick={() => dispatch(change_login())}>
                                    <Typography textAlign="center">logout</Typography>
                                </MenuItem>
                            }
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                    >
                        Todo
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {!login ?
                            <>

                                <Button
                                    onClick={() => navigate("/login")}
                                    sx={{ my: 2, color: "white", display: "block" }}
                                >
                                    Login
                                </Button>
                                <Button
                                    onClick={() => navigate("/signup")}
                                    sx={{ my: 2, color: "white", display: "block" }}
                                >
                                    Signup
                                </Button>

                            </>
                            :
                            <Button
                                onClick={() => dispatch(change_login())}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                Logout
                            </Button>
                        }
                    </Box>
                    {mode === "white" ? <button className='mode-btn' onClick={() => dispatch(change_mode("black"))} > <DarkModeIcon/> </button> : <button className='mode-btn light' onClick={() => dispatch(change_mode("white"))} > <LightModeIcon /> </button>}

                </Toolbar>
            </Container>
        </AppBar>
    );
};










// const Navbar = () => {

//     const login = useSelector(store => store.login)
//     const dispatch = useDispatch()

//     return (
//         <div className='navbars'>
//             <NavLink to="/">Home</NavLink>
//             {login? <button onClick={() => dispatch(change_login())}>Logout</button>: <NavLink to="/login">Login</NavLink> }

//         </div>
//     )
// }

export default Navbar