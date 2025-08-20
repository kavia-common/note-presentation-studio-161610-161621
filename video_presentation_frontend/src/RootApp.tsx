import React from "react";
import { Composition } from "remotion";
import { ProjectComposition } from "./remotion/ProjectComposition";
import { Project, RenderSettings } from "./types";
import { App } from "./App";

// PUBLIC_INTERFACE
export const RemotionRoot: React.FC = () => {
  // Provide a default empty project rendering for the Studio composition,
  // the actual Player in App uses live state, this is for "Render" flows.
  const emptyProject: Project = {
    id: "preview",
    title: "Project",
    notes: [],
    slides: [],
  };
  const render: RenderSettings = { fps: 30, width: 1920, height: 1080 };
  return (
    <>
      <Composition
        id="AppProject"
        component={ProjectComposition}
        durationInFrames={1}
        fps={render.fps}
        width={render.width}
        height={render.height}
        defaultProps={{ project: emptyProject, render }}
      />
      {/* Mount our app UI into Remotion Studio sidebar */}
      <App />
    </>
  );
};
