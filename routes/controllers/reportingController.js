//import * as service from "../../services/userServices.js";


const showReportingForm = ({render}) => {
    render('reporting.ejs', { errors: [] } );
}


export { showReportingForm }