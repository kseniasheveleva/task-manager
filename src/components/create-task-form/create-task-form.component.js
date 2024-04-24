import { TASK_PRIORITY, TASK_TYPE } from "../../constants/task";
import { Component } from "../../core/Component";
import { fileReader } from "../../utils/fileReader";
import template from "./create-task-form.template.hbs";

export class CreateTaskForm extends Component {
  constructor() {
    super();
    this.state = {};
    this.template = template({ type: TASK_TYPE, priority: TASK_PRIORITY });
  }

  appendImage = (imgSrc) => {
    const preview = this.querySelector(".preview-block");
    const image = new Image();
    const imageBlock = document.createElement("div");
    imageBlock.classList.add("w-20", "h-20");
    image.src = imgSrc;
    imageBlock.append(image);
    preview.append(imageBlock);
  };

  loadImages = ({ target }) => {
    if (target.closest(".attachments")) {
      const files = Array.from(target.files).map((file) => fileReader(file));
      Promise.all(files).then((data) => {
        data.forEach(this.appendImage);
      });
    }
  };

  componentDidMount() {
    this.addEventListener("change", this.loadImages);
  }

  componentWillUnmount() {
    this.removeEventListener("change", this.loadImages);
  }
}

customElements.define("ui-create-task-form", CreateTaskForm);
