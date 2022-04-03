import React, { useRef } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Camera from "@components/shared/Camera";

type InspectionStep = {
  label: string;
  description?: string;
  needPhoto?: boolean;
  needSignature?: boolean;
};

const steps: InspectionStep[] = [
  {
    label: "Take a picture of the car from the front",
    needPhoto: true,
  },
  {
    label: "Take a picture of the car from the passenger side",
    needPhoto: true,
  },
  {
    label: "Take a picture of the car from behind",
    needPhoto: true,
  },
  {
    label: "Take a picture of the car from the driver side",
    needPhoto: true,
  },
  {
    label: "Take pictures of damage",
    description:
      "Take pictures of damage, if any, to the car (scratches, dents, cracks and chips in the windows).",
    needPhoto: false,
  },
  {
    label: "Get a customer signature",
    needSignature: true,
  },
  {
    label: "Load the car on a tow truck",
  },
  {
    label: "Make sure that the car is securely fastened",
    description: `Check that all wheels of the vehicle are securely fastened with straps and that the straps are undamaged. 
      Check that there are no parts on the vehicle that could be lost during towing.`,
  },
];

const stepMask: Record<number, string> = {
  0: "/images/car-front.svg",
  1: "/images/car-right-side.svg",
  2: "/images/car-rear.svg",
  3: "/images/car-left-side.svg",
};

const Inspection = () => {
  const photos = useRef<string[]>([]);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isCameraOpen, setIsCameraOpen] = React.useState(false);

  const openCamera = () => {
    setIsCameraOpen(true);
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
  };

  const onPhoto = (photoUrl: string) => {
    if (activeStep > 3) {
      photos.current[photos.current.length] = photoUrl;
    } else {
      photos.current[activeStep] = photoUrl;
    }
    setIsCameraOpen(false);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const jumpToStep = (step: number) => () => {
    if (activeStep > step) setActiveStep(step);
  };

  const lastStep = steps.length - 1;
  return (
    <article className="content">
      <section>
        <p className="py-2">
          Before you load the car on the tow truck,
          <br />
          you need to inspect the car to be picked up:
        </p>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => {
            const isPhotoNeeded = "needPhoto" in step;
            const imgUrl = photos.current[index];
            const cantMoveOn = isPhotoNeeded && step.needPhoto && !imgUrl;
            return (
              <Step key={step.label} onClick={jumpToStep(index)}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  {step.description && (
                    <Typography>{step.description}</Typography>
                  )}

                  {isPhotoNeeded && imgUrl && (
                    <section className="flex space-x-1 max-w-full overflow-x-auto">
                      {index === 4 ? (
                        photos.current
                          .slice(4)
                          .map((photo, index) => (
                            <img key={index} height={100} src={photo} alt="" />
                          ))
                      ) : (
                        <img height={100} src={imgUrl} alt="" />
                      )}
                    </section>
                  )}

                  <div className="py-2 space-x-2">
                    {isPhotoNeeded && (
                      <Button variant="outlined" onClick={openCamera}>
                        Open camera
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      disabled={cantMoveOn}
                    >
                      {index === lastStep ? "Finish" : "Next"}
                    </Button>
                    <Button disabled={index === 0} onClick={handleBack}>
                      Back
                    </Button>
                  </div>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
      </section>

      {isCameraOpen && (
        <Camera
          onPhoto={onPhoto}
          onClose={closeCamera}
          maskImage={stepMask[activeStep] || ""}
        />
      )}
    </article>
  );
};

export default Inspection;
