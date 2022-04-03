import React, { FC, useEffect, useRef } from "react";
import QrScanner from "qr-scanner";

type Props = {
  onScan: (scannedInfo: string) => void;
};

const QRScanner: FC<Props> = ({ onScan }) => {
  const alive = useRef(true);
  const qrScanner = useRef<QrScanner>();
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    alive.current = true;

    (async () => {
      const QrScanner = (await import("qr-scanner")).default;

      if (!alive.current) return;
      if (video.current) {
        qrScanner.current = new QrScanner(
          video.current,
          (result) => onScan(result.data),
          {
            highlightScanRegion: true,
            maxScansPerSecond: 0.5,
          }
        );

        qrScanner.current.start();
      }
    })();

    return () => {
      alive.current = false;
      qrScanner.current?.destroy();
    };
  }, []);

  return (
    <section className="absolute inset-0 bg-black">
      <video width="100%" ref={video} />
    </section>
  );
};

export default QRScanner;
