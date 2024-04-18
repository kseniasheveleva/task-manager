import { EVENT_TYPES } from "../../constants/eventTypes";
import { Component } from "../../core/Component";
import { eventEmitter } from "../../core/EventEmitter";
import { INITIAL_STATE } from "./constants";
import template from "./modal.template.hbs";

export class Modal extends Component {
  constructor() {
    super();

    this.template = template();
    this.state = INITIAL_STATE;
  }

  appendTemplate = (template) => {
    const tmp = document.createElement(template);
    console.log(tmp);
    const modalBody = this.querySelector(".modal-body")
    modalBody.append(tmp);
  };

  modalHandler = ({ detail }) => {
    this.setState({
      ...this.state,
      ...detail,
    });
    console.log(detail);
    if (detail.template) {
      this.appendTemplate(detail.template);
    }

    if (detail.successCaption === 'Delete') {
      this.setState({
        ...this.state,
        successBtnColor: "bg-red-500"
      })
    }

  };

  closeModal = () => {
    this.setState(INITIAL_STATE);
  };

  onSuccess = (evt) => {
    this.state.onSuccess(this);
    console.log('THIS', this);
    this.closeModal();
  };

  onClick = (evt) => {
    if (evt.target.closest(".modal-reject-trigger")) {
      this.closeModal();
    }
    if (evt.target.closest(".modal-success-trigger")) {
      this.onSuccess();
    }
  };

  componentDidMount() {
    eventEmitter.on(EVENT_TYPES.modal, this.modalHandler);
    this.addEventListener("click", this.onClick);
  }

  componentWillUnmount() {
    eventEmitter.off(EVENT_TYPES.modal, this.modalHandler);
    this.removeEventListener("click", this.onClick);
  }
}

customElements.define("ui-modal", Modal);
