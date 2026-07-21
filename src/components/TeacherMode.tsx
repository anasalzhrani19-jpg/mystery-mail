import { motion, AnimatePresence } from 'motion/react';
import { Settings, X, Plus, Trash2, Edit2, CheckCircle2, Circle, FolderPlus, Tag, Search, Sparkles } from 'lucide-react';
import { Challenge } from '../types';
import { useState, useMemo } from 'react';

interface TeacherModeProps {
  isOpen: boolean;
  onClose: () => void;
  challenges: Challenge[];
  setChallenges: (c: Challenge[]) => void;
  categories: string[];
  setCategories: (cats: string[]) => void;
}

export default function TeacherMode({ 
  isOpen, 
  onClose, 
  challenges, 
  setChallenges,
  categories,
  setCategories
}: TeacherModeProps) {
  const [activeTab, setActiveTab] = useState<'challenges' | 'categories'>('challenges');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('ALL');
  const [search, setSearch] = useState('');
  
  // Challenge Editing
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Challenge>>({});

  // Category Management State
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editCategoryName, setEditCategoryName] = useState('');

  const filteredChallenges = useMemo(() => {
    return challenges.filter(c => {
      const matchesSearch = c.text.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase());
      const matchesCat = selectedCategoryFilter === 'ALL' || c.category === selectedCategoryFilter;
      return matchesSearch && matchesCat;
    });
  }, [challenges, search, selectedCategoryFilter]);

  const handleToggle = (id: string) => {
    setChallenges(challenges.map(c => c.id === id ? { ...c, enabled: !c.enabled } : c));
  };

  const handleDeleteChallenge = (id: string) => {
    if (window.confirm('Are you sure you want to delete this challenge?')) {
      setChallenges(challenges.filter(c => c.id !== id));
    }
  };

  const handleStartEditChallenge = (c: Challenge) => {
    setEditingId(c.id);
    setEditForm(c);
  };

  const handleSaveEditChallenge = () => {
    if (!editForm.text || !editForm.category) return;
    
    if (editingId === 'NEW') {
      const newChallenge: Challenge = {
        id: Date.now().toString(),
        text: editForm.text,
        category: editForm.category,
        enabled: true
      };
      setChallenges([newChallenge, ...challenges]);
    } else {
      setChallenges(challenges.map(c => c.id === editingId ? { ...c, ...editForm } as Challenge : c));
    }
    setEditingId(null);
  };

  // Category Actions
  const handleAddCategory = () => {
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;
    if (categories.some(cat => cat.toLowerCase() === trimmed.toLowerCase())) {
      alert('This category already exists!');
      return;
    }
    setCategories([...categories, trimmed]);
    setNewCategoryName('');
  };

  const handleStartRenameCategory = (cat: string) => {
    setEditingCategory(cat);
    setEditCategoryName(cat);
  };

  const handleSaveRenameCategory = (oldCat: string) => {
    const trimmed = editCategoryName.trim();
    if (!trimmed || trimmed === oldCat) {
      setEditingCategory(null);
      return;
    }
    if (categories.some(c => c.toLowerCase() === trimmed.toLowerCase() && c.toLowerCase() !== oldCat.toLowerCase())) {
      alert('A category with this name already exists.');
      return;
    }

    // Rename category in categories list
    setCategories(categories.map(c => c === oldCat ? trimmed : c));

    // Update all challenges in this category
    setChallenges(challenges.map(c => c.category === oldCat ? { ...c, category: trimmed } : c));

    if (selectedCategoryFilter === oldCat) {
      setSelectedCategoryFilter(trimmed);
    }
    setEditingCategory(null);
  };

  const handleDeleteCategory = (catToDelete: string) => {
    if (categories.length <= 1) {
      alert('You must have at least one category.');
      return;
    }

    const count = challenges.filter(c => c.category === catToDelete).length;
    if (window.confirm(`Delete category "${catToDelete}"? ${count > 0 ? `This will also delete the ${count} challenge(s) in this category.` : ''}`)) {
      setCategories(categories.filter(c => c !== catToDelete));
      setChallenges(challenges.filter(c => c.category !== catToDelete));
      if (selectedCategoryFilter === catToDelete) {
        setSelectedCategoryFilter('ALL');
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 shadow-sm">
                  <Settings size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-slate-800">Teacher Mode</h2>
                  <p className="text-xs text-slate-500">Manage challenges, create custom prompts & categories</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Navigation Tabs */}
                <div className="bg-slate-200/60 p-1 rounded-xl flex items-center gap-1">
                  <button
                    onClick={() => setActiveTab('challenges')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === 'challenges' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    <Sparkles size={14} />
                    Challenges ({challenges.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('categories')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === 'categories' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    <Tag size={14} />
                    Categories ({categories.length})
                  </button>
                </div>

                <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer">
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Content Body */}
            {activeTab === 'challenges' ? (
              <div className="p-6 flex-1 overflow-hidden flex flex-col gap-5">
                {/* Search & Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="relative flex-1">
                    <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input 
                      type="text" 
                      placeholder="Search challenges by text or category..." 
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-slate-700 text-sm"
                    />
                  </div>

                  <button 
                    onClick={() => {
                      setEditingId('NEW');
                      setEditForm({ text: '', category: categories[0] || 'Speaking', enabled: true });
                    }}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-indigo-500/20 transition-all cursor-pointer active:scale-95"
                  >
                    <Plus size={18} /> New Challenge
                  </button>
                </div>

                {/* Category Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
                  <button
                    onClick={() => setSelectedCategoryFilter('ALL')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${selectedCategoryFilter === 'ALL' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    All ({challenges.length})
                  </button>
                  {categories.map(cat => {
                    const count = challenges.filter(c => c.category === cat).length;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategoryFilter(cat)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${selectedCategoryFilter === cat ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                      >
                        {cat} ({count})
                      </button>
                    );
                  })}
                </div>

                {/* Challenge Items List */}
                <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3">
                  {editingId === 'NEW' && (
                    <div className="p-4 bg-indigo-50/80 rounded-2xl border border-indigo-200 flex flex-col gap-3 shadow-sm">
                       <textarea 
                          className="w-full p-3 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none text-slate-700 text-sm bg-white"
                          rows={2}
                          placeholder="Enter your new prompt or challenge text..."
                          value={editForm.text || ''}
                          onChange={(e) => setEditForm({...editForm, text: e.target.value})}
                       />
                       <div className="flex flex-wrap justify-between items-center gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-indigo-700 uppercase">Category:</span>
                            <select 
                              className="p-2 rounded-lg border border-indigo-200 text-slate-700 text-sm focus:outline-none bg-white font-medium"
                              value={editForm.category}
                              onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                            >
                               {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                          </div>
                          <div className="flex gap-2">
                             <button onClick={() => setEditingId(null)} className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer">Cancel</button>
                             <button onClick={handleSaveEditChallenge} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-xs font-bold transition-all cursor-pointer">Save Challenge</button>
                          </div>
                       </div>
                    </div>
                  )}

                  {filteredChallenges.map(c => (
                    <div key={c.id} className={`p-4 rounded-2xl border flex items-center gap-4 transition-all ${c.enabled ? 'bg-white border-slate-200 shadow-sm hover:border-indigo-200' : 'bg-slate-50 border-slate-200 opacity-60'}`}>
                      {editingId === c.id ? (
                        <div className="flex-1 flex flex-col gap-3">
                          <textarea 
                            className="w-full p-3 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none text-slate-700 text-sm bg-white"
                            rows={2}
                            value={editForm.text || ''}
                            onChange={(e) => setEditForm({...editForm, text: e.target.value})}
                          />
                          <div className="flex flex-wrap justify-between items-center gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-indigo-700 uppercase">Category:</span>
                              <select 
                                className="p-2 rounded-lg border border-indigo-200 text-slate-700 text-sm focus:outline-none bg-white font-medium"
                                value={editForm.category}
                                onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                              >
                                 {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                              </select>
                            </div>
                            <div className="flex gap-2">
                               <button onClick={() => setEditingId(null)} className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer">Cancel</button>
                               <button onClick={handleSaveEditChallenge} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-xs font-bold transition-all cursor-pointer">Save Changes</button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <button 
                            onClick={() => handleToggle(c.id)} 
                            className="text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                            title={c.enabled ? "Disable challenge" : "Enable challenge"}
                          >
                            {c.enabled ? <CheckCircle2 className="text-emerald-500" size={24} /> : <Circle size={24} />}
                          </button>
                          <div className="flex-1">
                            <p className={`text-slate-800 font-medium text-sm mb-1 ${!c.enabled && 'line-through text-slate-400'}`}>{c.text}</p>
                            <span className="inline-block px-2.5 py-0.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-indigo-100">
                              {c.category}
                            </span>
                          </div>
                          <div className="flex gap-1">
                            <button onClick={() => handleStartEditChallenge(c)} className="p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors cursor-pointer" title="Edit Prompt">
                              <Edit2 size={16} />
                            </button>
                            <button onClick={() => handleDeleteChallenge(c.id)} className="p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-500 rounded-lg transition-colors cursor-pointer" title="Delete Prompt">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                  
                  {filteredChallenges.length === 0 && (
                    <div className="text-center py-16 text-slate-400 flex flex-col items-center gap-2">
                      <Sparkles size={32} className="text-slate-300" />
                      <p className="font-medium text-sm">No challenges found matching your criteria.</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Category Management View */
              <div className="p-6 flex-1 overflow-y-auto flex flex-col gap-6">
                {/* Add Category Section */}
                <div className="p-5 bg-indigo-50/60 rounded-2xl border border-indigo-100 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                  <div className="flex-1 flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-indigo-200">
                    <Tag size={18} className="text-indigo-500" />
                    <input 
                      type="text" 
                      placeholder="Enter new category name..." 
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                      className="w-full focus:outline-none text-slate-800 text-sm"
                    />
                  </div>
                  <button 
                    onClick={handleAddCategory}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95 whitespace-nowrap"
                  >
                    <FolderPlus size={18} /> Create Category
                  </button>
                </div>

                {/* Categories List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {categories.map(cat => {
                    const promptCount = challenges.filter(c => c.category === cat).length;
                    const isEditing = editingCategory === cat;

                    return (
                      <div key={cat} className="p-4 rounded-2xl border border-slate-200 bg-white flex items-center justify-between gap-3 shadow-sm hover:border-indigo-200 transition-all">
                        {isEditing ? (
                          <div className="flex-1 flex items-center gap-2">
                            <input 
                              type="text" 
                              value={editCategoryName} 
                              onChange={(e) => setEditCategoryName(e.target.value)}
                              className="flex-1 px-3 py-1.5 text-sm rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            />
                            <button onClick={() => handleSaveRenameCategory(cat)} className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 cursor-pointer">Save</button>
                            <button onClick={() => setEditingCategory(null)} className="px-3 py-1.5 text-slate-500 text-xs font-bold hover:bg-slate-100 rounded-lg cursor-pointer">Cancel</button>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center font-bold text-xs">
                                <Tag size={16} />
                              </div>
                              <div>
                                <h4 className="font-bold text-slate-800 text-sm">{cat}</h4>
                                <p className="text-xs text-slate-400">{promptCount} prompt{promptCount === 1 ? '' : 's'}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-1">
                              <button 
                                onClick={() => handleStartRenameCategory(cat)}
                                className="p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors cursor-pointer"
                                title="Rename Category"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button 
                                onClick={() => handleDeleteCategory(cat)}
                                className="p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-500 rounded-lg transition-colors cursor-pointer"
                                title="Delete Category"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

