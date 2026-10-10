// Select elements
const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const noteCount = document.querySelector("#note-count");
const notesList = document.querySelector("#notes-list");

const MAX_LENGTH = 200;
const STORAGE_KEY = "quicknotes-notes";

// Notes are stored as an array of objects: { id, text, category, createdAt }
let notes = loadNotes();

function loadNotes() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    return [];
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function showError(message) {
  errorMessage.textContent = message;
}

// Correct message for zero, one and many notes
function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

// Notes whose text contains every search word (not case-sensitive)
function getVisibleNotes() {
  const words = searchInput.value.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    return notes;
  }
  return notes.filter((note) => {
    const text = note.text.toLowerCase();
    return words.every((word) => text.includes(word));
  });
}

// Rebuild the list from the notes array (textContent only, never innerHTML)
function render() {
  notesList.textContent = "";
  const visibleNotes = getVisibleNotes();

  if (notes.length > 0 && visibleNotes.length === 0) {
    const empty = document.createElement("li");
    empty.classList.add("empty-message");
    empty.textContent = "No notes match your search.";
    notesList.appendChild(empty);
  }

  visibleNotes.forEach((note) => {
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
    deleteBtn.addEventListener("click", () => deleteNote(note.id));

    footer.append(meta, deleteBtn);
    li.append(text, footer);
    notesList.appendChild(li);
  });

  updateCount();
}

function addNote(text, category) {
  const note = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(),
  };
  notes.push(note);
  saveNotes();
  render();
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = noteInput.value.trim();

  if (text === "") {
    showError("Please type a note first.");
    return;
  }

  if (text.length > MAX_LENGTH) {
    showError("Notes must be 200 characters or fewer.");
    return;
  }

  showError("");
  addNote(text, categorySelect.value);
  noteInput.value = "";
  noteInput.focus();
});

searchInput.addEventListener("input", render);

render();
