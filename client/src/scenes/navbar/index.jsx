import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]); // For storing search results
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Moved useSelector hook outside handleSearch
  const user = useSelector((state) => state.user);
  // const token = useSelector((state) => state.auth?.token);
  const token = useSelector((state) => state.token);
  // console.log(token, "..."); // Check if `auth` is correctly populated
  // Safe fallback
  // Get token here
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const fullName = `${user.firstName} ${user.lastName}`;

  // Handle the search logic
  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length > 0) {
      try {
        console.log(e.target.value);
        const response = await fetch(
          `http://localhost:8000/search/users?query=${e.target.value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Use token from state
            },
          }
        );
        const result = await response.json();
        setSearchResults(result); // Assuming the backend returns a list of matching users
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  // Handle user selection from dropdown
  const handleUserSelect = (selectedUser) => {
    setSearchTerm(""); // Clear the search input after selection
    setSearchResults([]); // Clear the dropdown
    console.log(selectedUser)
    navigate(`/profile/${selectedUser._id}`); // Redirect to the selected user's profile
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/"); // Redirect the user to the login page after logging out
  };

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem,2rem,2.25rem)"
          color="#1b5e20"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: "#487e4c",
              cursor: "pointer",
            },
          }}
        >
          Connectify
        </Typography>

        {/* Search Bar */}
        {isNonMobileScreens && (
          <Box position="relative" width="300px">
            <FlexBetween
              backgroundColor={neutralLight}
              borderRadius="9px"
              gap="3rem"
              padding="0.1rem 1.5rem"
            >
              <InputBase
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch} // Search on input change
              />
              <IconButton>
                <Search />
              </IconButton>
            </FlexBetween>

            {/* Dropdown for search results */}
            {searchResults.length > 0 && (
              <Box
                position="absolute"
                top="100%"
                left="0"
                width="100%"
                maxHeight="200px"
                backgroundColor={neutralLight}
                boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
                borderRadius="0 0 9px 9px"
                overflow="auto"
                zIndex="10"
              >
                {searchResults.map((result) => (
                  <MenuItem
                    key={result._id}
                    onClick={() => handleUserSelect(result)}
                    sx={{ "&:hover": { backgroundColor: primaryLight } }}
                  >
                    <Typography>
                      {result.firstName} {result.lastName}
                    </Typography>
                  </MenuItem>
                ))}
              </Box>
            )}
          </Box>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          {/* User Dropdown */}
          <Box>{fullName}</Box>
          <IconButton onClick={handleLogout}>
            <Typography>Logout</Typography>
          </IconButton>{" "}
          {/* Logout button */}
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* Close Icon */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* Menu Items */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="2rem"
          >
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <Typography>{fullName}</Typography>
            <IconButton onClick={handleLogout}>
              <Typography>Logout</Typography>
            </IconButton>{" "}
            {/* Mobile Logout button */}
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
