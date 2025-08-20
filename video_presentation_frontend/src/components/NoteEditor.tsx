import React from "react";
import { useApp } from "../state/AppState";
import { Colors, Radii, Shadows } from "../styles/theme";

export const NoteEditor: React.FC = () => {
  const { project, selectedNoteId, updateNote, addSlideForNote } = useApp();
  const note = project.notes.find((n) => n.id === selectedNoteId);
  if (!note) {
    return <div style={styles.placeholder}>Select a note to edit.</div>;
  }

  return (
    <div style={styles.container}>
      <input
        value={note.title}
        onChange={(e) => updateNote(note.id, { title: e.target.value })}
        placeholder="Note title"
        style={styles.title}
      />
      <textarea
        value={note.content}
        onChange={(e) => updateNote(note.id, { content: e.target.value })}
        placeholder="Write your note content..."
        style={styles.textarea}
      />
      <div style={styles.actions}>
        <button style={styles.primaryBtn} onClick={() => addSlideForNote(note.id)}>
          Add Slide from this Note
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  placeholder: {
    color: Colors.mutedText,
    padding: 12,
  },
  title: {
    border: `1px solid ${Colors.border}`,
    borderRadius: Radii.sm,
    padding: "10px 12px",
    fontSize: 16,
    boxShadow: Shadows.sm,
  },
  textarea: {
    minHeight: 140,
    border: `1px solid ${Colors.border}`,
    borderRadius: Radii.sm,
    padding: 12,
    fontSize: 14,
    resize: "vertical",
    fontFamily: "inherit",
    boxShadow: Shadows.sm,
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  primaryBtn: {
    background: Colors.primary,
    color: "#fff",
    border: "none",
    borderRadius: Radii.sm,
    padding: "10px 14px",
    cursor: "pointer",
  },
};
