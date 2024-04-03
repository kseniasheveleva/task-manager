import { Component } from "../../core/Component";
import template from "./sign-in.template.hbs";
import { ROUTES } from "../../constants/routes";

export class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      errors: {
        email: "",
      },
      isLoading: false,
    };

    this.template = template({
      routes: ROUTES,
    });
  }
}

customElements.define("sign-in-page", SignIn);
