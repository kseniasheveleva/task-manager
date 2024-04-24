import { Component } from "../../core/Component";
import template from "./board.template.hbs";
import { useUserStore } from "../../hooks/useUserStore";
import { INITIAL_STATE } from "./initialState";
import { useNavigate } from "../../hooks/useNavigate";
import { ROUTES } from "../../constants/routes";
import { useModal } from "../../hooks/useModal";
import { extractFormData } from "../../utils/extractFormData";
import { storageService } from "../../services/Storage";
import { createTaskAPI, getAllTasksAPI, updateTaskAPI } from "../../api/tasks";
import { TASK_STATUSES } from "../../constants/task";
import { useToastNotification } from "../../hooks/useToastNotification";
import { mapResponseApiData } from "../../utils/api";
import { useDrawer } from "../../hooks/useDrawer";

export class BoardPage extends Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
    this.template = template();
  }

  initialization() {
    const { getUser } = useUserStore();
    this.setState({
      ...this.state,
      boardId: this.getAttribute("id"),
      user: getUser(),
    });
  }

  toggleIsLoading = () => {
    this.setState({
      ...this.state,
      isLoading: !this.state.isLoading,
    });
  };

  getAllTasks() {
    const { user, boardId } = this.state;
    if (user?.uid) {
      this.toggleIsLoading();

      getAllTasksAPI(user.uid, boardId)
        .then(({ data }) => {
          this.setState({
            ...this.state,
            columns: this.state.columns.map((column) => {
              return {
                ...column,
                tasks: mapResponseApiData(data).filter(
                  (item) => item.status === column.status
                ),
              };
            }),
          });
        })
        .catch(({ message }) => {
          useToastNotification({ message });
        })
        .finally(() => this.toggleIsLoading());
    }
  }

  uploadAttachments(attachments) {
     if (attachments.length === 0) {
      return Promise.resolve([]);
    }

    const { user, boardId } = this.state;
    const path = `${user.uid}/${boardId}`;
    const promiseFiles = attachments.map((attachment) => {
      return storageService.uploadFile(attachment, path);
    });

    return Promise.all(promiseFiles);
  }

  loadAttachmentsUrl(data) {
     if (data.length === 0) {
      return Promise.resolve([]);
    }
    return Promise.all(
      data.map((snapshot) => storageService.downloadURL(snapshot.ref))
    );
  }

  openCreateTaskModal = () => {
    useModal({
      isOpen: true,
      title: "Create Task",
      successCaption: "Create",
      template: "ui-create-task-form",
      onSuccess: (modal) => {
        const form = modal.querySelector(".create-task-form");
        const formData = new FormData(form);
        const preparedData = {
          ...extractFormData(form),
          attachments: formData
            .getAll("attachments")
            .filter((item) => item.name),
        };
        this.toggleIsLoading();
        this.uploadAttachments(preparedData.attachments)
          .then(this.loadAttachmentsUrl)
          .then((data) => {
            createTaskAPI({
              uid: this.state.user.uid,
              boardId: this.state.boardId,
              data: {
                ...preparedData,
                attachments: data,
                status: TASK_STATUSES.todo,
                createdAt: new Date(),
              },
            }).then(() => this.getAllTasks());
          })
          .catch(({ message }) => {
            useToastNotification({ message });
          })
          .finally(() => {
            this.toggleIsLoading();
          });
      },
    });
  };

  onClick = ({ target }) => {
    const goToDashboard = target.closest(".go-to-dashboard");
    const createTaskBtn = target.closest(".create-task-btn");
    const card = target.closest("ui-task-card");

    if (card) {
      const { user, boardId } = this.state
      const template = document.createElement("ticket-details")
      template.setAttribute("uid", user.uid)
      template.setAttribute("board-id", boardId)
      template.setAttribute("id", card.dataset.id)

      useDrawer({
        template: template,
        title: 'Ticket Detail'
      })
    }

    if (goToDashboard) {
      useNavigate(ROUTES.dashboard);
    }

    if (createTaskBtn) {
      this.openCreateTaskModal();
    }
  };

  changeTaskStatus = (taskId, status) => {
    this.toggleIsLoading();
    const { user, boardId } = this.state;
    updateTaskAPI({uid: user.uid, boardId, taskId, data: { status }})
    .then(() => {
      this.getAllTasks()
    })
    .catch(({ message }) => {
      useToastNotification({ message });
    })
    .finally(() => {
      this.toggleIsLoading();
    });
  }

  onDragStart = (evt) => {
    evt.dataTransfer.setData("text", evt.target.dataset.id)
  }
  onDragOver = (evt) => {
    evt.preventDefault();
    return false
  }
  onDragDrop = (evt) => {
    const taskId = evt.dataTransfer.getData("text")
    const currentColumn = evt.target.closest(".task-column")
    const status = currentColumn.dataset.column;
    this.changeTaskStatus(taskId, status)
  }

  componentDidMount() {
    this.initialization();
    this.getAllTasks();
    this.addEventListener("click", this.onClick);

    this.addEventListener('dragstart', this.onDragStart)
    this.addEventListener('dragover', this.onDragOver)
    this.addEventListener('drop', this.onDragDrop)
  }

  componentWillUnmount() {
    this.removeEventListener("click", this.onClick);
    this.removeEventListener('dragstart', this.onDragStart);
    this.removeEventListener('dragover', this.onDragOver);
    this.removeEventListener('drop', this.onDragDrop);
  }
}

customElements.define("board-page", BoardPage);
