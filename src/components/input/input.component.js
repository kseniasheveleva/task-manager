import {  Component } from '../../core/Component';
import template from './input.template.hbs';

export class Input extends Component {
    constructor() {
        super();

        this.template = template();
        this.state = {
            name: this.getAttribute('name'),
            placeholder: this.getAttribute('placeholder') ?? '',
            value: this.getAttribute('value'),
            label: this.getAttribute('label') ?? '',
            type: this.getAttribute('type') ?? '',
        }
    }
}

customElements.define("ui-input", Input)
const input = new Input();