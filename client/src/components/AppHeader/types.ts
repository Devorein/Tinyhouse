import { Viewer } from "../../types";

export interface AppHeaderProps {
  viewer: Viewer,
  setViewer: (viewer: Viewer) => void
}
