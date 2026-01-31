import React, { useState, useEffect } from 'react';
import { StickyNote, Plus, Trash2, Search, Tag, Star, StarOff, Download, BookOpen, Scale, Globe, Brain, Calculator, Type } from 'lucide-react';
import { Subject } from '../types';

interface Note {
  id: string;
  title: string;
  content: string;
  subject: Subject;
  tags: string[];
  isStarred: boolean;
  createdAt: number;
}

const QuickNotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('lawranker_notes');
    return saved ? JSON.parse(saved) : getDefaultNotes();
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState<Subject | 'all'>('all');
  const [showStarred, setShowStarred] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  
  // New note form state
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newSubject, setNewSubject] = useState<Subject>(Subject.LegalAptitude);
  const [newTags, setNewTags] = useState('');

  useEffect(() => {
    localStorage.setItem('lawranker_notes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    
    const note: Note = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      content: newContent.trim(),
      subject: newSubject,
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean),
      isStarred: false,
      createdAt: Date.now()
    };
    
    setNotes(prev => [note, ...prev]);
    setNewTitle('');
    setNewContent('');
    setNewTags('');
    setIsAdding(false);
  };

  const handleUpdateNote = () => {
    if (!editingNote || !newTitle.trim() || !newContent.trim()) return;
    
    setNotes(prev => prev.map(n => 
      n.id === editingNote.id 
        ? { 
            ...n, 
            title: newTitle.trim(), 
            content: newContent.trim(), 
            subject: newSubject,
            tags: newTags.split(',').map(t => t.trim()).filter(Boolean)
          }
        : n
    ));
    setEditingNote(null);
    setNewTitle('');
    setNewContent('');
    setNewTags('');
  };

  const handleDeleteNote = (id: string) => {
    if (confirm('Delete this note?')) {
      setNotes(prev => prev.filter(n => n.id !== id));
    }
  };

  const toggleStar = (id: string) => {
    setNotes(prev => prev.map(n => 
      n.id === id ? { ...n, isStarred: !n.isStarred } : n
    ));
  };

  const startEditing = (note: Note) => {
    setEditingNote(note);
    setNewTitle(note.title);
    setNewContent(note.content);
    setNewSubject(note.subject);
    setNewTags(note.tags.join(', '));
    setIsAdding(true);
  };

  const cancelEditing = () => {
    setEditingNote(null);
    setNewTitle('');
    setNewContent('');
    setNewTags('');
    setIsAdding(false);
  };

  const filteredNotes = notes.filter(note => {
    if (showStarred && !note.isStarred) return false;
    if (filterSubject !== 'all' && note.subject !== filterSubject) return false;
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return note.title.toLowerCase().includes(search) ||
             note.content.toLowerCase().includes(search) ||
             note.tags.some(t => t.toLowerCase().includes(search));
    }
    return true;
  });

  const getSubjectIcon = (subject: Subject) => {
    switch (subject) {
      case Subject.LegalAptitude: return <Scale className="w-4 h-4" />;
      case Subject.GK: return <Globe className="w-4 h-4" />;
      case Subject.LogicalReasoning: return <Brain className="w-4 h-4" />;
      case Subject.English: return <Type className="w-4 h-4" />;
      case Subject.Math: return <Calculator className="w-4 h-4" />;
    }
  };

  const getSubjectColor = (subject: Subject) => {
    switch (subject) {
      case Subject.LegalAptitude: return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case Subject.GK: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case Subject.LogicalReasoning: return 'bg-green-500/20 text-green-400 border-green-500/30';
      case Subject.English: return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case Subject.Math: return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    }
  };

  const exportNotes = () => {
    const content = filteredNotes.map(note => 
      `## ${note.title}\n**Subject:** ${note.subject}\n**Tags:** ${note.tags.join(', ')}\n\n${note.content}\n\n---\n`
    ).join('\n');
    
    const blob = new Blob([`# My MH CET Law Notes\n\n${content}`], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mhcet-law-notes.md';
    a.click();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <StickyNote className="w-8 h-8 text-amber-400" />
            Quick Notes
          </h1>
          <p className="text-gray-400 mt-1">Save important points for quick revision</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={exportNotes}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Note
          </button>
        </div>
      </div>

      {/* Add/Edit Note Modal */}
      {isAdding && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-xl border border-gray-700 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-4">
              {editingNote ? 'Edit Note' : 'Add New Note'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Article 14 - Right to Equality"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                <select
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value as Subject)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500"
                >
                  {Object.values(Subject).map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Content</label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Write your notes here... You can use markdown!"
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="e.g., Constitution, Important, Article"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                <button
                  onClick={cancelEditing}
                  className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={editingNote ? handleUpdateNote : handleAddNote}
                  className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
                >
                  {editingNote ? 'Update Note' : 'Save Note'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        <select
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value as Subject | 'all')}
          className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Subjects</option>
          {Object.values(Subject).map(subject => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>
        
        <button
          onClick={() => setShowStarred(!showStarred)}
          className={`px-4 py-3 rounded-lg transition-all flex items-center gap-2 ${
            showStarred 
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
              : 'bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700'
          }`}
        >
          {showStarred ? <Star className="w-5 h-5 fill-current" /> : <StarOff className="w-5 h-5" />}
          Starred
        </button>
      </div>

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <div className="text-center py-16">
          <StickyNote className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-400 mb-2">No notes found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || filterSubject !== 'all' || showStarred 
              ? 'Try adjusting your filters' 
              : 'Start by adding your first note!'}
          </p>
          {!searchTerm && filterSubject === 'all' && !showStarred && (
            <button
              onClick={() => setIsAdding(true)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create First Note
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map(note => (
            <div 
              key={note.id} 
              className={`bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden hover:border-gray-600 transition-all group`}
            >
              {/* Note Header */}
              <div className={`p-3 border-b border-gray-700 ${getSubjectColor(note.subject)} flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                  {getSubjectIcon(note.subject)}
                  <span className="text-xs font-medium">{note.subject}</span>
                </div>
                <button
                  onClick={() => toggleStar(note.id)}
                  className="opacity-60 hover:opacity-100 transition-opacity"
                >
                  {note.isStarred ? (
                    <Star className="w-4 h-4 text-amber-400 fill-current" />
                  ) : (
                    <StarOff className="w-4 h-4" />
                  )}
                </button>
              </div>
              
              {/* Note Content */}
              <div className="p-4">
                <h3 className="font-bold text-white mb-2 line-clamp-2">{note.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-4 whitespace-pre-wrap">{note.content}</p>
                
                {/* Tags */}
                {note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {note.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-gray-700 text-gray-400 text-xs rounded-full">
                        #{tag}
                      </span>
                    ))}
                    {note.tags.length > 3 && (
                      <span className="text-xs text-gray-500">+{note.tags.length - 3}</span>
                    )}
                  </div>
                )}
              </div>
              
              {/* Note Actions */}
              <div className="p-3 border-t border-gray-700 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-gray-500">
                  {new Date(note.createdAt).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditing(note)}
                    className="px-3 py-1 text-xs bg-gray-700 text-white rounded hover:bg-gray-600 transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="px-3 py-1 text-xs bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-all"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-800">
        <div className="text-center">
          <p className="text-2xl font-bold text-white">{notes.length}</p>
          <p className="text-xs text-gray-400">Total Notes</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-amber-400">{notes.filter(n => n.isStarred).length}</p>
          <p className="text-xs text-gray-400">Starred</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-purple-400">{notes.filter(n => n.subject === Subject.LegalAptitude).length}</p>
          <p className="text-xs text-gray-400">Legal Notes</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-400">{new Set(notes.flatMap(n => n.tags)).size}</p>
          <p className="text-xs text-gray-400">Unique Tags</p>
        </div>
      </div>
    </div>
  );
};

// Default notes to start with
function getDefaultNotes(): Note[] {
  return [
    {
      id: '1',
      title: 'Article 14 - Right to Equality',
      content: `Two concepts:
1. Equality before law (British origin)
2. Equal protection of laws (American origin)

Not absolute - reasonable classification allowed if:
- Based on intelligible differentia
- Rational nexus with object`,
      subject: Subject.LegalAptitude,
      tags: ['Constitution', 'FR', 'Important'],
      isStarred: true,
      createdAt: Date.now() - 86400000
    },
    {
      id: '2',
      title: 'New Criminal Laws 2024',
      content: `Replaced from July 1, 2024:
- IPC → BNS (Bharatiya Nyaya Sanhita)
- CrPC → BNSS (Bharatiya Nagarik Suraksha Sanhita)
- Evidence Act → BSA (Bharatiya Sakshya Adhiniyam)

Key changes: More tech-friendly, community service added`,
      subject: Subject.LegalAptitude,
      tags: ['Criminal Law', 'New Laws', 'Important'],
      isStarred: true,
      createdAt: Date.now() - 172800000
    },
    {
      id: '3',
      title: 'GLC Mumbai Cutoffs (General)',
      content: `Recent years:
- 2025: ~143/150
- 2024: ~142/150
- 2023: ~140/150

Target: 145+ to be safe!`,
      subject: Subject.GK,
      tags: ['Cutoff', 'GLC', 'Important'],
      isStarred: true,
      createdAt: Date.now() - 259200000
    },
    {
      id: '4',
      title: 'Key Legal Maxims',
      content: `1. Ignorantia juris non excusat - Ignorance of law is no excuse
2. Actus non facit reum nisi mens sit rea - Act + Intent = Crime
3. Res ipsa loquitur - The thing speaks for itself
4. Audi alteram partem - Hear the other side`,
      subject: Subject.LegalAptitude,
      tags: ['Maxims', 'Latin', 'Important'],
      isStarred: false,
      createdAt: Date.now() - 345600000
    },
    {
      id: '5',
      title: 'Percentage Shortcuts',
      content: `Quick calculations:
- 10% = Divide by 10
- 5% = Half of 10%
- 15% = 10% + 5%
- 20% = 10% × 2
- 25% = Divide by 4
- 50% = Divide by 2`,
      subject: Subject.Math,
      tags: ['Math', 'Shortcuts', 'Quick'],
      isStarred: false,
      createdAt: Date.now() - 432000000
    }
  ];
}

export default QuickNotes;
