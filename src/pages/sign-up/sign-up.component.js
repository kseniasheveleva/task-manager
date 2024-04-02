import { Component } from "../../core/Component";
import template from "./sign-up.template.hbs";
import { ROUTES } from "../../constants/routes";
import { extractFormData } from "./extractFormData";
import { authService } from "../../services/Auth";
import { TOAST_TYPE } from "../../constants/toast";
import { useNavigate } from "../../hooks/useNavigate";
import { useToastNotification } from "../../hooks/useToastNotification";

export class SignUp extends Component {
    constructor() {
        super();

        this.template = template({ routes: ROUTES });
        this.state = {
            isLoading: false,
        }
    }

    toggleIsLoading() {
        this.setState({
            ...this.state,
            isLoading: !this.state.isLoading,
        })
    }

    registerUser = (evt) => {
        evt.preventDefault();
        const formData = extractFormData(evt.target);
        this.toggleIsLoading();
        authService
        .signUp(formData.email, formData.password)
        .then((data) => {
            useToastNotification({ message: "Success!!", type: TOAST_TYPE.success })
            useNavigate(ROUTES.dashboard);
        })
        .catch((error) => {
            useToastNotification({ message: error.message })
        })
        .finally(() => {
            this.toggleIsLoading();
        })

    }

    componentDidMount() {
        this.addEventListener('submit', this.registerUser)
    }

}

customElements.define("sign-up-page", SignUp)