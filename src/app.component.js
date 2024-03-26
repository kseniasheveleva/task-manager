import { Component } from './core/Component';
import template from './app.template.hbs';

export class App extends Component {
    constructor() {
        super();

        this.template = template();
        this.state = {
            count: 0,
            name: 'aaa',
            surname: 'bbb',
        }
    }

    increment = (evt) => {
        if (evt.target.closest('.increment')) {
          this.setState({
            ...this.state,
            count: this.state.count += 1
          })  
        }
    };
    decrement = (evt) => {
        if (evt.target.closest('.decrement')) {
          this.setState({
            ...this.state,
            count: this.state.count -= 1
          })  
        }
    };

    componentDidMount() {
        this.addEventListener('click', this.increment);
        this.addEventListener('click', this.decrement);
    }
    componentWillUnMount() {
        this.addEventListener('click', this.increment);
        this.addEventListener('click', this.decrement);
    }
}

customElements.define("my-app", App)