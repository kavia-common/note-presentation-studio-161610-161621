import React from "react";
import { useApp } from "../state/AppState";
import { Colors, Radii } from "../styles/theme";

export const SlidesPanel: React.FC = () => {
  const { project, selectedNoteId, selectedSlideId, selectSlide } = useApp();
  const slides = project.slides.filter((s) => s.noteId === selectedNoteId);
  if (!selectedNoteId) return null;

  return (
    <div style={styles.container}>
      <div style={styles.header}>Slides for selected note</div>
      <div style={styles.rows}>
        {slides.map((s, idx) => (
          <div
            key={s.id}
            onClick={() => selectSlide(s.id)}
            style={{ ...styles.row, ...(selectedSlideId === s.id ? styles.rowActive : {}) }}
          >
            <div style={styles.thumb} />
            <div style={styles.meta}>
              <div style={styles.title}>Slide {idx + 1}</div>
              <div style={styles.sub}>{s.durationSec}s</div>
            </div>
          </div>
        ))}
        {slides.length === 0 && <div style={styles.empty}>No slides yet. Use "Add Slide from this Note".</div>}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { borderTop: `1px solid ${Colors.border}`, paddingTop: 8 },
  header: { color: Colors.mutedText, fontSize: 12, margin: "8px 0" },
  rows: { display: "flex", flexDirection: "column", gap: 8 },
  row: {
    display: "flex",
    gap: 10,
    border: `1px solid transparent`,
    borderRadius: Radii.sm,
    padding: 8,
    alignItems: "center",
    cursor: "pointer",
  },
  rowActive: { border: `1px solid ${Colors.primary}`, background: "#F0F6FF" },
  thumb: {
    width: 48,
    height: 32,
    borderRadius: 4,
    background: "#E5E7EB",
    border: `1px solid ${Colors.border}`,
  },
  meta: { display: "flex", flexDirection: "column" },
  title: { color: Colors.text, fontSize: 13 },
  sub: { color: Colors.mutedText, fontSize: 12 },
  empty: { color: Colors.mutedText, fontSize: 12, padding: 8 },
};
