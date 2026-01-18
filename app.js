document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const noteTitleInput = document.getElementById('note-title');
    const noteBodyInput = document.getElementById('note-body');
    const addBtn = document.getElementById('add-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const notesGrid = document.getElementById('notes-grid');
    const emptyState = document.getElementById('empty-state');
    const toast = document.getElementById('toast');

    // --- State Management ---
    let notes = JSON.parse(localStorage.getItem('lumina-notes')) || [];
    let editingId = null;

    // --- Initialization ---
    renderNotes();

    // --- Event Listeners ---
    addBtn.addEventListener('click', handleNoteSubmit);
    cancelBtn.addEventListener('click', cancelEdit);

    // Enter key to add note (on title input only)
    noteTitleInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            noteBodyInput.focus();
        }
    });

    // --- Functions ---
    function saveNotes() {
        localStorage.setItem('lumina-notes', JSON.stringify(notes));
    }

    function handleNoteSubmit() {
        const title = noteTitleInput.value.trim();
        const body = noteBodyInput.value.trim();

        if (title === '' && body === '') {
            shakeInput();
            return;
        }

        if (editingId) {
            updateNote(title, body);
        } else {
            createNote(title, body);
        }
    }

    function createNote(title, body) {
        const newNote = {
            id: Date.now(),
            title: title || 'Untitled Note',
            body: body,
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        };

        notes.unshift(newNote); // Add to beginning
        saveNotes();
        renderNotes();
        clearInputs();
        showToast('Note Added!');
    }

    function updateNote(title, body) {
        const noteIndex = notes.findIndex(n => n.id === editingId);
        if (noteIndex !== -1) {
            notes[noteIndex].title = title || 'Untitled Note';
            notes[noteIndex].body = body;
            // Optionally update date on edit
            // notes[noteIndex].date = ... 

            saveNotes();
            renderNotes();
            cancelEdit(); // Reset state
            showToast('Note Updated!');
        }
    }

    function startEdit(id) {
        const note = notes.find(n => n.id === id);
        if (!note) return;

        editingId = id;
        noteTitleInput.value = note.title === 'Untitled Note' ? '' : note.title;
        noteBodyInput.value = note.body;

        // Update UI for Edit Mode
        addBtn.innerHTML = '<i class="fa-solid fa-check"></i> Update Note';
        cancelBtn.classList.remove('hidden');

        noteTitleInput.focus();
        // Scroll to top to see input
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function cancelEdit() {
        editingId = null;
        clearInputs();

        // Reset UI
        addBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Note';
        cancelBtn.classList.add('hidden');
    }

    function deleteNote(id) {
        if (editingId === id) {
            cancelEdit();
        }
        notes = notes.filter(note => note.id !== id);
        saveNotes();
        renderNotes();
        showToast('Note Deleted');
    }

    function renderNotes() {
        notesGrid.innerHTML = '';

        if (notes.length === 0) {
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');

            notes.forEach(note => {
                const noteCard = document.createElement('div');
                noteCard.classList.add('note-card');
                noteCard.innerHTML = `
                    <div class="note-header">
                        <h3 class="note-title">${escapeHtml(note.title)}</h3>
                        <div class="note-actions">
                            <button class="edit-btn" aria-label="Edit Note">
                                <i class="fa-solid fa-pen"></i>
                            </button>
                            <button class="delete-btn" aria-label="Delete Note">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <span class="note-date">${note.date}</span>
                    <p class="note-body">${escapeHtml(note.body)}</p>
                `;

                // Attach event listeners
                const deleteBtn = noteCard.querySelector('.delete-btn');
                deleteBtn.addEventListener('click', () => deleteNote(note.id));

                const editBtn = noteCard.querySelector('.edit-btn');
                editBtn.addEventListener('click', () => startEdit(note.id));

                notesGrid.appendChild(noteCard);
            });
        }
    }

    function clearInputs() {
        noteTitleInput.value = '';
        noteBodyInput.value = '';
        noteTitleInput.focus();
    }

    function showToast(message) {
        toast.textContent = message;
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }

    function shakeInput() {
        const wrapper = document.querySelector('.input-wrapper');
        wrapper.style.transform = 'translateX(10px)';
        setTimeout(() => {
            wrapper.style.transform = 'translateX(-10px)';
            setTimeout(() => {
                wrapper.style.transform = 'translateX(0)';
            }, 100);
        }, 100);

        noteTitleInput.focus();
    }

    // Helper to prevent XSS
    function escapeHtml(text) {
        if (!text) return '';
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
});
