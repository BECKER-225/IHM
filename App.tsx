
import React, { useState, useEffect, useRef } from 'react';
import { AppScreen, Task, Contact } from './types';
import TaskList from './components/TaskList';
import Directory from './components/Directory';
import HelpCenter from './components/HelpCenter';
import Navigation from './components/Navigation';
import Header from './components/Header';
import FeedbackToast from './components/FeedbackToast';
import Settings from './components/Settings';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.TASKS);
  
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('miage-dark-mode');
    return saved === 'true';
  });

  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Réviser le cours IHM', completed: false, priority: 'high' },
    { id: '2', title: 'Faire la maquette papier', completed: true, priority: 'medium' },
  ]);
  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', name: 'Dr. Chahrazed Rouabhia', email: 'prof@miage.dz', phone: '0123456789' },
    { id: '2', name: 'Secrétariat MIAGE', email: 'secretariat@univ.dz', phone: '0987654321' },
  ]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Réf pour éviter les notifications répétitives sur les mêmes tâches
  const notifiedTasksRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('miage-dark-mode', darkMode.toString());
  }, [darkMode]);

  // Surveillance des tâches urgentes pour notification
  useEffect(() => {
    if (!("Notification" in window) || Notification.permission !== "granted") return;

    const urgentTasks = tasks.filter(t => t.priority === 'high' && !t.completed);
    
    urgentTasks.forEach(task => {
      if (!notifiedTasksRef.current.has(task.id)) {
        new Notification("Tâche Urgente MIAGE", {
          body: `N'oubliez pas : ${task.title}`,
          icon: 'https://cdn-icons-png.flaticon.com/512/1792/1792931.png'
        });
        notifiedTasksRef.current.add(task.id);
      }
    });

    // Nettoyage de la réf si une tâche n'est plus urgente ou supprimée
    const currentTaskIds = new Set(tasks.map(t => t.id));
    notifiedTasksRef.current.forEach(id => {
      if (!currentTaskIds.has(id)) notifiedTasksRef.current.delete(id);
    });
  }, [tasks]);

  const showFeedback = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddTask = (title: string, priority: Task['priority'] = 'medium') => {
    const newTask: Task = { 
      id: Date.now().toString(), 
      title, 
      completed: false, 
      priority 
    };
    setTasks([newTask, ...tasks]);
    showFeedback('Tâche ajoutée');
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
    showFeedback('Tâche supprimée');
  };

  const handleUpdatePriority = (id: string, priority: Task['priority']) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, priority } : t));
    showFeedback('Priorité mise à jour');
  };

  const handleClearCompleted = () => {
    setTasks(tasks.filter(t => !t.completed));
    showFeedback('Tâches terminées effacées');
  };

  const handleAddContact = (contact: Omit<Contact, 'id'>) => {
    const newContact = { ...contact, id: Date.now().toString() };
    setContacts([...contacts, newContact]);
    showFeedback('Contact enregistré');
  };

  const handleRequestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      showFeedback("Notifications non supportées");
      return;
    }
    
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      showFeedback("Notifications activées !");
    } else {
      showFeedback("Permission refusée");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black flex items-center justify-center p-0 sm:p-4 transition-colors duration-500">
      <div className="flex flex-col h-[100dvh] sm:h-[800px] w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl relative overflow-hidden sm:rounded-3xl border border-gray-200 dark:border-gray-800 transition-colors duration-300">
        
        <Header 
          title={
            currentScreen === AppScreen.TASKS ? "Mes Tâches" : 
            currentScreen === AppScreen.DIRECTORY ? "Annuaire" : 
            currentScreen === AppScreen.SETTINGS ? "Paramètres" : "Aide"
          } 
        />

        <main className="flex-1 p-5 pb-24 overflow-y-auto bg-white dark:bg-gray-900 transition-colors duration-300">
          {currentScreen === AppScreen.TASKS && (
            <TaskList 
              tasks={tasks} 
              onToggle={(id) => setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))} 
              onDelete={handleDeleteTask} 
              onAdd={handleAddTask}
              onUpdatePriority={handleUpdatePriority}
              onClearCompleted={handleClearCompleted}
            />
          )}
          {currentScreen === AppScreen.DIRECTORY && (
            <Directory contacts={contacts} onAdd={handleAddContact} />
          )}
          {currentScreen === AppScreen.SETTINGS && (
            <Settings 
              darkMode={darkMode} 
              setDarkMode={setDarkMode} 
              onRequestNotifications={handleRequestNotificationPermission}
            />
          )}
          {currentScreen === AppScreen.HELP && (
            <HelpCenter />
          )}
        </main>

        <Navigation activeScreen={currentScreen} onNavigate={setCurrentScreen} />

        {toastMessage && <FeedbackToast message={toastMessage} />}
      </div>
    </div>
  );
};

export default App;
