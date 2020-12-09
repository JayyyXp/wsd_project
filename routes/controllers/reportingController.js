import * as util from "../../utils/checkUserTodayReport.js";


const showReportingForm = async({render, session}) => {

    const today_report = await util.checkUserTodayReport(session);

    const data = {
        errors: [],
        log_email: null,
        morning_report: today_report.morning_report,
        evening_report: today_report.evening_report
    }

    const user = await session.get('user');
    if (user){
        data.log_email = user.email; 
    }

    render('reporting.ejs', data );
}


export { showReportingForm }