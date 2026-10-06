// Task 5: Added searchInput and clearAllBtn selections
const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const noteCategory = document.querySelector('#note-category');
const errorMessage = document.querySelector('#error-message');
const searchInput = document.querySelector('#search-input');
const noteCount = document.querySelector('#note-count');
const notesList = document.querySelector('#notes-list');
const clearAllBtn = document.querySelector('#clear-all');

let notes = [];

// Task 5: Load notes from localStorage with JSON.parse
function loadNotes() {
    const storedNotes = localStorage.getItem('quicknotes_data');
    if (storedNotes) {
        notes = JSON.parse(storedNotes);
    }
}

// Task 5: Save notes to localStorage with JSON.stringify
function saveNotes() {
    localStorage.setItem('quicknotes_data', JSON.stringify(notes));
}

function updateCount() {
    const count = notes.length;
    if (count === 0) {
        noteCount.textContent = 'You have no notes yet.';
    } else if (count === 1) {
        noteCount.textContent = 'You have 1 note.';
    } else {
        noteCount.textContent = `You have ${count} notes.`;
    }
}

function render() {
    while (notesList.firstChild) {
        notesList.removeChild(notesList.firstChild);
    }

    // Task 5: Search feature (not case-sensitive)
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    const filteredNotes = notes.filter(note => 
        note.text.toLowerCase().includes(searchTerm)
    );

    // Task 5: Message if search finds nothing
    if (filteredNotes.length === 0 && searchTerm !== '') {
        const li = document.createElement('li');
        li.textContent = 'No notes match your search.';
        notesList.appendChild(li);
    } else {
        filteredNotes.forEach(note => {
            const li = document.createElement('li');
            li.className = `note-card category-${note.category}`;
            
            const meta = document.createElement('div');
            meta.className = 'note-meta';
            
            const categorySpan = document.createElement('span');
            categorySpan.textContent = note.category.charAt(0).toUpperCase() + note.category.slice(1);
            
            const dateSpan = document.createElement('span');
            dateSpan.textContent = note.createdAt;
            
            meta.appendChild(categorySpan);
            meta.appendChild(dateSpan);
            
            const textP = document.createElement('p');
            textP.textContent = note.text; 
            
            const actions = document.createElement('div');
            actions.className = 'note-actions';
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.type = 'button';
            deleteBtn.addEventListener('click', () => deleteNote(note.id));
            
            actions.appendChild(deleteBtn);
            
            li.appendChild(meta);
            li.appendChild(textP);
            li.appendChild(actions);
            notesList.appendChild(li);
        });
    }
    
    updateCount();
}

function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    saveNotes(); // Save after deletion
    render();
}

// Bonus: Clear all with confirm()
function clearAllNotes() {
    if (confirm("Delete all notes?")) {
        notes = [];
        saveNotes();
        render();
    }
}

function addNote(e) {
    e.preventDefault();
    const text = noteInput.value;
    const trimmedText = text.trim();
    
    if (trimmedText === '') {
        errorMessage.textContent = 'Please type a note first.';
        return;
    }
    if (text.length > 200) {
        errorMessage.textContent = 'Notes must be 200 characters or fewer.';
        return;
    }
    
    errorMessage.textContent = ''; 
    
    const newNote = {
        id: Date.now().toString(),
        text: text,
        category: noteCategory.value,
        createdAt: new Date().toLocaleString()
    };
    
    notes.unshift(newNote);
    saveNotes(); // Save after adding
    render();
    noteInput.value = '';
}

// Event Listeners
noteForm.addEventListener('submit', addNote);
searchInput.addEventListener('input', render); // Re-render on search input
clearAllBtn.addEventListener('click', clearAllNotes);

// Initialize App: Load data and render on page open
loadNotes();
render();