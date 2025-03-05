import React, { useState } from 'react';
import { Entry, useStore } from '@/store/useStore';
import { X, Edit, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface EntryItemProps {
  entry: Entry;
}

const EntryItem: React.FC<EntryItemProps> = ({ entry }) => {
  const { removeEntry, updateEntry, isSpinning } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(entry.name);
  
  const handleRemove = () => {
    removeEntry(entry.id);
    toast.success("Entry removed");
  };
  
  const handleEdit = () => {
    if (isSpinning) return;
    setIsEditing(true);
  };
  
  const handleSave = () => {
    if (!editedName.trim()) {
      toast.error("Entry name cannot be empty");
      return;
    }
    
    updateEntry(entry.id, editedName.trim());
    setIsEditing(false);
    toast.success("Entry updated");
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditedName(entry.name);
      setIsEditing(false);
    }
  };
  
  return (
    <div 
      className={cn(
        "flex items-center p-2 rounded-lg bg-white border border-gray-300 shadow-sm transition-all group",
        "hover:border-blue-400 hover:shadow-md animate-scale-in",
        isEditing && "border-blue-500 shadow-md"
      )}
    >
      {isEditing ? (
        <input
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-2 py-1 text-sm outline-none focus:ring-0 text-gray-900"
          autoFocus
        />
      ) : (
        <span className="flex-1 text-sm font-semibold text-gray-900 truncate px-2">{entry.name}</span>
      )}
      
      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="p-1 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50 transition-colors"
          >
            <Check size={16} />
          </button>
        ) : (
          <button
            onClick={handleEdit}
            disabled={isSpinning}
            className="p-1 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:pointer-events-none"
          >
            <Edit size={16} />
          </button>
        )}
        
        <button
          onClick={handleRemove}
          disabled={isSpinning}
          className="p-1 text-gray-600 hover:text-red-600 rounded-full hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:pointer-events-none"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default EntryItem;
