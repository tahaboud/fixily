import { Box, Container, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import ArtisanLogin from "./ArtisanLogin";
import ClientLogin from "./ClientLogin";

const Body = () => {
  const [tab, setTab] = useState<"clientLogin" | "artisanLogin">("clientLogin");

  return (
    <Container maxWidth="xl">
      <Box>
        <Tabs value={tab} onChange={(_event, value) => setTab(value)}>
          <Tab label="Client Login" value={"clientLogin"} />
          <Tab label="Artisan Login" value={"artisanLogin"} />
        </Tabs>
      </Box>
      {tab === "clientLogin" ? <ClientLogin /> : <ArtisanLogin />}
    </Container>
  );
};

export default Body;
