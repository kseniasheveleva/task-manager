import { EVENT_TYPES } from "../../constants/eventTypes";
import { Component } from "../../core/Component";
import { eventEmitter } from "../../core/EventEmitter";
import template from "./drawer.template.hbs"

export class Drawer extends Component {
    constructor() {
        super();

        this.template = template()
        this.state = {
            isOpen: false,
            template: null,
            title: 'Title'
        }
    }

    openDrawer = ({ detail }) => {
        this.setState({
            isOpen: true,
            ...detail,
    
        })

        const body = this.querySelector('.drawer-body');
        body.append(detail.template)
    }

    closeDrawer = ({ target }) => {
        if (target.closest('.drawer-reject-trigger')) {
            this.setState({
                isOpen: false,
                template: null,
                title: null,
            })
        }
    }

    componentDidMount() {
        eventEmitter.on(EVENT_TYPES.openDrawer, this.openDrawer);
        this.addEventListener('click', this.closeDrawer)
    }

    componentWillUnmount() {
        eventEmitter.off(EVENT_TYPES.openDrawer, this.openDrawer);
        this.removeEventListener('click', this.closeDrawer)

    }
}

customElements.define("ui-drawer", Drawer)