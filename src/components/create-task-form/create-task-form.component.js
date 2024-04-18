import { TASK_PRIORITY, TASK_TYPE } from "../../constants/task";
import { Component } from "../../core/Component";
import template from "./create-task-form.template.hbs";

export class CreateTaskForm extends Component {
  constructor() {
    super();

    this.state = {};
    this.template = template({ type: TASK_TYPE, priority: TASK_PRIORITY });
  }
}

customElements.define("ui-create-task-form", CreateTaskForm);