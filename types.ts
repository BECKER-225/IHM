
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export enum AppScreen {
  TASKS = 'TASKS',
  DIRECTORY = 'DIRECTORY',
  SETTINGS = 'SETTINGS',
  HELP = 'HELP'
}
