import { ViewRelations, ViewUrls } from "@/configs/routes";
import { useLocation } from "react-router-dom";

export function useViewName(): string {
  const { pathname } = useLocation();

  return ViewRelations[pathname as ViewUrls]?.name || "Not Found";
}
