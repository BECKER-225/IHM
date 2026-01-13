
import React, { useState } from 'react';
import { Contact } from '../types';

interface DirectoryProps {
  contacts: Contact[];
  onAdd: (contact: Omit<Contact, 'id'>) => void;
}

const Directory: React.FC<DirectoryProps> = ({ contacts, onAdd }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const filteredContacts = contacts.filter(c => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      c.name.toLowerCase().includes(lowerSearch) ||
      c.email.toLowerCase().includes(lowerSearch) ||
      c.phone.toLowerCase().includes(lowerSearch)
    );
  });

  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-700">
      {!isAdding ? (
        <>
          <div className="relative group px-1">
            <input 
              type="text" 
              placeholder="Chercher un contact..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-slate-800 border-none shadow-sm rounded-3xl px-12 py-4 focus:ring-4 focus:ring-indigo-500/10 outline-none dark:text-white placeholder:text-slate-300 font-medium transition-all"
            />
            <svg className="w-5 h-5 text-slate-300 absolute left-5 top-4.5 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>

          <div className="grid gap-4">
            {filteredContacts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">Aucun contact trouvé</p>
              </div>
            ) : (
              filteredContacts.map(contact => (
                <div key={contact.id} className="flex items-center gap-4 p-5 bg-white dark:bg-slate-800 rounded-4xl border border-white dark:border-slate-700 shadow-sm hover:shadow-md transition-all group">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-100 dark:shadow-none transition-transform group-hover:scale-110">
                    {contact.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 dark:text-white truncate">{contact.name}</h4>
                    <div className="space-y-0.5">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">{contact.email}</p>
                      <p className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400">{contact.phone}</p>
                    </div>
                  </div>
                  <a 
                    href={`tel:${contact.phone}`} 
                    className="w-10 h-10 flex items-center justify-center bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl transition-all hover:bg-indigo-600 hover:text-white active:scale-90"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </a>
                </div>
              ))
            )}
          </div>

          <button 
            onClick={() => setIsAdding(true)}
            className="fixed bottom-24 right-8 w-16 h-16 bg-indigo-600 text-white rounded-full shadow-2xl shadow-indigo-300 flex items-center justify-center z-50 hover:scale-110 active:scale-90 transition-all"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
          </button>
        </>
      ) : (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-5xl border border-slate-100 dark:border-slate-800 animate-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-3xl font-black mb-8 dark:text-white tracking-tight">Nouveau</h3>
          <div className="space-y-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nom</label>
              <input 
                className="w-full bg-slate-50 dark:bg-slate-800 border-none px-6 py-4 rounded-3xl dark:text-white font-medium focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all" 
                placeholder="Ex: Chahrazed"
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
              <input 
                className="w-full bg-slate-50 dark:bg-slate-800 border-none px-6 py-4 rounded-3xl dark:text-white font-medium focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all" 
                placeholder="prof@miage.dz"
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mobile</label>
              <input 
                className="w-full bg-slate-50 dark:bg-slate-800 border-none px-6 py-4 rounded-3xl dark:text-white font-medium focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all" 
                placeholder="06..."
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="flex gap-4 pt-6">
              <button onClick={() => setIsAdding(false)} className="flex-1 py-5 text-sm font-black text-slate-400 uppercase tracking-widest text-center">Retour</button>
              <button 
                onClick={() => { onAdd(formData); setIsAdding(false); }}
                className="flex-1 py-5 bg-indigo-600 text-white rounded-3xl font-black text-sm shadow-xl shadow-indigo-200 dark:shadow-none active:scale-95 transition-all"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Directory;
