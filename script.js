// Task 3: Elements selected with querySelector
const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const noteCategory = document.querySelector('#note-category');
const notesList = document.querySelector('#notes-list');

// Notes stored as an array of objects
let notes = [];

// render() function that rebuilds the list using createElement and textContent
function render() {
    // Clear the list safely without innerHTML
    while (notesList.firstChild) {
        notesList.removeChild(notesList.firstChild);
    }

    notes.forEach(note => {
        const li = document.createElement('li');
        li.className = `note-card category-${note.category}`;
        
        // Meta info (Category and Date)
        const meta = document.createElement('div');
        meta.className = 'note-meta';
        
        const categorySpan = document.createElement('span');
        categorySpan.textContent = note.category.charAt(0).toUpperCase() + note.category.slice(1);
        
        const dateSpan = document.createElement('span');
        dateSpan.textContent = note.createdAt;
        
        meta.appendChild(categorySpan);
        meta.appendChild(dateSpan);
        
        // Note text
        const textP = document.createElement('p');
        textP.textContent = note.text; // Strictly using textContent to prevent XSS
        
        // Actions (Delete button)
        const actions = document.createElement('div');
        actions.className = 'note-actions';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.type = 'button';
        // Placeholder for Task 4 delete logic
        deleteBtn.addEventListener('click', () => {
            console.log('Delete functionality added in Task 4');
        });
        
        actions.appendChild(deleteBtn);
        
        // Assemble the card
        li.appendChild(meta);
        li.appendChild(textP);
        li.appendChild(actions);
        notesList.appendChild(li);
    });
}

// Add note logic
function addNote(e) {
    e.preventDefault();
    
    const text = noteInput.value;
    
    // Create note object with id, text, category, and createdAt
    const newNote = {
        id: Date.now().toString(),
        text: text,
        category: noteCategory.value,
        createdAt: new Date().toLocaleString()
    };
    
    // Add to array and re-render
    notes.unshift(newNote);
    render();
    
    // Clear the input after adding
    noteInput.value = '';
}

// Event Listener
noteForm.addEventListener('submit', addNote);