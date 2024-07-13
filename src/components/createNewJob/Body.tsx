import { Container, Step, StepLabel, Stepper } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { createJob } from "../../state/actions/servicesAction";
import { Commune, SubCategory, Wilaya } from "../../types";
import { CustomConnector, CustomStepIcon } from "../photo/CustomStepper";
import JobDescriptionStep from "./JobDescriptionStep";
import LocationStep from "./LocationStep";
import LoginStep from "./LoginStep";
import SubCategoryStep from "./SubCategoryStep";

const Body = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, _] = useSearchParams();

  const { token } = useAppSelector((state) => state.auth);

  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategory | null>(null);
  const [description, setDescription] = useState("");
  const [selectedWilaya, setSeletedWilaya] = useState<Wilaya | null>(null);
  const [selectedCommune, setSeletedCommune] = useState<Commune | null>(null);
  const [jobImages, setJobImages] = useState<Array<File> | null>(null);

  useEffect(() => {
    const categoryIdParam = searchParams.get("category");
    if (categoryIdParam === null) {
      navigate("/");
    } else {
      setCategoryId(categoryIdParam);
    }
  }, [searchParams, setCategoryId, navigate]);

  const handleCreateJob = () => {
    if (token) {
      if (selectedSubCategory && selectedCommune && selectedWilaya) {
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
      }
      navigate("/account");
    } else {
      setStep(3);
    }
  };

  const getCurrentStep = () => {
    switch (step) {
      case 0:
        return (
          <SubCategoryStep
            setStep={setStep}
            categoryId={categoryId}
            selectedSubCategory={selectedSubCategory}
            setSelectedSubCategory={setSelectedSubCategory}
          />
        );
      case 1:
        return (
          <JobDescriptionStep
            setStep={setStep}
            description={description}
            setDescription={setDescription}
            jobImages={jobImages}
            setJobImages={setJobImages}
          />
        );
      case 2:
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
      case 3:
        return <LoginStep handleCreateJob={handleCreateJob} />;

      default:
        break;
    }
  };

  return (
    <Container maxWidth="md" sx={{ height: "100vh" }}>
      <Stepper
        alternativeLabel
        activeStep={step}
        connector={<CustomConnector />}
        sx={{ width: "100%", padding: "1em" }}
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
      </Stepper>
      {getCurrentStep()}
    </Container>
  );
};

export default Body;
