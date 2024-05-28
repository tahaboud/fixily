import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import {
  StepConnector,
  StepIconProps,
  stepConnectorClasses,
  styled,
} from "@mui/material";

export const CustomConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#1ABC9C",
      borderStyle: "solid",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#1ABC9C",
      borderStyle: "solid",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "#CACED3",
    borderRadius: 1,
    borderStyle: "dotted",
  },
}));

export const CustomStepIconRoot = styled("div")<{
  ownerState: { active?: boolean };
}>(({ ownerState }) => ({
  color: "#CACED3",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#1ABC9C",
    fontSize: 18,
  }),
  "& .CustomStepIcon-completedIcon": {
    color: "#1ABC9C",
    zIndex: 1,
    fontSize: 18,
  },
  "& .CustomStepIcon-circle": {
    fontSize: 18,
  },
}));

export const CustomStepIcon = (props: StepIconProps) => {
  const { active, completed, className } = props;

  return (
    <CustomStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <CircleIcon className="CustomStepIcon-completedIcon" />
      ) : (
        <CircleOutlinedIcon className="CustomStepIcon-circle" />
      )}
    </CustomStepIconRoot>
  );
};
