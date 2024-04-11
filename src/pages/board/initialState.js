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
      tasks: [
        {
          attachments: [
            "https://firebasestorage.googleapis.com/v0/b/task-manager-3a339.appspot.com/o/-NrpPcAXv5b9RaEM24CR%2Fattachments%2FScreenshot%202024-02-29%20at%205.53.43%E2%80%AFPM.png?alt=media&token=5b35242b-3936-4537-a2c0-891087ad3481",
          ],
          createdAt: "2024-02-29T15:10:33.534Z",
          description: "asdasd",
          id: "-NrpPgoElnhEM74N5Wzb",
          priority: "major",
          status: status,
          title: "Task #1",
          type: "improvement",
        },
      ],
    };
  }),
};