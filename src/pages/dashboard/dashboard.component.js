import { Component } from '../../core/Component';
import template from './dashboard.template.hbs';

export class DashBoard extends Component {
    constructor() {
        super();

        this.template = template()
    }
}

customElements.define('dashboard-page', DashBoard)