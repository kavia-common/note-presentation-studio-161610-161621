import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Project, Slide } from "../types";

type Props = {
  slide: Slide;
  project: Project;
};

// PUBLIC_INTERFACE
export const SlideComposition: React.FC<Props> = ({ slide, project }) => {
  const note = useMemo(() => project.notes.find((n) => n.id === slide.noteId), [project.notes, slide.noteId]);
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Simple entrance animation
  const appear = spring({ frame, fps, config: { damping: 200 } });
  const y = interpolate(appear, [0, 1], [30, 0]);

  const align: Record<string, string> = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: slide.style.backgroundColor,
        padding: width * 0.08,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 16,
      }}
    >
      <div
        style={{
          color: slide.style.accentColor,
          fontFamily: slide.style.fontFamily,
          fontSize: Math.max(28, Math.round(width * 0.028)),
          letterSpacing: 0.5,
          marginBottom: 8,
          transform: `translateY(${y}px)`,
          opacity: appear,
          textAlign: slide.style.alignment as any,
        }}
      >
        {note?.title ?? "Untitled"}
      </div>
      <div
        style={{
          color: slide.style.textColor,
          fontFamily: slide.style.fontFamily,
          fontSize: Math.max(20, Math.round(width * 0.022)),
          lineHeight: 1.45,
          whiteSpace: "pre-wrap",
          transform: `translateY(${y}px)`,
          opacity: appear,
          alignSelf: align[slide.style.alignment],
          maxWidth: Math.round(width * 0.84),
        }}
      >
        {note?.content ?? ""}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: Math.round(height * 0.06),
          right: Math.round(width * 0.06),
          color: slide.style.accentColor,
          fontSize: 14,
          opacity: 0.7,
        }}
      >
        {project.title}
      </div>
    </AbsoluteFill>
  );
};
