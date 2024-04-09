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

  openCreateBoardModal() {
    useModal({ 
      isOpen: true,
      template: "ui-create-board-form",
      onSuccess: (modal) => {
        const formData = extractFormData(modal.querySelector('.create-board-form'))
        console.log(formData);
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
    this.addEventListener("click", this.onClick);
  }

  componentWillUnmount() {
    this.removeEventListener("click", this.onClick);
  }
}

customElements.define("dashboard-page", Dashboard);
