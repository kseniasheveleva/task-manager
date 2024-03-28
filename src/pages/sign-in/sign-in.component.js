import { Component } from '../../core/Component';
import template from './sign-in.template.hbs';


export class SignIn extends Component {
    constructor() {
        super();

        this.template = template();
    }
}

customElements.define("sign-in-page", SignIn)