import { useState } from "react";
import LoginComponent from "./LoginComponent";
import SignupComponent from "./SignupComponent";

const LookingForArtisanStep = ({
  handleCreateJob,
}: {
  handleCreateJob: () => void;
}) => {
  const [loginComponent, setLoginComponent] = useState<"login" | "register">(
    "login"
  );

  return loginComponent === "login" ? (
    <LoginComponent
      setLoginComponent={setLoginComponent}
      handleCreateJob={handleCreateJob}
    />
  ) : (
    <SignupComponent
      setLoginComponent={setLoginComponent}
      handleCreateJob={handleCreateJob}
    />
  );
};

export default LookingForArtisanStep;
