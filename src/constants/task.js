export const TASK_STATUSES = {
  todo: "todo",
  inDevelopment: "in Development",
  developmentDone: "development Done",
  readyForTesting: "ready For Testing",
  inTesting: "in testing",
  testingDone: "testing Done",
  closed: "closed",
};

export const STATUS_BORDER_COLORS = {
  [TASK_STATUSES.todo]: "todo-border-color",
  [TASK_STATUSES.inDevelopment]: "in-development-border-color",
  [TASK_STATUSES.developmentDone]: "development-done-border-color",
  [TASK_STATUSES.readyForTesting]: "ready-for-testing-border-color",
  [TASK_STATUSES.inTesting]: "ready-for-testing-border-color",
  [TASK_STATUSES.testingDone]: "testing-done-border-color",
  [TASK_STATUSES.closed]: "closed-border-color",
};

export const TASK_PRIORITY = {
  major: "major",
  minor: "minor",
  trivial: "trivial",
};

export const TASK_TYPE = {
  improvement: "improvement",
  bug: "bug",
  task: "task",
};

export const PRIORITY_ICON = {
  [TASK_PRIORITY.major]: {
    icon: "icon-chevrons-up",
    color: "major-icon-color",
  },
  [TASK_PRIORITY.minor]: {
    icon: "icon-chevrons-down",
    color: "major-minor-color",
  },
  [TASK_PRIORITY.trivial]: {
    icon: "icon-circle",
    color: "trivial-icon-color",
  },
};

export const TYPE_ICON = {
  [TASK_TYPE.improvement]: {
    icon: "icon-wrench",
    color: "improvement-icon-color",
  },
  [TASK_TYPE.bug]: {
    icon: "icon-bug",
    color: "bug-icon-color ",
  },
  [TASK_TYPE.task]: {
    icon: "icon-album",
    color: "task-icon-color",
  },
};
