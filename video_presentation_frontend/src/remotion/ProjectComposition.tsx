import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { SlideComposition } from "./SlideComposition";
import { Project, RenderSettings, Slide } from "../types";

type Props = {
  project: Project;
  render: RenderSettings;
};

// PUBLIC_INTERFACE
export const ProjectComposition: React.FC<Props> = ({ project, render }) => {
  let from = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: "#fff" }}>
      {project.slides.map((slide: Slide) => {
        const durationInFrames = Math.max(1, Math.round(slide.durationSec * render.fps));
        const comp = (
          <Sequence key={slide.id} from={from} durationInFrames={durationInFrames}>
            <SlideComposition slide={slide} project={project} />
          </Sequence>
        );
        from += durationInFrames;
        return comp;
      })}
      {project.slides.length === 0 && (
        <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#888" }}>
          No slides yet. Add a slide from the note editor.
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
