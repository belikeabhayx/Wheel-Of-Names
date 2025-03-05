
import React from 'react';
import { useStore } from '@/store/useStore';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const ResultsList: React.FC = () => {
  const { results, clearResults, isSpinning } = useStore();
  
  const handleClearResults = () => {
    clearResults();
    toast.success("Results cleared");
  };
  
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold flex items-center space-x-2">
          <span className="inline-block w-2 h-2 bg-indigo-500 rounded-full animate-ping-small"></span>
          <span>Results</span>
        </h2>
        
        {results.length > 0 && (
          <button
            onClick={handleClearResults}
            disabled={isSpinning}
            className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 flex items-center text-xs"
          >
            <Trash2 size={14} className="mr-1" />
            Clear All
          </button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 py-2">
        {results.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No results yet. Spin the wheel to see winners here.
          </div>
        ) : (
          <ul className="space-y-2">
            {results.map((result, index) => (
              <li 
                key={result.id}
                className={cn(
                  "p-3 rounded-lg border border-gray-100 bg-white shadow-sm",
                  index === 0 && "border-indigo-200 bg-indigo-50/50 animate-bounce-in"
                )}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className={cn(
                      "text-xs px-2 py-1 rounded-full",
                      index === 0 ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-500"
                    )}>
                      {index === 0 ? "Latest Winner" : `Winner #${results.length - index}`}
                    </span>
                    <h3 className="mt-2 text-lg font-medium">{result.name}</h3>
                  </div>
                  <span className="text-xs text-gray-400">{formatTimestamp(result.timestamp)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ResultsList;
