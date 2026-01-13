
import React, { useState } from 'react';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: (title: string, priority: Task['priority']) => void;
  onUpdatePriority: (id: string, priority: Task['priority']) => void;
  onClearCompleted: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete, onAdd, onUpdatePriority, onClearCompleted }) => {
  const [inputValue, setInputValue] = useState('');
  const [inputPriority, setInputPriority] = useState<Task['priority']>('medium');
  const [filter, setFilter] = useState<'all' | 'active' | 'done'>('all');
  const [showConfirm, setShowConfirm] = useState<string | null>(null);
  const [showClearAllConfirm, setShowClearAllConfirm] = useState(false);
  const [editingPriorityTask, setEditingPriorityTask] = useState<string | null>(null);

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  const filteredTasks = tasks.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'done') return t.completed;
    return true;
  });

  const getPriorityInfo = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return { label: 'Urgent', colorClass: 'bg-rose-500/10 text-rose-600 border-rose-500/20' };
      case 'medium':
        return { label: 'Moyen', colorClass: 'bg-amber-500/10 text-amber-600 border-amber-500/20' };
      case 'low':
      default:
        return { label: 'Basse', colorClass: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' };
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAdd(inputValue, inputPriority);
      setInputValue('');
      setInputPriority('medium');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Barre de Progression Minimaliste */}
      <div className="px-1">
        <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-3">
          <span>{completedCount} Terminé</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden p-0.5">
          <div className="bg-indigo-600 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Formulaire "Neo-Clean" */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800/50 p-4 rounded-4xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-4">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Quoi de neuf ?"
          className="w-full bg-transparent dark:text-white font-medium text-lg outline-none placeholder:text-slate-300 dark:placeholder:text-slate-600 px-1"
        />
        <div className="flex items-center justify-between border-t border-slate-50 dark:border-slate-800 pt-4">
          <div className="flex gap-1.5">
            {(['low', 'medium', 'high'] as const).map(p => (
              <button
                key={p}
                type="button"
                onClick={() => setInputPriority(p)}
                className={`w-8 h-8 rounded-full text-[10px] font-bold uppercase transition-all border flex items-center justify-center ${inputPriority === p ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 border-slate-100 dark:border-slate-700'}`}
              >
                {p.charAt(0)}
              </button>
            ))}
          </div>
          <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-2xl text-sm font-bold shadow-xl shadow-indigo-200 dark:shadow-none active:scale-90 transition-all">
            Créer
          </button>
        </div>
      </form>

      {/* Filtres "Tabs" */}
      <div className="flex justify-between items-center">
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl overflow-hidden max-w-fit">
          {(['all', 'active', 'done'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 text-[10px] font-black rounded-xl transition-all uppercase tracking-tight ${filter === f ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {f === 'all' ? 'Tout' : f === 'active' ? 'Cours' : 'Fini'}
            </button>
          ))}
        </div>
        {completedCount > 0 && (
          <button 
            onClick={() => setShowClearAllConfirm(true)}
            className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-rose-500 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        )}
      </div>

      {/* Grille de tuiles repensée */}
      <div className="grid grid-cols-2 gap-4 pb-12">
        {filteredTasks.length === 0 ? (
          <div className="col-span-2 text-center py-12">
            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 opacity-50">
               <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </div>
            <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">Le vide intersidéral</p>
          </div>
        ) : filteredTasks.map(task => {
          const pInfo = getPriorityInfo(task.priority);
          return (
            <div 
              key={task.id} 
              className={`group relative flex flex-col p-5 rounded-4xl transition-all duration-500 ease-in-out h-[160px] border ${
                task.completed 
                  ? 'bg-slate-100/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 opacity-50 grayscale' 
                  : 'bg-white dark:bg-slate-800 border-white dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <label className="relative flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={task.completed} 
                    onChange={() => onToggle(task.id)}
                    className="peer hidden"
                  />
                  <div className="w-5 h-5 rounded-full border-2 border-slate-200 dark:border-slate-700 peer-checked:bg-indigo-600 peer-checked:border-indigo-600 flex items-center justify-center transition-all">
                    <svg className={`w-3 h-3 text-white transition-opacity ${task.completed ? 'opacity-100' : 'opacity-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                </label>
                <button 
                  onClick={() => setShowConfirm(task.id)} 
                  className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-rose-500 transition-all p-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <span className={`text-sm font-bold leading-[1.4] mb-auto line-clamp-3 transition-all duration-500 ${
                task.completed 
                  ? 'line-through text-slate-400' 
                  : 'text-slate-800 dark:text-slate-100'
              }`}>
                {task.title}
              </span>

              <div className="mt-4 flex justify-between items-center relative">
                <button 
                  onClick={() => setEditingPriorityTask(task.id)}
                  className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-full border transition-all ${pInfo.colorClass}`}
                >
                  {pInfo.label}
                </button>
              </div>
              
              {editingPriorityTask === task.id && (
                <div className="absolute inset-0 z-40 p-2 flex flex-col justify-end">
                   <div className="fixed inset-0 z-30" onClick={() => setEditingPriorityTask(null)} />
                   <div className="relative z-40 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col animate-in slide-in-from-bottom-2 duration-300">
                      {(['low', 'medium', 'high'] as const).map(p => (
                        <button
                          key={p}
                          onClick={() => { onUpdatePriority(task.id, p); setEditingPriorityTask(null); }}
                          className={`w-full text-center px-4 py-3 text-[10px] font-black uppercase border-b border-slate-50 dark:border-slate-800 last:border-0 ${task.priority === p ? 'text-indigo-600 bg-indigo-50/50 dark:bg-indigo-500/10' : 'text-slate-400'}`}
                        >
                          {p}
                        </button>
                      ))}
                   </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modales avec Blur */}
      {showConfirm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-8">
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 w-full max-w-[320px] shadow-2xl border border-white/20 animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 text-center">Supprimer ?</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 text-center leading-relaxed">Cette action est irréversible pour ce projet MIAGE.</p>
            <div className="flex flex-col gap-3">
              <button onClick={() => { if(showConfirm) onDelete(showConfirm); setShowConfirm(null); }} className="w-full py-4 bg-rose-600 text-white rounded-3xl font-black text-sm shadow-xl shadow-rose-200 dark:shadow-none active:scale-95 transition-all">Oui, Adieu</button>
              <button onClick={() => setShowConfirm(null)} className="w-full py-4 text-sm font-black text-slate-400 uppercase tracking-widest">Garder</button>
            </div>
          </div>
        </div>
      )}

      {showClearAllConfirm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-8">
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 w-full max-w-[320px] shadow-2xl border border-white/20 animate-in zoom-in duration-300">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 text-center">Nettoyage</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 text-center">On vire les {completedCount} tâches terminées ?</p>
            <div className="flex flex-col gap-3">
              <button onClick={() => { onClearCompleted(); setShowClearAllConfirm(false); }} className="w-full py-4 bg-indigo-600 text-white rounded-3xl font-black text-sm shadow-xl active:scale-95 transition-all">Nettoyer</button>
              <button onClick={() => setShowClearAllConfirm(false)} className="w-full py-4 text-sm font-black text-slate-400 uppercase tracking-widest text-center">Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
