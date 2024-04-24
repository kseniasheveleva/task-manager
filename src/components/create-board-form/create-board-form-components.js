import { Component } from "../../core/Component";
import { eventEmitter } from "../../core/EventEmitter";
import template from "./create-board-form.template.hbs";

export class CreateBoardForm extends Component {
  constructor() {
    super();
    this.state = {
      error: {
        name: "",
        description: "",
      },
    };
    this.template = template();
  }

  validator = ({ target }) => {
    if (target.value === "") {
      this.setState({
        ...this.state,
        error: {
          ...this.state.error,
          [target.name]: "empty",
        },
      });
      eventEmitter.emit("form:error", {
        error: {
          ...this.state.error,
          [target.name]: "empty",
        },
      });
    }
  };

  initForm() {
    this.setState({
      ...this.state,
      title: this.getAttribute("title"),
      description: this.getAttribute("description"),
    });
  }

  componentDidMount() {
    this.initForm();
    this.addEventListener("change", this.validator);
  }

  componentWillUnmount() {
    this.removeEventListener("change", this.validator);
  }
}

customElements.define("ui-create-board-form", CreateBoardForm);
