import * as service from "../../services/authServices.js";
import { bcrypt } from "../../deps.js";


const showLoginForm = ({render}) => {
    render('login.ejs', {errors: []});
}

const postLoginForm = async({render, request, response, session}) => {
    const body = request.body();
    const params = await body.value;
  
    const email = params.get('email');
    const password = params.get('password');
  
    // validate login data 
    const login_data = await service.validateLoginData(email, password);

    const data = {
        errors: login_data.errors
    }
    
    if (data.errors.length > 0) {
        render('login.ejs', data);
    } else {
        await session.set('authenticated', true);
        await session.set('user', {
            id: login_data.id,
            email: login_data.email
        });
        //alert("Authentication successful!");
        response.redirect('/behavior/reporting');
    }
    
}

const postLogoutForm = async({render, session, response}) => {

    if (await session.get('authenticated')){
        await session.set('authenticated', false);
        await session.set('user', null);
        response.body = 'Logout successful!';
    } else {
        const data = {
            errors: ['You are not logged in']
        }
        render('login.ejs', data);
    }

}

export { showLoginForm, postLoginForm, postLogoutForm };