import { getAllTaskByIdAPI, getTaskAPI } from "../../api/tasks";
import { Component } from "../../core/Component";
import template from "./ticket-details.template.hbs"

export class ticketDetails extends Component {
    constructor() {
        super();


        this.template = template()
        this.state = {
            isLoading: false,
            data: {}
        };
    }

      toggleIsLoading = () => {
        this.setState({
            ...this.state,
            isLoading: !this.state.isLoading,
        });
    };

    loadTicketDetails() {
    this.toggleIsLoading();
    const taskId = this.getAttribute("id");
    const boardId = this.getAttribute("board-id");
    const uid = this.getAttribute("uid");

    getAllTaskByIdAPI({ uid, taskId, boardId })
      .then(({ data }) => {
        this.setState({
          ...this.state,
          data,
        });
      })
      .catch(({ message }) => {
        useToastNotification({ message });
      })
      .finally(() => {
        this.toggleIsLoading();
      });
  }

  componentDidMount() {
    this.loadTicketDetails();
  }
}


customElements.define("ticket-details", ticketDetails)