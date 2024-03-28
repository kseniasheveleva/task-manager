import { Component } from '../../core/Component';
import template from './button.template.hbs';

export class Button extends Component {
    constructor() {
        super();

        this.template = template();
        this.state = {
            type: this.getAttribute('type') ?? '',
            caption: this.getAttribute('caption') ?? '',
            class: this.getAttribute("class-name"),
        }
    }
}

customElements.define("ui-button", Button)