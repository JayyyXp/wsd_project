import { executeQuery } from "../database/database.js";


const isUserAvailable = async(email) => {
    const query = "SELECT * FROM users WHERE email = $1";
    const existingUsers = await executeQuery(query, email);
    if (existingUsers.rowCount > 0) {
        return false;
    } else {
    return true;
    }
}

const adduserToUserTable = async(email, hash) => {
    const query = "INSERT INTO users (email, password) VALUES ($1, $2);";
    await executeQuery(query, email, hash);
}

const validateUserData = async(email, password, verification) => {
    const errors = [];

    // Emails must be unique
    const query = "SELECT * FROM users WHERE email = $1";
    const existingUsers = await executeQuery(query, email);
    if (existingUsers.rowCount > 0) {
        errors.push('The email is already reserved.');
    }

    // Email must be an authentic email
    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    if( !validateEmail(email)){
        errors.push('Email must be an authentic email')
    }

    // Password must contain at least 4 characters
    if (password.length < 4) {
        errors.push('Password must contain at least 4 characters')
    }

    // Password and varification must match
    if (password !== verification) {
        errors.push('The entered passwords did not match');
    }  
    
    return errors;
  };


export { isUserAvailable , adduserToUserTable, validateUserData };