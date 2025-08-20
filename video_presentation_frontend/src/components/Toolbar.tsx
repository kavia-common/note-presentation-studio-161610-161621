import React from "react";
import { useApp } from "../state/AppState";
import { Colors, Radii, Shadows } from "../styles/theme";

export const Toolbar: React.FC<{ onExport: () => void }> = ({ onExport }) => {
  const { render, setRenderSettings, selectedSlideId, project, updateSlide, updateStyle } = useApp();
  const slide = project.slides.find((s) => s.id === selectedSlideId);

  return (
    <div style={styles.bar}>
      <div style={styles.group}>
        <label style={styles.label}>FPS</label>
        <input
          type="number"
          min={10}
          max={60}
          value={render.fps}
          onChange={(e) => setRenderSettings({ fps: Number(e.target.value) || 30 })}
          style={styles.inputSm}
        />
        <label style={styles.label}>Size</label>
        <input
          type="number"
          min={640}
          value={render.width}
          onChange={(e) => setRenderSettings({ width: Number(e.target.value) || 1920 })}
          style={styles.inputMd}
        />
        <span style={styles.cross}>×</span>
        <input
          type="number"
          min={360}
          value={render.height}
          onChange={(e) => setRenderSettings({ height: Number(e.target.value) || 1080 })}
          style={styles.inputMd}
        />
      </div>

      <div style={styles.group}>
        <label style={styles.label}>Duration (s)</label>
        <input
          type="number"
          min={1}
          value={slide?.durationSec ?? 4}
          onChange={(e) => {
            if (slide) updateSlide(slide.id, { durationSec: Math.max(1, Number(e.target.value) || 1) });
          }}
          style={styles.inputSm}
          disabled={!slide}
        />
        <label style={styles.label}>BG</label>
        <input
          type="color"
          value={slide?.style.backgroundColor ?? "#FFFFFF"}
          onChange={(e) => slide && updateStyle(slide.id, { backgroundColor: e.target.value })}
          style={styles.color}
          disabled={!slide}
        />
        <label style={styles.label}>Text</label>
        <input
          type="color"
          value={slide?.style.textColor ?? "#1C1C1C"}
          onChange={(e) => slide && updateStyle(slide.id, { textColor: e.target.value })}
          style={styles.color}
          disabled={!slide}
        />
        <label style={styles.label}>Accent</label>
        <input
          type="color"
          value={slide?.style.accentColor ?? "#FFD700"}
          onChange={(e) => slide && updateStyle(slide.id, { accentColor: e.target.value })}
          style={styles.color}
          disabled={!slide}
        />
        <label style={styles.label}>Align</label>
        <select
          value={slide?.style.alignment ?? "left"}
          onChange={(e) => slide && updateStyle(slide.id, { alignment: e.target.value as any })}
          style={styles.select}
          disabled={!slide}
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>

      <div style={styles.actions}>
        <button style={styles.exportBtn} onClick={onExport}>
          Export Video
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  bar: {
    height: 64,
    background: "#fff",
    borderBottom: `1px solid ${Colors.border}`,
    display: "flex",
    alignItems: "center",
    padding: "0 12px",
    gap: 18,
  },
  group: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  label: { color: Colors.mutedText, fontSize: 12 },
  inputSm: {
    width: 64,
    border: `1px solid ${Colors.border}`,
    borderRadius: Radii.sm,
    padding: "6px 8px",
    fontSize: 13,
    boxShadow: Shadows.sm,
  },
  inputMd: {
    width: 92,
    border: `1px solid ${Colors.border}`,
    borderRadius: Radii.sm,
    padding: "6px 8px",
    fontSize: 13,
    boxShadow: Shadows.sm,
  },
  color: { width: 36, height: 30, border: "none", background: "transparent", cursor: "pointer" },
  select: {
    border: `1px solid ${Colors.border}`,
    borderRadius: Radii.sm,
    padding: "6px 8px",
    fontSize: 13,
    background: "#fff",
  },
  cross: { color: Colors.mutedText },
  actions: { marginLeft: "auto" },
  exportBtn: {
    background: Colors.accent,
    color: "#1C1C1C",
    border: "none",
    borderRadius: Radii.sm,
    padding: "10px 14px",
    cursor: "pointer",
    fontWeight: 600,
    boxShadow: Shadows.sm,
  },
};
