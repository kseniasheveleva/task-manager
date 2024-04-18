import { Component } from "../../core/Component";
import template from "./board.template.hbs";
import { useUserStore } from "../../hooks/useUserStore";
import { INITIAL_STATE } from "./initialState";
import { ROUTES } from "../../constants/routes";
import { useNavigate } from "../../hooks/useNavigate";
import { useModal } from "../../hooks/useModal";


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
        onSuccess: () => {

        }
      })
    }
  }

  componentDidMount() {
    this.initialization();
    this.addEventListener("click", this.onClick)
  }
}

customElements.define("board-page", BoardPage);