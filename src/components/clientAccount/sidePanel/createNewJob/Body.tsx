import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { createJob } from "../../../../state/actions/servicesAction";
import { Category, Commune, SubCategory, Wilaya } from "../../../../types";
import { CustomConnector, CustomStepIcon } from "../../../photo/CustomStepper";
import CategoryStep from "./CategoryStep";
import JobDescriptionStep from "./JobDescriptionStep";
import LocationStep from "./LocationStep";
import LookingForArtisanStep from "./LookingForArtisanStep";
import SubCategoryStep from "./SubCategoryStep";

const Body = ({
  setSidePanelOpen,
}: {
  setSidePanelOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();

  const { token } = useAppSelector((state) => state.auth);

  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategory | null>(null);
  const [description, setDescription] = useState("");
  const [selectedWilaya, setSeletedWilaya] = useState<Wilaya | null>(null);
  const [selectedCommune, setSeletedCommune] = useState<Commune | null>(null);
  const [jobImages, setJobImages] = useState<Array<File> | null>(null);

  const handleCreateJob = () => {
    if (token && selectedSubCategory && selectedCommune && selectedWilaya) {
      dispatch(
        createJob({
          token,
          description,
          images: jobImages,
          subCategory: selectedSubCategory.id,
          commune: selectedCommune.id,
          wilaya: selectedWilaya.id,
        })
      );
      setStep(4);
    }
  };

  const getCurrentStep = () => {
    switch (step) {
      case 0:
        return (
          <CategoryStep
            setStep={setStep}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        );
      case 1:
        return (
          <SubCategoryStep
            setStep={setStep}
            selectedCategory={selectedCategory}
            selectedSubCategory={selectedSubCategory}
            setSelectedSubCategory={setSelectedSubCategory}
          />
        );
      case 2:
        return (
          <JobDescriptionStep
            setStep={setStep}
            description={description}
            setDescription={setDescription}
            jobImages={jobImages}
            setJobImages={setJobImages}
          />
        );
      case 3:
        return (
          <LocationStep
            setStep={setStep}
            selectedCommune={selectedCommune}
            setSelectedCommune={setSeletedCommune}
            selectedWilaya={selectedWilaya}
            setSelectedWilaya={setSeletedWilaya}
            handleCreateJob={handleCreateJob}
          />
        );
      case 4:
        return <LookingForArtisanStep setSidePanelOpen={setSidePanelOpen} />;

      default:
        break;
    }
  };

  return (
    <Box sx={{ height: "calc(100vh - 5em)" }}>
      <Stepper
        alternativeLabel
        activeStep={step}
        connector={<CustomConnector />}
        sx={{ width: "100%", height: "2em" }}
      >
        <Step>
          <StepLabel StepIconComponent={CustomStepIcon} />
        </Step>
        <Step>
          <StepLabel StepIconComponent={CustomStepIcon} />
        </Step>
        <Step>
          <StepLabel StepIconComponent={CustomStepIcon} />
        </Step>
        <Step>
          <StepLabel StepIconComponent={CustomStepIcon} />
        </Step>
      </Stepper>
      <Box sx={{ height: "calc(100% - 2em)" }}>{getCurrentStep()}</Box>
    </Box>
  );
};

export default Body;
