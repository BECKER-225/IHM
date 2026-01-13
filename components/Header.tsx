
import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="p-8 pb-4 space-y-2">
      <div className="flex justify-between items-center">
        <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
          MIAGE Prototype
        </span>
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none transition-transform hover:rotate-12">
          <span className="text-white text-xs font-black">L2</span>
        </div>
      </div>
      <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
        {title}
      </h1>
    </header>
  );
};

export default Header;