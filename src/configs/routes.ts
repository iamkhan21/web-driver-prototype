export enum ViewUrls {
  HOME = "/",
  ABOUT = "/about",
}

export enum ViewNames {
  HOME = "Geolocation tracking",
  ABOUT = "App info",
}

export const ViewRelations = {
  [ViewUrls.HOME]: ViewNames.HOME,
  [ViewUrls.ABOUT]: ViewNames.ABOUT,
};
