import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Box, IconButton, Link, useMediaQuery, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const isMobile = useMediaQuery("(max-width:640px)");

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}

      {isMobile ? (
        <Box display="flex">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>

          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <>
                <Button variant="contained" {...bindTrigger(popupState)}>
                  <MenuOutlinedIcon />
                </Button>
                <Menu className="w-72" {...bindMenu(popupState)}>
                  <MenuItem
                    onClick={popupState.close}
                    component={Link}
                    href="/dashboard"
                  >
                    ড্যাশবোর্ড
                  </MenuItem>

                  <MenuItem
                    onClick={popupState.close}
                    component={Link}
                    href="/adminform"
                  >
                    ব্যবহারকারী ফরম
                  </MenuItem>

                  <MenuItem
                    onClick={popupState.close}
                    component={Link}
                    href="/team"
                  >
                    ব্যবহারকারী তালিকা
                  </MenuItem>

                  <MenuItem
                    onClick={popupState.close}
                    component={Link}
                    href="/form"
                  >
                    নাগরিক ফরম
                  </MenuItem>

                  <MenuItem
                    onClick={popupState.close}
                    component={Link}
                    href="/citizens"
                  >
                    নাগরিক তালিকা
                  </MenuItem>

                  <MenuItem
                    onClick={popupState.close}
                    component={Link}
                    href="/prottoyon"
                  >
                    প্রত্যয়ন পত্র
                  </MenuItem>

                  <MenuItem
                    onClick={popupState.close}
                    component={Link}
                    href="/businessform"
                  >
                    ব্যবসায় ফরম
                  </MenuItem>

                  <MenuItem
                    onClick={popupState.close}
                    component={Link}
                    href="/businesses"
                  >
                    ব্যবসায়ী তালিকা
                  </MenuItem>

                  <MenuItem
                    onClick={popupState.close}
                    component={Link}
                    href="/tradelicenses"
                  >
                    ব্যবসায়ী সনদ
                  </MenuItem>

                  <MenuItem
                    onClick={popupState.close}
                    component={Link}
                    href="/citizenstax"
                  >
                    নাগরিক টেক্স
                  </MenuItem>

                  <MenuItem
                    onClick={popupState.close}
                    component={Link}
                    href="/businesstax"
                  >
                    ব্যবসায়ী টেক্স
                  </MenuItem>

                  <MenuItem
                    onClick={popupState.close}
                    component={Link}
                    href="/duetax"
                  >
                    বকেয়া টেক্স
                  </MenuItem>
                </Menu>
              </>
            )}
          </PopupState>
        </Box>
      ) : (
        <Box display="flex">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
          <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>
          <IconButton>
            <SettingsOutlinedIcon />
          </IconButton>
          <IconButton>
            <PersonOutlinedIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default Topbar;
