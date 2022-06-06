import { Folder, TaskStatus } from './enums';

export const iconColor = 'rgba(255, 255, 255, 0.25)';

export const appSideBarMap: Record<TaskStatus, string> = {
  [TaskStatus.BACKLOG]: 'Backlog',
  [TaskStatus.IN_PROGRESS]: 'In progress',
  [TaskStatus.TESTING]: 'Testing',
  [TaskStatus.DONE]: 'Completed tasks',
  [TaskStatus.CANCELED]: 'Canceled',
};

export const folderMap: Record<Folder, string> = {
  [Folder.ALL]: 'All tasks',
  [Folder.CATEGORIES]: 'Categories',
  [Folder.IMPORTANT]: 'Important',
  [Folder.TRASH]: 'Trash',
};
