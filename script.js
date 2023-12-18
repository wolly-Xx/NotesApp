const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");

const COLORS = [
    "rgb(255, 144, 188)",
    "rgb(255, 192, 217)",
    "rgb(249, 249, 224)",
    "rgb(138, 205, 215)",
];

// console.log(notesContainer, addNoteButton)

function getNotes() {
    return JSON.parse(localStorage.getItem("mynotes") || "[]");

}

function saveNotes(notes) {
    localStorage.setItem("mynotes", JSON.stringify(notes));
}

function createNoteElement(id, content, color) {
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.value = content;
    element.placeholder = "Новая заметка!"
    element.style.backgroundColor = COLORS[color];

    element.addEventListener("keyup", () => {
        updateNote(id, element.value);
    });

    element.addEventListener("dblclick", () => {
        const doDelete = confirm("Удалить заметку?");

        if (doDelete) {
            deleteNote(id, element);
        }
    });

    return element;
}

getNotes().forEach(note => {
    const noteElement = createNoteElement(note.id, note.content, note.color);
    notesContainer.insertBefore(noteElement, addNoteButton);
});

function addNote() {
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: "",
        color: Math.floor(Math.random() * COLORS.length),
    };

    const noteElement = createNoteElement(noteObject.id, noteObject.content, noteObject.color);
    notesContainer.insertBefore(noteElement, addNoteButton);

    notes.push(noteObject);
    saveNotes(notes);
}

function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter(note => note.id == id)[0];

  targetNote.content = newContent; 
  saveNotes(notes);
}

function deleteNote(id, element) {
   const notes = getNotes().filter(note => note.id != id);
   saveNotes(notes);
   notesContainer.removeChild(element);
}

addNoteButton.addEventListener("click", () => addNote());
