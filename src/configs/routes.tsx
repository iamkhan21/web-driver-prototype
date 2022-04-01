import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoIcon from "@mui/icons-material/Info";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";

export enum ViewUrls {
  HOME = "/",
  SCANNER = "/scanner",
  ABOUT = "/about",
}

export enum ViewNames {
  HOME = "Geolocation tracking",
  SCANNER = "QR code scanner",
  ABOUT = "App info",
}

export const ViewRelations = {
  [ViewUrls.HOME]: { name: ViewNames.HOME, icon: <LocationOnIcon /> },
  [ViewUrls.SCANNER]: { name: ViewNames.SCANNER, icon: <QrCodeScannerIcon /> },
  [ViewUrls.ABOUT]: { name: ViewNames.ABOUT, icon: <InfoIcon /> },
};
