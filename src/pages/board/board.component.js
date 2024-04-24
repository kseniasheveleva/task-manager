import { Component } from "../../core/Component";
import template from "./board.template.hbs";
import { useUserStore } from "../../hooks/useUserStore";
import { INITIAL_STATE } from "./initialState";
import { useNavigate } from "../../hooks/useNavigate";
import { ROUTES } from "../../constants/routes";
import { useModal } from "../../hooks/useModal";
import { extractFormData } from "../../utils/extractFormData";
import { storageService } from "../../services/Storage";
import { createTaskAPI, getAllTasksAPI } from "../../api/tasks";
import { TASK_STATUSES } from "../../constants/task";
import { useToastNotification } from "../../hooks/useToastNotification";
import { mapResponseApiData } from "../../utils/api";

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
    const { user, boardId } = this.state;
    const path = `${user.uid}/${boardId}`;
    const promiseFiles = attachments.map((attachment) => {
      return storageService.uploadFile(attachment, path);
    });

    return Promise.all(promiseFiles);
  }

  loadAttachmentsUrl(data) {
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
          attachments: formData.getAll("attachments"),
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

    if (goToDashboard) {
      useNavigate(ROUTES.dashboard);
    }

    if (createTaskBtn) {
      this.openCreateTaskModal();
    }
  };

  componentDidMount() {
    this.initialization();
    this.getAllTasks();
    this.addEventListener("click", this.onClick);
  }
}

customElements.define("board-page", BoardPage);
