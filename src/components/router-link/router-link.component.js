import { EVENT_TYPES } from "../../constants/eventTypes";
import { Component } from "../../core/Component";
import { eventEmitter } from "../../core/EventEmitter";
import template from "./router-link.template.hbs";
// import { useNavigate } from "../../hooks/useNavigate";

export class RouterLink extends Component {
    constructor() {
        super();

        this.template = template();
        this.state = {
            href: this.getAttribute("href"),
            class: this.getAttribute("class"),
            label: this.getAttribute("label"),
        };
    }

    onClick = (evt) => {
        evt.preventDefault();
        eventEmitter.emit(EVENT_TYPES.changeRoute, { target: this.state.href })
        // useNavigate(this.state.href) можно и так
    }

    componentDidMount() {
        this.addEventListener('click', this.onClick)
    }

    componentWillUndMount() {
        this.removeEventListener('click', this.onClick)
    }
}

customElements.define('router-link', RouterLink)