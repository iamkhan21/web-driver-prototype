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
