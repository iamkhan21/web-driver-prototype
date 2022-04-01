import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoIcon from "@mui/icons-material/Info";

export enum ViewUrls {
  HOME = "/",
  ABOUT = "/about",
}

export enum ViewNames {
  HOME = "Geolocation tracking",
  ABOUT = "App info",
}

export const ViewRelations = {
  [ViewUrls.HOME]: { name: ViewNames.HOME, icon: <LocationOnIcon /> },
  [ViewUrls.ABOUT]: { name: ViewNames.ABOUT, icon: <InfoIcon /> },
};
