import { Component } from '../../core/Component';
import template from './sign-in.template.hbs';
import { ROUTES } from '../../constants/routes';

import { EVENT_TYPES } from '../../constants/eventTypes';

export class SignIn extends Component {
    constructor() {
        super();

        this.template = template({
            routes: ROUTES,
        });
        this.state = {
            errors: {
                email: "",
            },
            isLoading: false,
        }
    }

    onSubmit = (evt) => {
        evt.preventDefault;
        const formData = new FormData(evt.target);
        formData.forEach((value, key)=>{
            console.log(key, value);
        } )
        
    }

}

customElements.define("sign-in-page", SignIn)