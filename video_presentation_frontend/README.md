# Notes Presentation Studio (Remotion)

A modern, minimalistic, light-themed web app to create video presentations from notes using Remotion.

- Accent: #FFD700
- Primary: #2D89EF
- Secondary: #5A5A5A

## Features

- Import notes (JSON array or Markdown with headings)
- Edit note title and content
- Create slides from notes
- Customize slide style (background, text, accent colors; alignment; duration)
- Live video preview (Remotion Player)
- Export/download video (open Remotion Studio render UI)

## Layout

- Sidebar: notes list with add/import
- Main: left panel with note editor and slides list, right panel with player preview
- Toolbar: render settings and slide style controls, export button

## Getting started

Install dependencies:

```bash
npm i
```

Run in Remotion Studio:

```bash
npm run dev
```

Render from CLI (example):

```bash
# Build/bundle or use Studio UI to render
npx remotion render src/index.ts AppProject out/video.mp4
```

Notes:
- The in-app "Export Video" button opens the Remotion Studio window prepped for export.
- You can also render via CLI by supplying props or by adapting the composition to serialize state.

## Import format

- JSON: `[{"title":"...", "content":"..."}, ...]`
- Markdown / Text: Headings (`#`, `##`, or `###`) split notes; first line is title, remaining lines are content.

## License

The app uses Remotion. For licensing, see https://github.com/remotion-dev/remotion/blob/main/LICENSE.md