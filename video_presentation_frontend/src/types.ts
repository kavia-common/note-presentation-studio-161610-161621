export type Note = {
  id: string;
  title: string;
  content: string;
};

export type SlideStyle = {
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  fontFamily: string;
  alignment: "left" | "center" | "right";
};

export type Slide = {
  id: string;
  noteId: string;
  durationSec: number;
  style: SlideStyle;
};

export type Project = {
  id: string;
  title: string;
  notes: Note[];
  slides: Slide[];
};

export type RenderSettings = {
  fps: number;
  width: number;
  height: number;
};

export type AppState = {
  project: Project;
  selectedNoteId: string | null;
  selectedSlideId: string | null;
  render: RenderSettings;
};

export type AppActions = {
  importNotes: (notes: Note[]) => void;
  addNote: () => void;
  updateNote: (id: string, patch: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  selectNote: (id: string | null) => void;

  addSlideForNote: (noteId: string) => void;
  updateSlide: (id: string, patch: Partial<Slide>) => void;
  selectSlide: (id: string | null) => void;

  updateStyle: (slideId: string, patch: Partial<SlideStyle>) => void;

  setRenderSettings: (patch: Partial<RenderSettings>) => void;
};

export type AppContextType = AppState & AppActions;
