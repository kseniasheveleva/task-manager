import { Component } from '../../core/Component';
import template from './sign-in.template.hbs';
import { ROUTES } from '../../constants/routes';
import '../../components/input/input.component';
import '../../components/button/button.component';

export class SignIn extends Component {
    constructor() {
        super();

        this.template = template({
            routes: ROUTES,
        });
    }

    onSubmit = (evt) => {
        evt.preventDefault;
        const formData = new FormData(evt.target);
        formData.forEach((value, key)=>{
            console.log(key, value);
        } )
        
    }

    componentDidMount() {
        this.addEventListener('submit', this.onSubmit)
    }

    componentWillUnmount() {
        this.removeEventListener('submit', this.onSubmit)
    }
}

customElements.define("sign-in-page", SignIn)