import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { logout } from "../../state/actions/authActions";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, data, token } = useAppSelector(
    (state) => state.auth
  );
  const onLogout = () => {
    if (token) {
      dispatch(logout({ token }));
    }
  };
  return (
    <Box sx={{ backgroundColor: "#FFFFFF" }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "4em",
          }}
        >
          <Typography>Logo</Typography>
          <Box>
            {isAuthenticated ? (
              <>
                {data && data.is_admin && (
                  <Button
                    variant="contained"
                    onClick={() => navigate("/admin")}
                  >
                    Admin panel
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={() => navigate("/account")}
                >
                  My Account
                </Button>
                <Button variant="contained" onClick={onLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="contained" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button variant="contained" onClick={() => navigate("/signup")}>
                  Signup
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
