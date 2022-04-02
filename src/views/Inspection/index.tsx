/*
import React, { useEffect, useRef } from "react";
import Button from "@mui/material/Button";

const Inspection = () => {
  const video = useRef<HTMLVideoElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const image = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (
      "mediaDevices" in navigator &&
      "getUserMedia" in navigator.mediaDevices
    ) {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            facingMode: {
              exact: "environment",
            },
          },
        })
        .then((stream) => {
          if (video.current) {
            video.current.srcObject = stream;
          }
        });
    }
  }, []);

  function doPhoto() {
    if (image.current && canvas.current && video.current) {
      canvas.current.width = video.current.videoWidth;
      canvas.current.height = video.current.videoHeight;
      canvas.current.getContext("2d")?.drawImage(video.current, 0, 0);
      image.current.src = canvas.current.toDataURL("image/webp");
    }
  }

  return (
    <article className="content">
      <section className="flex items-center justify-between">
        <h3>Car Inspection</h3>
        <Button variant="outlined">Start</Button>
      </section>

      <section className="relative mt-4">
        <video width="100%" ref={video} autoPlay />

        <section className="absolute inset-0 p-2 flex items-center justify-center">
          <img width="100%" src="/images/car-side.svg" alt="" />
        </section>

        <Button
          onClick={doPhoto}
          className="!absolute bottom-5 left-3"
          variant="contained"
        >
          Screen
        </Button>
      </section>

      <section className="">
        <img ref={image} height={150} width={100} alt="" />
      </section>

      <canvas ref={canvas} className="hidden" />
    </article>
  );
};

export default Inspection;
*/
import React from "react";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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
    label: "Take a picture of the car from the left side",
    needPhoto: true,
  },
  {
    label: "Take a picture of the car from behind",
    needPhoto: true,
  },
  {
    label: "Take a picture of the car from the right side",
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

const Inspection = () => {
  // const photos = useRef<string[]>([]);
  const [photos, setPhotos] = React.useState<string[]>([]);
  const [activeStep, setActiveStep] = React.useState(0);

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
            const cantMoveOn =
              isPhotoNeeded && step.needPhoto && !photos[index];

            return (
              <Step key={step.label} onClick={jumpToStep(index)}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  {step.description && (
                    <Typography>{step.description}</Typography>
                  )}
                  <div className="py-2 space-x-2">
                    {isPhotoNeeded && (
                      <Button
                        variant="outlined"
                        onClick={() => {
                          photos[index] = "12" + index;
                          setPhotos([...photos]);
                        }}
                      >
                        Do photo
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
    </article>
  );
};

export default Inspection;
