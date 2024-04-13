import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ height: "10em", backgroundColor: "#FFFFFF" }}>
      <Container maxWidth="xl">
        <Typography sx={{ textAlign: "center" }}>This is the footer</Typography>
      </Container>
    </Box>
  );
};

export default Footer;
