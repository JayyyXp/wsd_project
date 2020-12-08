import * as service from "../../services/userServices.js";
import { bcrypt } from "../../deps.js";


const showRegistrationForm = async({render, session}) => {

    const data = {
      errors: [],
      email: '',
      log_email: null
    }

    const user = await session.get('user');
    if (user){
        data.log_email = user.email; 
    }

    render('register.ejs', data);
}

const postRegistrationForm = async({render, request, response}) => {
    const body = request.body();
    const params = await body.value;
    
    const email = params.get('email');
    const password = params.get('password');
    const verification = params.get('verification');
  

    const data = {
      email: email,
      errors: await service.validateUserData(email, password, verification),
      log_email: null
    }

    const user = await session.get('user');
    if (user){
        data.log_email = user.email; 
    }

  
    if(data.errors.length > 0){
        render('register.ejs', data);
    } else {

      const hash = await bcrypt.hash(password); // import
      await service.adduserToUserTable(email, hash);
  
      response.body = 'Registration successful!';
    }
  };

export { showRegistrationForm, postRegistrationForm };