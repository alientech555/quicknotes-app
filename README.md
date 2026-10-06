# QuickNotes

QuickNotes is a lightweight, responsive note-taking web application designed to help users quickly capture, categorize, and organize their daily thoughts and tasks. Built entirely with vanilla HTML, CSS, and JavaScript, it provides a seamless, client-side interface that requires no backend server, utilizing the browser's local storage to ensure data persistence across sessions.

## Features

- **Add & Categorize Notes**: Create notes and assign them to Personal, Work, or Study categories.
- **Visual Categorization**: Notes are styled with distinct left-border colors based on their assigned category.
- **Real-time Search**: Instantly filter and find notes as you type in the search bar (case-insensitive).
- **Data Persistence**: Notes are automatically saved to `localStorage`, ensuring they survive page refreshes and browser restarts.
- **Strict Validation**: Prevents empty notes and enforces a 200-character limit with clear, inline error messaging.
- **Accurate Counting**: Dynamically updates the note count with grammatically correct messages for zero, one, or multiple notes.
- **Bulk Actions**: Includes a "Clear all" button with a confirmation prompt to wipe the board clean.
- **Responsive Design**: Fully responsive layout that adapts to mobile screens using CSS Flexbox and media queries.

## How to Run Locally

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/your-username/quicknotes-app.git
2. Navigate into the project directory
    ```bash
    cd quicknotes-app
3. Open the index.html file in any modern web browser (e.g., Chrome, Firefox, Edge).
(Note: No build steps or server installations are required since this is a purely client-side application).

## What I Learned

1. Semantic HTML & Accessibility: I learned the critical importance of using semantic tags (<main>, <section>, <header>) and properly linking <label> elements to inputs via the for and id attributes to improve screen reader compatibility and overall document structure.
2. Secure DOM Manipulation: By strictly using createElement and textContent instead of innerHTML for rendering user-generated content, I gained a practical understanding of how to structure the DOM safely and prevent Cross-Site Scripting (XSS) vulnerabilities.
3. Client-Side Data Persistence: I learned how to persist data across browser sessions by serializing JavaScript objects into JSON strings using JSON.stringify() for localStorage, and safely parsing them back into usable arrays with JSON.parse() upon page load.
4. Responsive CSS Layouts: I improved my CSS skills by implementing Flexbox for complex form layouts and utilizing @media queries to ensure the application remains fully usable and visually appealing on screens narrower than 600px.