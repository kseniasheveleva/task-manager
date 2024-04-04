import { ROUTES } from "../../constants/routes";
import { TOAST_TYPE } from "../../constants/toast";
import { Component } from "../../core/Component";
import { useNavigate } from "../../hooks/useNavigate";
import { useToastNotification } from "../../hooks/useToastNotification";
import { useUserStore } from "../../hooks/useUserStore";
import { apiService } from "../../services/Api";
import { authService } from "../../services/Auth";
import template from "./dashboard.template.hbs";

export class Dashboard extends Component {
  constructor() {
    super();

    this.template = template();
    this.state = {
      isLoading: false,
      user: null,
      boards: [],
    }
  }

  toggleIsLoading = () => {
    this.setState({
      ...this.state,
      isLoading: !this.state.isLoading,
    });
  };

  setUser() {
    const { getUser } = useUserStore();
    this.setState({
      ...this.state,
      user: getUser(),
    })
  }

  logUserOut() {
    const { setUser } = useUserStore();
    authService.logOut()
    .then(() => {
      setUser(null);
      useToastNotification({ type: TOAST_TYPE.success, message: 'Success!' })
      useNavigate(ROUTES.home)
    })
    .catch((error) => {
      useToastNotification({ message: error.message })
    })
  }

  openCreateBoardModal() {}

  openDeleteBoardModel() {}

  get() {}

  onClick = ({ target }) => {
    if (target.closest('.create-board')) {this.openCreateBoardModal()}
    if (target.closest('.delete-board')) {this.openDeleteBoardModel()}
    if (target.closest('.logout-btn')) {this.logOut()}
  }

  componentDidMount() {
    this.setUser();
    this.addEventListener('click', this.onClick);
  }

  componentWillUnmount() {
    this.removeEventListener('click', this.onClick);
  }
}

customElements.define("dashboard-page", Dashboard);
