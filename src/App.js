// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes'));
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (title.trim() !== '' && content.trim() !== '') {
      const newNote = { title, content };
      setNotes([...notes, newNote]);
      setTitle('');
      setContent('');
    }
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  const handleMarkdown = (content) => {
    return content
      .split('\n')
      .map((line, index) => <p key={index}>{line}</p>);
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <header>
        <h1>Notes App</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search notes"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>
      <main>
        <div className="note-form">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={handleAddNote}>Save</button>
        </div>
        <div className="note-list">
          {filteredNotes.map((note, index) => (
            <div className="note" key={index}>
              <h3>{note.title}</h3>
              <div className="note-content">{handleMarkdown(note.content)}</div>
              <button onClick={() => handleDeleteNote(index)}>Delete</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
