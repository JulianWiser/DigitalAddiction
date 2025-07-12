/**
 * Quick notes component for jotting down thoughts and insights
 */

import React, { useState, useEffect } from 'react';
import { StickyNote, Plus, Trash2 } from 'lucide-react';

interface Note {
  id: string;
  content: string;
  timestamp: Date;
}

export default function QuickNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    const savedNotes = localStorage.getItem('digitalAddictionNotes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes).map((note: any) => ({
        ...note,
        timestamp: new Date(note.timestamp)
      })));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('digitalAddictionNotes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNote.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        content: newNote.trim(),
        timestamp: new Date()
      };
      setNotes([note, ...notes]);
      setNewNote('');
    }
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      addNote();
    }
  };

  return (
    <div className="bg-gradient-to-r from-yellow-900/30 to-amber-900/30 border border-yellow-500/30 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <StickyNote className="w-6 h-6 text-yellow-400" />
        <h3 className="text-xl font-bold text-white">Quick Notes</h3>
      </div>
      
      <div className="mb-4">
        <div className="flex gap-2">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Jot down insights, reflections, or reminders... (Ctrl+Enter to save)"
            className="flex-1 p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 focus:outline-none transition-all resize-none"
            rows={3}
          />
          <button
            onClick={addNote}
            disabled={!newNote.trim()}
            className="self-start p-3 bg-yellow-600 hover:bg-yellow-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {notes.length === 0 ? (
          <p className="text-center text-gray-400 py-4">No notes yet. Start by adding your first insight!</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
              <div className="flex justify-between items-start gap-3">
                <p className="text-gray-300 flex-1">{note.content}</p>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-gray-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {note.timestamp.toLocaleDateString()} at {note.timestamp.toLocaleTimeString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
