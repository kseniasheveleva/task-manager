import { Component } from "../../core/Component";
import template from "./board.template.hbs";
import { useUserStore } from "../../hooks/useUserStore";
import { INITIAL_STATE } from "./initialState";
import { ROUTES } from "../../constants/routes";
import { useNavigate } from "../../hooks/useNavigate";
import { useModal } from "../../hooks/useModal";
import { extractFormData } from "../../utils/extractFormData";
import { storageService } from "../../services/Storage";
import { createTaskApi, getTasksApi } from "../../api/tasks";
import { TASK_STATUSES } from "../../constants/task";
import { mapResponseApiData } from "../../utils/api";



export class BoardPage extends Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
    this.template = template();
  }

  toggleIsLoading = () => {
    this.setState({
      ...this.state,
      isLoading: !this.state.isLoading,
    });
  };

  initialization() {
    const { getUser } = useUserStore();
    this.setState({
      ...this.state,
      boardId: this.getAttribute("id"),
      user: getUser(),
    });
  }

  

  uploadAttachments(attachments) {
    const { boardId, user } = this.state;
    const path = `${user.uid}/${boardId}`;
    const promiseFiles = attachments.map((attachment) => {
      return storageService.uploadFile(attachment, path)
    })

    return Promise.all(promiseFiles);
  }

  loadAttachmentsUrl(data) {
    return Promise.all(
      data.map((snapshot) => storageService.downloadURL(snapshot.ref))
    )
  }

  loadAllTasks() {
    const { user, boardId } = INITIAL_STATE
    if (user?.uid) {
      this.toggleIsLoading();
      getTasksApi(user.uid, boardId).then(({data}) => {
        this.setState({
          ...this.state,
          columns: this.state.columns.map((column) => {
            return {
              ...this.state.columns,
              tasks: mapResponseApiData(data).filter((task) => task.status === column.status)
            }
          })
        })
      })
      .catch(({ message }) => {
          useToastNotification({ message });
        })
      .finally(() => {
        this.toggleIsLoading();
      });
    }
  }

  onClick = ({ target }) => {
    const backBtn = target.closest(".go-to-dashboard");
    const createTaskBtn = target.closest(".create-task-btn");

    if (backBtn) {
      useNavigate(ROUTES.dashboard)
    }

    if (createTaskBtn) {
      useModal({
        isOpen: true,
        title: "Create Task",
        successCaption: "Create",
        template: "ui-create-task-form",
        onSuccess: (modal) => {
          const form = modal.querySelector('.create-task-form');
          const formData = new FormData(form);
          const prepareData = {
            ...extractFormData(form),
            attachments: formData.getAll("attachments") ?? []
          }

          this.uploadAttachments(prepareData.attachments).then(this.loadAttachmentsUrl)
          .then((data) => {
            createTaskApi({
              id: this.state.user.uid,
              boardId: this.state.boardId,
              data: {
                ...prepareData,
                attachments: data,
                status: TASK_STATUSES.todo,
                createdAt: new Date()
              },
            }).then(() => this.loadAllTasks())
          })
        }
      })
    }
  }

  componentDidMount() {
    this.initialization();
    this.loadAllTasks();
    this.addEventListener("click", this.onClick)
  }
}

customElements.define("board-page", BoardPage);