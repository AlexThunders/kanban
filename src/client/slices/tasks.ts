import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IColumn } from '../containers/Board/Column';
import { IBoardData, ITask, EditedTask } from '../types/board';

export const initialState: IBoardData = {
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Tasks',
      taskIds: [],
      isDragDisabled: false,
      isDropDisabled: false,
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: [],
      isDragDisabled: false,
      isDropDisabled: false,
    },
    'column-3': {
      id: 'column-3',
      title: 'Testing',
      taskIds: [],
      isDragDisabled: false,
      isDropDisabled: false,
    },
    'column-4': {
      id: 'column-4',
      title: 'Done',
      taskIds: [],
      isDragDisabled: false,
      isDropDisabled: false,
    },
  },
  tasks: [],
  categories: ['All', 'JavaScript', 'React', 'Web'],
  openedCategory: 'All',
  columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
  loading: false,
  error: {
    msg: '',
  },
  openedPortals: {
    openedColumnPortal: [],
    openedTaskPortal: [],
    openedAddTaskPortal: [],
  },
  currentPage: 'board',
  trashcan: [],
};

const getLocalData = (): IBoardData => {
  const local = localStorage.getItem('board');
  return local ? JSON.parse(local) : initialState;
};

const boardSlice = createSlice({
  name: 'tasks',
  initialState: getLocalData(),
  reducers: {
    addTask: (state, { payload }: PayloadAction<ITask>) => {
      state.tasks.push(payload);
      state.columns['column-1'].taskIds.push(payload.id);
      state.error.msg = '';
    },

    editTask: (state, { payload }: PayloadAction<EditedTask>) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === payload.id) {
          task.content = payload.content;
          task.title = payload.title;
          task.category = payload.category;
          task.description = payload.description;
        }
        return task;
      });
    },

    deleteTask: (
      state,
      { payload }: PayloadAction<{ id: string; column: string }>
    ) => {
      state.trashcan.push(
        state.tasks.filter((task) => task.id === payload.id)[0]
      );
      state.tasks = state.tasks.filter((task) => task.id !== payload.id);
      state.columns[payload.column].taskIds = state.columns[
        payload.column
      ].taskIds.filter((id) => id !== payload.id);
    },

    disableTask: (
      state,
      { payload }: PayloadAction<{ id: string; val: boolean }>
    ) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === payload.id) {
          task.isDragDisabled = payload.val;
        }
        return task;
      });
    },

    clearTrashcan: (state) => {
      state.trashcan = [];
    },

    updateTasksOrder: (
      state,
      { payload }: PayloadAction<{ [key: string]: IColumn }>
    ) => {
      state.columns = payload;
    },

    updateColumnOrder: (state, { payload }: PayloadAction<string[]>) => {
      state.columnOrder = payload;
    },

    showCategory: (state, { payload }: PayloadAction<string>) => {
      state.openedCategory = payload;
    },

    clearColumn: (state, { payload }: PayloadAction<string>) => {
      state.columns[payload].taskIds.forEach((id) => {
        state.trashcan = state.trashcan.concat(
          state.tasks.filter((task) => task.id === id)
        );
        state.tasks = state.tasks.filter((task) => task.id !== id);
      });
      state.columns[payload].taskIds = [];
    },

    openPortal: (
      state,
      { payload }: PayloadAction<{ portalTitle: string; portalType: string }>
    ) => {
      switch (payload.portalType) {
        case 'add-task-menu':
          if (
            Object.values(state.openedPortals).every(
              (portal) => portal.length === 0
            )
          ) {
            state.openedPortals.openedAddTaskPortal.push(payload.portalTitle);
          }
          break;

        case 'column-menu':
          if (
            Object.values(state.openedPortals).every(
              (portal) => portal.length === 0
            )
          ) {
            state.openedPortals.openedColumnPortal.push(payload.portalTitle);
          }
          break;

        case 'task-menu':
          if (
            Object.values(state.openedPortals).every(
              (portal) => portal.length === 0
            )
          ) {
            state.openedPortals.openedTaskPortal.push(payload.portalTitle);
          }
          break;

        default:
          Object.values(state.openedPortals).map((portal) => {
            portal = [];
            return portal;
          });
      }
    },

    closePortal: (state, { payload }: PayloadAction<string>) => {
      switch (payload) {
        case 'add-task-menu':
          state.openedPortals.openedAddTaskPortal = [];
          break;
        case 'column-menu':
          state.openedPortals.openedColumnPortal = [];
          break;
        case 'task-menu':
          state.openedPortals.openedTaskPortal = [];
          break;
        default:
          Object.values(state.openedPortals).map((portal) => {
            portal = [];
            return portal;
          });
      }
    },

    addCategory: (state, { payload }: PayloadAction<string>) => {
      state.categories.push(payload);
    },

    deleteCategory: (state, { payload }: PayloadAction<string>) => {
      state.categories = state.categories.filter(
        (category) => category !== payload
      );
    },

    setCurrentPage: (state, { payload }: PayloadAction<string>) => {
      state.currentPage = payload;
    },

    toggleColumnDrag: (state, { payload }: PayloadAction<string>) => {
      state.columns[payload].isDragDisabled =
        !state.columns[payload].isDragDisabled;
    },

    renameColumn: (
      state,
      { payload }: PayloadAction<{ column: string; newTitle: string }>
    ) => {
      state.columns[payload.column].title = payload.newTitle;
    },

    toggleProhibitDropTasksToColumn: (
      state,
      { payload }: PayloadAction<string>
    ) => {
      state.columns[payload].isDropDisabled =
        !state.columns[payload].isDropDisabled;
    },

    throwError: (
      state,
      { payload }: PayloadAction<{ msg: string; column?: string }>
    ) => {
      state.error.msg = payload.msg;
      state.error.column = payload.column;
    },

    clearAllData: (state) => {
      state.trashcan = state.tasks;
      state.tasks = [];
      Object.values(state.columns).forEach((column) => (column.taskIds = []));
    },
  },
});

export const {
  addTask,
  updateTasksOrder,
  updateColumnOrder,
  showCategory,
  deleteTask,
  editTask,
  disableTask,
  clearColumn,
  openPortal,
  closePortal,
  addCategory,
  deleteCategory,
  setCurrentPage,
  clearTrashcan,
  toggleColumnDrag,
  renameColumn,
  toggleProhibitDropTasksToColumn,
  throwError,
  clearAllData,
} = boardSlice.actions;

export default boardSlice.reducer;
