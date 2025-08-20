/* eslint-disable no-undef */
import { Project, RenderSettings } from "./types";

// PUBLIC_INTERFACE
export async function triggerStudioRender(_project: Project, _render: RenderSettings) {
  // In Remotion Studio, opening the composition URL triggers UI where users can export.
  // Since this app runs inside Remotion Studio, we programmatically open with search params.
  const search = new URLSearchParams({
    comp: "AppProject",
    // Remotion Studio can accept inputs via ?props= base64 - here we keep simple by relying on runtime state.
  }).toString();

  const url = `${location.origin}${location.pathname}?${search}`;
  window.open(url, "_blank", "noopener");
}
