import { STATUS_BORDER_COLORS, TASK_STATUSES } from "../../constants/task";

export const INITIAL_STATE = {
  boardId: null,
  user: null,
  isLoading: false,
  columns: Object.keys(TASK_STATUSES).map((key) => {
    const status = TASK_STATUSES[key];
    return {
      color: STATUS_BORDER_COLORS[status],
      status,
      tasks: [],
    };
  }),
};