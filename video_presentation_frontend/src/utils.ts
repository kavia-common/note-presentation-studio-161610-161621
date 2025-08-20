/* eslint-disable no-undef */
import { Note, Project, Slide, SlideStyle } from "./types";

export const uuid = () =>
  "xxxxxxxx".replace(/[x]/g, () => ((Math.random() * 16) | 0).toString(16));

export const defaultStyle: SlideStyle = {
  backgroundColor: "#FFFFFF",
  textColor: "#1C1C1C",
  accentColor: "#FFD700",
  fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
  alignment: "left",
};

export const createSlideForNote = (noteId: string): Slide => ({
  id: uuid(),
  noteId,
  durationSec: 4,
  style: { ...defaultStyle },
});

export const createDefaultProject = (): Project => ({
  id: uuid(),
  title: "My Notes Presentation",
  notes: [
    { id: uuid(), title: "Welcome", content: "This is your first note." },
  ],
  slides: [],
});

export const parseImportedNotes = async (file: File): Promise<Note[]> => {
  const text = await file.text();
  // Supports JSON array of notes or Markdown (# Title\ncontent)
  try {
    const json = JSON.parse(text);
    if (Array.isArray(json)) {
      const notes: Note[] = json.map((n, i) => ({
        id: uuid(),
        title: String(n.title ?? `Note ${i + 1}`),
        content: String(n.content ?? ""),
      }));
      return notes;
    }
  } catch {
    // Not JSON, try markdown sections split by ### or ##
  }
  const parts = text.split(/^#{1,3}\s+/m).filter(Boolean);
  if (parts.length > 0) {
    // First block may include title and content
    const notes: Note[] = [];
    for (const block of parts) {
      const lines = block.split("\n");
      const title = lines.shift() || "Untitled";
      const content = lines.join("\n").trim();
      notes.push({
        id: uuid(),
        title: title.trim(),
        content,
      });
    }
    return notes;
  }
  // Fallback: single note
  return [{ id: uuid(), title: "Imported Note", content: text }];
};

const STORAGE_KEY = "note_presentation_project_v1";

export const saveProject = (project: Project) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
  } catch {
    // ignore
  }
};

export const loadProject = (): Project | null => {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (!v) return null;
    return JSON.parse(v) as Project;
  } catch {
    return null;
  }
};
