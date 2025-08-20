/* eslint-disable no-undef */
import React, { useRef } from "react";
import { useApp } from "../state/AppState";
import { Colors, Radii, Shadows } from "../styles/theme";
import { parseImportedNotes } from "../utils";

export const Sidebar: React.FC = () => {
  const { project, selectedNoteId, selectNote, addNote, deleteNote, importNotes } = useApp();
  const fileRef = useRef<HTMLInputElement>(null);

  const onImportClick = () => fileRef.current?.click();

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const notes = await parseImportedNotes(file);
    importNotes(notes);
    e.currentTarget.value = "";
  };

  return (
    <aside style={styles.aside}>
      <div style={styles.header}>
        <div style={styles.appTitle}>Notes</div>
        <div style={styles.headerActions}>
          <button style={styles.iconBtn} onClick={addNote} title="Add Note">＋</button>
          <button style={styles.iconBtn} onClick={onImportClick} title="Import Notes">⇪</button>
          <input ref={fileRef} onChange={onFileChange} type="file" accept=".json,.md,.txt" hidden />
        </div>
      </div>

      <div style={styles.list}>
        {project.notes.map((n) => (
          <div
            key={n.id}
            style={{
              ...styles.listItem,
              ...(selectedNoteId === n.id ? styles.listItemActive : {}),
            }}
            onClick={() => selectNote(n.id)}
          >
            <div style={styles.noteTitle}>{n.title || "Untitled"}</div>
            <button
              style={styles.deleteBtn}
              onClick={(e) => {
                e.stopPropagation();
                deleteNote(n.id);
              }}
              title="Delete note"
            >
              ×
            </button>
          </div>
        ))}
        {project.notes.length === 0 && <div style={styles.empty}>No notes yet. Click + or import ⇪</div>}
      </div>
    </aside>
  );
};

const styles: Record<string, React.CSSProperties> = {
  aside: {
    width: 320,
    background: "#FFFFFF",
    borderRight: `1px solid ${Colors.border}`,
    display: "flex",
    flexDirection: "column",
  },
  header: {
    padding: "12px 12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: `1px solid ${Colors.border}`,
  },
  appTitle: {
    fontWeight: 600,
    color: Colors.secondary,
    letterSpacing: 0.3,
  },
  headerActions: { display: "flex", gap: 8 },
  iconBtn: {
    border: `1px solid ${Colors.border}`,
    background: "#fff",
    borderRadius: Radii.sm,
    padding: "6px 10px",
    cursor: "pointer",
    boxShadow: Shadows.sm,
  },
  list: { flex: 1, overflowY: "auto", padding: 8 },
  listItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 12px",
    borderRadius: Radii.sm,
    cursor: "pointer",
    border: `1px solid transparent`,
    marginBottom: 8,
  },
  listItemActive: {
    border: `1px solid ${Colors.primary}`,
    background: "#F0F6FF",
  },
  noteTitle: { color: Colors.text, fontSize: 14, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingRight: 12, flex: 1 },
  deleteBtn: {
    border: "none",
    background: "transparent",
    color: Colors.mutedText,
    cursor: "pointer",
    fontSize: 16,
  },
  empty: {
    color: Colors.mutedText,
    fontSize: 13,
    padding: 12,
    textAlign: "center",
  },
};
