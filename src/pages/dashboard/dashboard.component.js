import { Component } from "../../core/Component";
import template from "./dashboard.template.hbs";
import { apiService } from "../../services/Api";
import { mapResponseApiData } from "../../utils/api";
import { useUserStore } from "../../hooks/useUserStore";
import { authService } from "../../services/Auth";
import { useToastNotification } from "../../hooks/useToastNotification";
import { TOAST_TYPE } from "../../constants/toast";
import { useNavigate } from "../../hooks/useNavigate";
import { ROUTES } from "../../constants/routes";
import { store } from "../../store/Store";
import { useModal } from "../../hooks/useModal";
import { extractFormData } from "../../utils/extractFormData";
import { createBoardApi, deleteBoardApi, getBoardsApi } from "../../api/boards";

export class Dashboard extends Component {
  constructor() {
    super();

    this.template = template();

    this.state = {
      isLoading: false,
      user: null,
      boards: [],
    };
  }

  toggleIsLoading = () => {
    this.setState({
      ...this.state,
      isLoading: !this.state.isLoading,
    });
  };

  loadAllBoards = () => {
    if (this.state.user?.uid) {
      this.toggleIsLoading();
      getBoardsApi(this.state.user.uid)
        .then(({ data }) => {
          this.setState({
            ...this.state,
            boards: data ? mapResponseApiData(data) : [],
          });
        })
        .catch(({ message }) => {
          useToastNotification({ message });
        })
        .finally(() => {
          this.toggleIsLoading();
        });
    }
  };

  openCreateBoardModal() {
    useModal({
      isOpen: true,
      template: "ui-create-board-form",
      data: {
        title: "Board #1",
        description: "Some Description",
      },
      onSuccess: (modal) => {
        const form = modal.querySelector(".create-board-form");
        const formData = extractFormData(form);
        this.toggleIsLoading();
        createBoardApi(this.state.user.uid, formData)
          .then(({ data }) => {
            useNavigate(`${ROUTES.board}/${data.name}`);
            useToastNotification({
              message: "Success!",
              type: TOAST_TYPE.success,
            });
          })
          .catch(({ message }) => {
            useToastNotification({ message });
          })
          .finally(() => {
            this.toggleIsLoading();
          });
      },
    });
  }

  openDeleteBoardModal({ id, title }) {
    useModal({
      isOpen: true,
      confirmation: `Do you really want to delete "${title}"`,
      successCaption: "Delete",
      onSuccess: () => {
        this.toggleIsLoading();
        deleteBoardApi(this.state.user.uid, id)
          .then(() => {
            this.loadAllBoards();
            useToastNotification({
              message: `Board "${title}" was deleted`,
              type: TOAST_TYPE.success,
            });
          })
          .catch(({ message }) => {
            useToastNotification({ message });
          })
          .finally(() => {
            this.toggleIsLoading();
          });
      },
      // onSuccess: async () => {
      //   this.toggleIsLoading();
      //   try {
      //     await deleteBoardApi(this.state.user.uid, id);
      //     await this.loadAllBoards();
      //     useToastNotification({
      //       message: "Success!",
      //       type: TOAST_TYPE.success,
      //     });
      //   } catch ({ message }) {
      //     useToastNotification({ message });
      //   } finally {
      //     this.toggleIsLoading();
      //   }
      // },
    });
  }

  logout = () => {
    this.toggleIsLoading();
    const { setUser } = useUserStore();
    authService
      .logOut()
      .then(() => {
        setUser(null);
        useToastNotification({ type: TOAST_TYPE.success, message: "Success!" });
        useNavigate(ROUTES.signIn);
      })
      .catch(({ message }) => {
        useToastNotification({ message });
      })
      .finally(() => {
        this.toggleIsLoading();
      });
  };

  onClick = ({ target }) => {
    const boardItem = target.closest(".board-item");
    const logoutBtn = target.closest(".logout-btn");
    const createBoardBtn = target.closest(".create-board");
    const deleteBoardBtn = target.closest(".delete-board");

    if (deleteBoardBtn) {
      return this.openDeleteBoardModal({
        id: deleteBoardBtn.dataset.id,
        title: deleteBoardBtn.dataset.title,
      });
    }

    if (createBoardBtn) {
      return this.openCreateBoardModal();
    }

    if (logoutBtn) {
      return this.logout();
    }

    if (boardItem) {
      return useNavigate(`${ROUTES.board}/${boardItem.dataset.id}`);
    }
  };

  setUser() {
    const { getUser } = useUserStore();
    this.setState({
      ...this.state,
      user: getUser(),
    });
  }

  componentDidMount() {
    this.setUser();
    this.loadAllBoards();
    this.addEventListener("click", this.onClick);
  }

  componentWillUnmount() {
    this.removeEventListener("click", this.onClick);
  }
}

customElements.define("dashboard-page", Dashboard);
