//import * as service from "../../services/userServices.js";


const showReportingForm = async({render, session}) => {

    const data = {
        errors: [],
        log_email: null
    }

    const user = await session.get('user');
    if (user){
        data.log_email = user.email; 
    }

    render('reporting.ejs', data );
}


export { showReportingForm }