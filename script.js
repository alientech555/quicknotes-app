// Task 4: Added errorMessage and noteCount selections
const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const noteCategory = document.querySelector('#note-category');
const errorMessage = document.querySelector('#error-message');
const noteCount = document.querySelector('#note-count');
const notesList = document.querySelector('#notes-list');

let notes = [];

// Correct count message for zero, one and many notes
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

    notes.forEach(note => {
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
        // Task 4: Make each Delete button remove its own note
        deleteBtn.addEventListener('click', () => deleteNote(note.id));
        
        actions.appendChild(deleteBtn);
        
        li.appendChild(meta);
        li.appendChild(textP);
        li.appendChild(actions);
        notesList.appendChild(li);
    });
    
    // Update count every time the list renders
    updateCount();
}

// Task 4: Delete feature
function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    render();
}

function addNote(e) {
    e.preventDefault();
    const text = noteInput.value;
    const trimmedText = text.trim();
    
    // Task 4: Validation for empty or spaces-only
    if (trimmedText === '') {
        errorMessage.textContent = 'Please type a note first.';
        return;
    }
    
    // Task 4: Validation for over 200 characters
    if (text.length > 200) {
        errorMessage.textContent = 'Notes must be 200 characters or fewer.';
        return;
    }
    
    // Clear the error when a valid note is added
    errorMessage.textContent = ''; 
    
    const newNote = {
        id: Date.now().toString(),
        text: text,
        category: noteCategory.value,
        createdAt: new Date().toLocaleString()
    };
    
    notes.unshift(newNote);
    render();
    noteInput.value = '';
}

noteForm.addEventListener('submit', addNote);