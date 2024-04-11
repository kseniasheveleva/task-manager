import {
  PRIORITY_ICON,
  STATUS_BORDER_COLORS,
  TYPE_ICON,
} from "../../constants/task";
import { Component } from "../../core/Component";
import template from "./task-card.template.hbs";

export class TaskCard extends Component {
  constructor() {
    super();

    this.state = {
      title: this.getAttribute("title"),
      description: this.getAttribute("description"),
      status: this.getAttribute("status"),
      statusColor: STATUS_BORDER_COLORS[this.getAttribute("status")],
      priority: PRIORITY_ICON[this.getAttribute("priority")],
      type: TYPE_ICON[this.getAttribute("type")],
    };
    this.template = template();
  }
}

customElements.define("ui-task-card", TaskCard);