
import React, { useState } from 'react';
import { useStore, Entry } from '@/store/useStore';
import EntryItem from './EntryItem';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

const EntryManager: React.FC = () => {
  const { entries, addEntry, isSpinning } = useStore();
  const [newEntry, setNewEntry] = useState('');
  
  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newEntry.trim()) {
      toast.error("Entry name cannot be empty");
      return;
    }
    
    if (entries.some(entry => entry.name.toLowerCase() === newEntry.toLowerCase())) {
      toast.error("This entry already exists");
      return;
    }
    
    addEntry(newEntry.trim());
    setNewEntry('');
    toast.success("Entry added successfully");
  };
  
  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold flex items-center space-x-2">
          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-ping-small"></span>
          <span>Entries</span>
        </h2>
      </div>
      
      <div className="p-4">
        <form onSubmit={handleAddEntry} className="flex space-x-2">
          <input
            type="text"
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="Add new entry..."
            className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
            disabled={isSpinning}
          />
          <button 
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSpinning || !newEntry.trim()}
          >
            <Plus size={18} />
          </button>
        </form>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {entries.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No entries yet. Add your first entry above.
          </div>
        ) : (
          entries.map((entry) => (
            <EntryItem key={entry.id} entry={entry} />
          ))
        )}
      </div>
    </div>
  );
};

export default EntryManager;
