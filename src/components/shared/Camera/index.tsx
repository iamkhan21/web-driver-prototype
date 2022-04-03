import React, { FC, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import "./style.pcss";

type Props = {
  maskImage?: string;
  onPhoto: (photoUrl: string) => void;
  onClose: () => void;
};

const Camera: FC<Props> = ({ onPhoto, maskImage }) => {
  const video = useRef<HTMLVideoElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

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

  const takePicture = () => {
    if (canvas.current && video.current) {
      canvas.current.width = video.current.videoWidth;
      canvas.current.height = video.current.videoHeight;
      canvas.current.getContext("2d")?.drawImage(video.current, 0, 0);

      onPhoto(canvas.current.toDataURL("image/webp"));
    }
  };

  return (
    <section className="fixed inset-0 z-1200 flex items-center justify-center overflow-y-hidden bg-black">
      <video className="w-full" ref={video} autoPlay />

      {maskImage && (
        <section className="absolute inset-0 p-2 flex items-center justify-center">
          <picture className="img">
            <img src={maskImage} alt="" />
          </picture>
        </section>
      )}

      <Button
        onClick={takePicture}
        className="!absolute bottom-5 mx-auto w-10rem"
        variant="contained"
      >
        Take a picture
      </Button>
      <canvas ref={canvas} className="hidden" />
    </section>
  );
};

export default Camera;