
import React from 'react';

interface SettingsProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onRequestNotifications: () => void;
}

const Settings: React.FC<SettingsProps> = ({ darkMode, setDarkMode, onRequestNotifications }) => {
  const hasNotificationSupport = "Notification" in window;
  const notificationStatus = hasNotificationSupport ? Notification.permission : 'unsupported';

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section className="space-y-4">
        <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-2">Expérience</h3>
        
        {/* Mode Sombre */}
        <div 
          onClick={() => setDarkMode(!darkMode)}
          className="group cursor-pointer bg-white dark:bg-slate-800/50 p-6 flex items-center justify-between border border-white dark:border-slate-800 rounded-5xl shadow-sm hover:shadow-xl transition-all duration-500"
        >
          <div className="flex items-center gap-5">
            <div className={`w-14 h-14 rounded-3xl flex items-center justify-center transition-all duration-500 ${darkMode ? 'bg-indigo-500/20 text-indigo-400 rotate-12' : 'bg-amber-100 text-amber-600 hover:rotate-12'}`}>
              {darkMode ? (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              ) : (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              )}
            </div>
            <div>
              <p className="font-black text-slate-900 dark:text-white text-lg leading-tight">Look & Feel</p>
              <p className="text-xs font-medium text-slate-400">Mode {darkMode ? 'Sombre' : 'Clair'}</p>
            </div>
          </div>
          <div className={`w-14 h-8 rounded-full relative transition-all duration-500 p-1 ${darkMode ? 'bg-indigo-600' : 'bg-slate-200'}`}>
            <div className={`w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-500 transform ${darkMode ? 'translate-x-6' : 'translate-x-0'}`} />
          </div>
        </div>

        {/* Notifications */}
        <div 
          onClick={onRequestNotifications}
          className="group cursor-pointer bg-white dark:bg-slate-800/50 p-6 flex items-center justify-between border border-white dark:border-slate-800 rounded-5xl shadow-sm hover:shadow-xl transition-all duration-500"
        >
          <div className="flex items-center gap-5">
            <div className={`w-14 h-14 rounded-3xl flex items-center justify-center transition-all duration-500 ${notificationStatus === 'granted' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </div>
            <div>
              <p className="font-black text-slate-900 dark:text-white text-lg leading-tight">Rappels Urgents</p>
              <p className="text-xs font-medium text-slate-400">
                {notificationStatus === 'granted' ? 'Activés' : notificationStatus === 'denied' ? 'Bloqués par le navigateur' : 'Cliquez pour activer'}
              </p>
            </div>
          </div>
          <div className="text-indigo-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-2">Informations</h3>
        <div className="bg-white dark:bg-slate-800/50 rounded-5xl border border-white dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 flex justify-between items-center border-b border-slate-50 dark:border-slate-800">
            <div>
              <span className="block text-sm font-black text-slate-900 dark:text-white">Build IHM</span>
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Version L2 MIAGE 2024</span>
            </div>
            <span className="px-3 py-1.5 bg-slate-50 dark:bg-slate-900 text-slate-400 rounded-xl text-[10px] font-black uppercase">2.6.0-NOTIF</span>
          </div>
          <div className="p-6 flex justify-between items-center">
            <span className="text-sm font-black text-slate-900 dark:text-white">Auteur</span>
            <span className="text-sm font-black text-indigo-600">Étudiant MIAGE</span>
          </div>
        </div>
      </section>

      <div className="bg-indigo-600 p-8 rounded-[3rem] text-white shadow-2xl shadow-indigo-200 dark:shadow-none space-y-4 relative overflow-hidden group">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full transition-transform group-hover:scale-150 duration-700" />
        <p className="text-[11px] font-black uppercase tracking-[0.2em] opacity-60">Ergonomie logicielle</p>
        <p className="text-lg font-bold leading-tight">Les rappels automatiques améliorent la performance de l'utilisateur.</p>
        <p className="text-[10px] font-medium opacity-50 italic">Utilise l'API Notification Native.</p>
      </div>
    </div>
  );
};

export default Settings;
