import React, { useCallback } from "react";
import { AppProvider, useApp } from "./state/AppState";
import { Sidebar } from "./components/Sidebar";
import { Toolbar } from "./components/Toolbar";
import { NoteEditor } from "./components/NoteEditor";
import { SlidesPanel } from "./components/SlidesPanel";
import { PreviewCanvas } from "./components/PreviewCanvas";
import { Colors } from "./styles/theme";
import { triggerStudioRender } from "./exporter";

const AppShell: React.FC = () => {
  const { project, render } = useApp();

  const onExport = useCallback(() => {
    // Open Remotion Studio rendering UI for exporting
    triggerStudioRender(project, render);
  }, [project, render]);

  return (
    <div style={styles.app}>
      <Toolbar onExport={onExport} />
      <div style={styles.content}>
        <Sidebar />
        <main style={styles.main}>
          <div style={styles.editors}>
            <NoteEditor />
            <div style={{ height: 1, background: Colors.border, margin: "12px 0" }} />
            <SlidesPanel />
          </div>
          <div style={styles.preview}>
            <PreviewCanvas />
          </div>
        </main>
      </div>
    </div>
  );
};

export const App: React.FC = () => (
  <AppProvider>
    <AppShell />
  </AppProvider>
);

const styles: Record<string, React.CSSProperties> = {
  app: { display: "flex", flexDirection: "column", height: "100vh", background: "#FAFBFD" },
  content: { display: "flex", flex: 1, minHeight: 0 },
  main: { display: "grid", gridTemplateColumns: "320px 1fr", flex: 1, minHeight: 0 },
  editors: { borderRight: `1px solid ${Colors.border}`, padding: 12, overflowY: "auto" },
  preview: { display: "flex", flexDirection: "column", minWidth: 0 },
};
