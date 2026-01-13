
import React from 'react';

const HelpCenter: React.FC = () => {
  return (
    <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Intro Section */}
      <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-100 dark:shadow-none">
        <h3 className="text-2xl font-black mb-3 tracking-tight">Analyse IHM</h3>
        <p className="text-sm opacity-90 leading-relaxed font-medium">
          Ce prototype MIAGE a été conçu en suivant les critères ergonomiques de <strong>Bastien & Scapin</strong> et les heuristiques de <strong>Nielsen</strong> pour garantir une utilisabilité optimale.
        </p>
      </div>

      {/* 1. Guidage */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Critère : Guidage</h4>
        </div>
        <div className="grid gap-3">
          <TheoryCard 
            title="Incitation & Groupement" 
            desc="Les champs de saisie utilisent des 'placeholders' explicites. Les informations liées (nom/email/téléphone) sont regroupées visuellement dans des cartes distinctes."
          />
          <TheoryCard 
            title="Feedback Immédiat" 
            desc="Chaque action (ajout, suppression, mode sombre) déclenche un 'Toast' de confirmation ou une animation fluide pour valider l'action de l'utilisateur."
          />
        </div>
      </section>

      {/* 2. Charge de Travail */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          </div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Critère : Charge de Travail</h4>
        </div>
        <div className="grid gap-3">
          <TheoryCard 
            title="Brièveté & Densité" 
            desc="L'interface évite les menus profonds. La navigation 'Pill-bar' permet un accès en un clic à toutes les fonctionnalités majeures (Loi de Hick)."
          />
          <TheoryCard 
            title="Minimalisme (Nielsen)" 
            desc="Suppression des éléments décoratifs inutiles pour se concentrer sur les tâches (Ratio Signal/Bruit)."
          />
        </div>
      </section>

      {/* 3. Contrôle Utilisateur */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Critère : Contrôle Explicite</h4>
        </div>
        <div className="grid gap-3">
          <TheoryCard 
            title="Gestion des Erreurs" 
            desc="Les boutons de suppression critique déclenchent une boîte de dialogue de confirmation (Modal) avec une action d'annulation claire."
          />
          <TheoryCard 
            title="Liberté de l'utilisateur" 
            desc="L'utilisateur peut basculer entre les thèmes (Adaptabilité) et filtrer ses données librement à tout moment."
          />
        </div>
      </section>

      {/* Footer Info */}
      <div className="p-6 bg-slate-50 dark:bg-slate-800/30 rounded-4xl border border-slate-100 dark:border-slate-800 text-center">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Prototype validé MIAGE - HCI Labs</p>
      </div>
    </div>
  );
};

const TheoryCard: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
  <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm transition-all hover:border-indigo-200 dark:hover:border-indigo-900">
    <h5 className="font-black text-slate-900 dark:text-white text-sm mb-1">{title}</h5>
    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{desc}</p>
  </div>
);

export default HelpCenter;
