# QuickNotes

QuickNotes is a small notes app built with plain HTML, CSS and JavaScript. You can write short notes (up to 200 characters), file each one under Personal, Work or Study, search through them, and delete the ones you no longer need. Your notes are saved in the browser with localStorage, so they are still there after you refresh the page.

## Features

- Add a note with a category (Personal, Work or Study)
- Validation: empty notes and notes over 200 characters show an error message
- Delete any note with its own Delete button
- Live, case-insensitive search, with a "No notes match your search." message
- Note count message for zero, one and many notes
- Each category has its own coloured card border and label
- Notes saved to and loaded from localStorage
- Responsive layout: the form stacks vertically on screens 600px wide or narrower
- Clear all button that asks for confirmation before deleting every note

## How to run locally

1. Clone the repository:
   ```
   git clone https://github.com/origopeter009-collab/quicknotes-app.git
   ```
2. Open the `quicknotes-app` folder in VS Code.
3. Right-click `index.html` and choose **Open with Live Server**, or just open `index.html` in your browser.

No build step or dependencies are needed.

## What I learned

- How to build a page with semantic HTML (`header`, `main`, `section`, `footer`) and link every `label` to its input with `for` and `id`.
- How to keep the app's data in an array of objects and rebuild the page from it with a `render()` function, using `createElement` and `textContent` so user text is never inserted as HTML.
- How to save and load data with `localStorage`, using `JSON.stringify` and `JSON.parse`, so notes survive a refresh.
- How to lay out a form with Flexbox and use a `@media (max-width: 600px)` rule to make it work on small screens.
- How to make small, clear Git commits for each stage of a project.
