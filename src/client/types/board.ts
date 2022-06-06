export interface ITask {
  id: string;
  title: string;
  content: string;
  description: string;
  creation: string;
  expire: string;
  category: string;
  isDragDisabled: boolean;
  important: boolean;
}

export interface EditedTask {
  id: string;
  content: string;
  title: string;
  category: string;
  description: string;
}

export interface IBoardData {
  columns: {
    [key: string]: {
      id: string;
      title: string;
      taskIds: string[];
      isDragDisabled: boolean;
      isDropDisabled: boolean;
    };
  };
  tasks: ITask[];
  categories: string[];
  openedCategory: string;
  columnOrder: string[];
  loading: boolean;
  error: {
    msg: string;
    column?: string;
  };
  openedPortals: { [key: string]: string[] };
  currentPage: string;
  trashcan: ITask[];
}

export enum TasksActionsTypes {
  FETCH_TASKS = 'FETCH_TASKS',
  FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS',
  FETCH_TASKS_ERROR = 'FETCH_TASKS_ERROR',
  ADD_TASK = 'ADD_TASK',
  DELETE_TASK = 'DELETE_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
}

type FetchTasks = {
  type: TasksActionsTypes.FETCH_TASKS;
};

type FetchTasksSuccess = {
  type: TasksActionsTypes.FETCH_TASKS_SUCCESS;
  payload: ITask[];
};

type FetchTasksError = {
  type: TasksActionsTypes.FETCH_TASKS_ERROR;
  payload: string;
};

export type TasksActions = FetchTasks | FetchTasksSuccess | FetchTasksError;
