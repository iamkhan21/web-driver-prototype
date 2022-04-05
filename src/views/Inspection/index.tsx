import React, { ChangeEvent, useRef } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CustomCamera from "@components/shared/CustomCamera";
import { getFileUrl } from "@utils/file";

type InspectionStep = {
  label: string;
  description?: string;
  needPhoto?: boolean;
  needVideo?: boolean;
  simpleCamera?: boolean;
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
    simpleCamera: true,
  },
  {
    label: "Take video of damage",
    needVideo: false,
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
  const inspectionPhotos = useRef<string[]>([]);
  const photoInput = useRef<HTMLInputElement>(null);
  const videoInput = useRef<HTMLInputElement>(null);

  const [activeStep, setActiveStep] = React.useState(0);
  const [isCameraOpen, setIsCameraOpen] = React.useState(false);
  const [damagePhotos, setDamagePhotos] = React.useState<string[]>([]);
  const [damageVideo, setDamageVideo] = React.useState<string>();

  const openCamera = () => {
    setIsCameraOpen(true);
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
  };

  const onPhoto = (photoUrl: string) => {
    inspectionPhotos.current[activeStep] = photoUrl;
    setIsCameraOpen(false);
  };

  function openSimpleCamera() {
    photoInput.current?.click();
  }

  function openVideoCamera() {
    videoInput.current?.click();
  }

  function onPhotoSelect(e: ChangeEvent<HTMLInputElement>) {
    const file = (e.currentTarget?.files || [])[0];

    if (file) {
      damagePhotos[damagePhotos.length] = getFileUrl(file);
      setDamagePhotos([...damagePhotos]);
    }
  }

  function onVideoSelect(e: ChangeEvent<HTMLInputElement>) {
    const file = (e.currentTarget?.files || [])[0];

    if (file) {
      setDamageVideo(getFileUrl(file));
    }
  }

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
            const isVideoNeeded = "needVideo" in step;
            const imgUrl = inspectionPhotos.current[index];
            const cantMoveOn = isPhotoNeeded && step.needPhoto && !imgUrl;
            const onClick = step.simpleCamera ? openSimpleCamera : openCamera;
            return (
              <Step key={step.label} onClick={jumpToStep(index)}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  {step.description && (
                    <Typography>{step.description}</Typography>
                  )}

                  {isPhotoNeeded && (
                    <section className="flex space-x-1 max-w-full overflow-x-auto">
                      {index === 4
                        ? damagePhotos.map((photo, index) => (
                            <img
                              key={index}
                              height={100}
                              src={photo}
                              loading="lazy"
                              alt=""
                            />
                          ))
                        : imgUrl && (
                            <img
                              height={100}
                              src={imgUrl}
                              alt=""
                              loading="lazy"
                            />
                          )}
                    </section>
                  )}

                  {isVideoNeeded && damageVideo && (
                    <video
                      width="100%"
                      src={damageVideo}
                      className="max-h-250px"
                      controls
                    />
                  )}

                  <div className="py-2 space-x-2">
                    {isPhotoNeeded && (
                      <Button variant="outlined" onClick={onClick}>
                        Open camera
                      </Button>
                    )}
                    {isVideoNeeded && (
                      <Button variant="outlined" onClick={openVideoCamera}>
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
        <CustomCamera
          onPhoto={onPhoto}
          onClose={closeCamera}
          maskImage={stepMask[activeStep] || ""}
        />
      )}
      <section className="hidden">
        <input
          ref={photoInput}
          onChange={onPhotoSelect}
          type="file"
          capture="environment"
          accept="image/*"
        />
        <input
          ref={videoInput}
          onChange={onVideoSelect}
          type="file"
          capture="environment"
          accept="video/*"
        />
      </section>
    </article>
  );
};

export default Inspection;
