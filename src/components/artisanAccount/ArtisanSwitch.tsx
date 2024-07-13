import { Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArtisanSwitchIcon from "../../assets/artisanSwitchIcon.svg";
import ClientSwitchIcon from "../../assets/clientSwitchIcon.svg";

export const ArtisanSwitch = styled(Switch)(() => ({
  width: "8em",
  height: "3em",
  "& .MuiSwitch-switchBase": {
    margin: 0,
    padding: 0,
    height: "2em",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translate(50px, 0px)",
      "& .MuiSwitch-thumb": {
        width: "2em",
        height: "2em",
      },
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url(${ArtisanSwitchIcon})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%",
        backgroundPosition: "center",
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#ECF0F14D",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: "2em",
    height: "2em",
    transform: "translate(15px, 12px)",
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url(${ClientSwitchIcon})`,
      backgroundSize: "cover",
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    height: "2em",
    backgroundColor: "#ECF0F14D",
    borderRadius: 20 / 2,
  },
}));
