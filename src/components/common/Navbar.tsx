import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
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
            <Button variant="contained" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button variant="contained" onClick={() => navigate("/signup")}>
              Signup
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
