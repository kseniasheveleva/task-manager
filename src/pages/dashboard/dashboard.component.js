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
import { eventEmitter } from "../../core/EventEmitter";
import { EVENT_TYPES } from "../../constants/eventTypes";
import { useModal } from "../../hooks/useModal";
import { extractFormData } from "../../utils/extractFormData";
import { createBoardApi, getBoardsApi } from "../../api/boards";

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
        console.log("DATA",data);
        this.setState({
          ...this.state,
          boards: mapResponseApiData(data),
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
      onSuccess: (modal) => {
        const formData = extractFormData(modal.querySelector('.create-board-form'))
        console.log(formData);
        console.log(this.state);
        this.toggleIsLoading()
        createBoardApi(this.state.user.uid, formData).then(({ data}) => {
          useNavigate(`${ROUTES.board}/${data.name}`);
          useToastNotification({  message: "Success", type: TOAST_TYPE.success})
        })
        .catch(({ message }) => {
          useToastNotification({ message })
        })
        .finally(() => {
          this.toggleIsLoading()
        })
      } 
    })
  }

  openDeleteBoardModal() {
    
  }

  get() {}

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
    if (target.closest(".create-board")) {
      this.openCreateBoardModal();
    }

    if (target.closest(".delete-board")) {
      this.openDeleteBoardModal();
    }

    if (target.closest(".logout-btn")) {
      this.logout();
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
