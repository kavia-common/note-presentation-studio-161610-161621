import React, { useMemo } from "react";
import { Player } from "@remotion/player";
import { Colors, Radii, Shadows } from "../styles/theme";
import { useApp } from "../state/AppState";
import { ProjectComposition } from "../remotion/ProjectComposition";

export const PreviewCanvas: React.FC = () => {
  const { project, render } = useApp();

  const totalDurationInFrames = useMemo(() => {
    return Math.max(
      1,
      Math.round(
        project.slides.reduce((acc, s) => acc + s.durationSec, 0) * render.fps
      )
    );
  }, [project.slides, render.fps]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>Video Preview</div>
      <div style={styles.playerWrap}>
        <Player
          component={ProjectComposition}
          durationInFrames={totalDurationInFrames}
          fps={render.fps}
          compositionWidth={render.width}
          compositionHeight={render.height}
          style={styles.player}
          inputProps={{ project, render }}
          controls
          autoPlay
          loop
        />
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { display: "flex", flexDirection: "column", gap: 10, padding: 12 },
  header: { color: Colors.secondary, fontWeight: 600, fontSize: 14 },
  playerWrap: {
    border: `1px solid ${Colors.border}`,
    borderRadius: Radii.md,
    background: "#fff",
    boxShadow: Shadows.md,
    padding: 12,
  },
  player: { width: "100%", borderRadius: Radii.sm, overflow: "hidden" },
};
