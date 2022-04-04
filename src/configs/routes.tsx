import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoIcon from "@mui/icons-material/Info";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

export enum ViewUrls {
  HOME = "/",
  SCANNER = "/scanner",
  INSPECTION = "/inspection",
  ABOUT = "/about",
  DOCUMENTS = "/documents",
}

export enum ViewNames {
  HOME = "Geolocation tracking",
  SCANNER = "QR code scanner",
  INSPECTION = "Car inspection",
  ABOUT = "App info",
  DOCUMENTS = "Documents",
}

export const ViewRelations = {
  [ViewUrls.HOME]: { name: ViewNames.HOME, icon: <LocationOnIcon /> },
  [ViewUrls.INSPECTION]: {
    name: ViewNames.INSPECTION,
    icon: <CameraAltIcon />,
  },
  [ViewUrls.SCANNER]: { name: ViewNames.SCANNER, icon: <QrCodeScannerIcon /> },
  [ViewUrls.DOCUMENTS]: {
    name: ViewNames.DOCUMENTS,
    icon: <ReceiptLongIcon />,
  },
  [ViewUrls.ABOUT]: { name: ViewNames.ABOUT, icon: <InfoIcon /> },
};
