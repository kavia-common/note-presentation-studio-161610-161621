import React, { createContext, useContext, useMemo, useState } from "react";
import { AppActions, AppContextType, AppState, Note, RenderSettings } from "../types";
import { createDefaultProject, createSlideForNote, loadProject, saveProject, uuid } from "../utils";

const AppContext = createContext<AppContextType | null>(null);

// PUBLIC_INTERFACE
export const useApp = (): AppContextType => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used within AppProvider");
  }
  return ctx;
};

// PUBLIC_INTERFACE
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialProject = loadProject() ?? createDefaultProject();
  const [state, setState] = useState<AppState>({
    project: initialProject,
    selectedNoteId: initialProject.notes[0]?.id ?? null,
    selectedSlideId: null,
    render: { fps: 30, width: 1920, height: 1080 } as RenderSettings,
  });

  const actions: AppActions = useMemo(() => ({
    importNotes: (notes: Note[]) => {
      setState((s) => {
        const project = { ...s.project, notes: [...s.project.notes, ...notes] };
        saveProject(project);
        return { ...s, project, selectedNoteId: notes[0]?.id ?? s.selectedNoteId };
      });
    },
    addNote: () => {
      setState((s) => {
        const newNote: Note = { id: uuid(), title: "New Note", content: "" };
        const project = { ...s.project, notes: [newNote, ...s.project.notes] };
        saveProject(project);
        return { ...s, project, selectedNoteId: newNote.id };
      });
    },
    updateNote: (id, patch) => {
      setState((s) => {
        const notes = s.project.notes.map((n) => (n.id === id ? { ...n, ...patch } : n));
        const project = { ...s.project, notes };
        saveProject(project);
        return { ...s, project };
      });
    },
    deleteNote: (id) => {
      setState((s) => {
        const notes = s.project.notes.filter((n) => n.id !== id);
        const slides = s.project.slides.filter((sl) => sl.noteId !== id);
        const project = { ...s.project, notes, slides };
        saveProject(project);
        const selectedNoteId = s.selectedNoteId === id ? notes[0]?.id ?? null : s.selectedNoteId;
        return { ...s, project, selectedNoteId };
      });
    },
    selectNote: (id) => setState((s) => ({ ...s, selectedNoteId: id })),
    addSlideForNote: (noteId: string) => {
      setState((s) => {
        const slide = createSlideForNote(noteId);
        const project = { ...s.project, slides: [...s.project.slides, slide] };
        saveProject(project);
        return { ...s, project, selectedSlideId: slide.id };
      });
    },
    updateSlide: (id, patch) => {
      setState((s) => {
        const slides = s.project.slides.map((sl) => (sl.id === id ? { ...sl, ...patch } : sl));
        const project = { ...s.project, slides };
        saveProject(project);
        return { ...s, project };
      });
    },
    selectSlide: (id) => setState((s) => ({ ...s, selectedSlideId: id })),
    updateStyle: (slideId, patch) => {
      setState((s) => {
        const slides = s.project.slides.map((sl) =>
          sl.id === slideId ? { ...sl, style: { ...sl.style, ...patch } } : sl
        );
        const project = { ...s.project, slides };
        saveProject(project);
        return { ...s, project };
      });
    },
    setRenderSettings: (patch) =>
      setState((s) => ({ ...s, render: { ...s.render, ...patch } })),
  }), []);

  const value = { ...state, ...actions };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
