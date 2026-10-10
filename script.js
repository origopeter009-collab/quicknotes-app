// Select elements
const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const noteCount = document.querySelector("#note-count");
const notesList = document.querySelector("#notes-list");

// Notes are stored as an array of objects: { id, text, category, createdAt }
let notes = [];

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Rebuild the list from the notes array (textContent only, never innerHTML)
function render() {
  notesList.textContent = "";

  notes.forEach((note) => {
    const li = document.createElement("li");
    li.classList.add("note", `category-${note.category}`);

    const text = document.createElement("p");
    text.classList.add("note-text");
    text.textContent = note.text;

    const footer = document.createElement("div");
    footer.classList.add("note-footer");

    const meta = document.createElement("div");
    meta.classList.add("note-meta");

    const label = document.createElement("span");
    label.classList.add("category-label");
    label.textContent = capitalize(note.category);

    const date = document.createElement("span");
    date.textContent = note.createdAt;

    meta.append(label, date);

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.classList.add("danger");
    deleteBtn.textContent = "Delete";

    footer.append(meta, deleteBtn);
    li.append(text, footer);
    notesList.appendChild(li);
  });
}

function addNote(text, category) {
  const note = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(),
  };
  notes.push(note);
  render();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addNote(noteInput.value.trim(), categorySelect.value);
  noteInput.value = "";
  noteInput.focus();
});

render();
