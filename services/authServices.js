import { executeQuery } from "../database/database.js";
import { bcrypt } from "../deps.js";

const validateLoginData = async(email, password) => {

    const data = {
        id: '',
        email: '',
        errors: []
    }
    
    let email_is_ok = false
    let password_is_ok = false

    // check if the email exists in the database
    const query = "SELECT * FROM users WHERE email = $1;";
    const res = await executeQuery(query, email);
    if (res.rowCount > 0) {
        email_is_ok = true

        // take the first row from the results
        const userObj = res.rowsOfObjects()[0];

        const id = userObj.id;
        const email = userObj.email;
        const hash = userObj.password;
        
        // is password ok
        const passwordCorrect = await bcrypt.compare(password, hash);
        if (passwordCorrect) {
            password_is_ok = true
            
            data.email = email;
            data.id = id;
        }
    }


    if (!password_is_ok || !email_is_ok){
        data.errors.push('Invalid email or password');
    }

    return data;
}


export { validateLoginData }