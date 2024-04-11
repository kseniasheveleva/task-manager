import { Component } from "../../core/Component";
import template from "./board.template.hbs";
import { useUserStore } from "../../hooks/useUserStore";
import { INITIAL_STATE } from "./initialState";

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

  componentDidMount() {
    this.initialization();
  }
}

customElements.define("board-page", BoardPage);