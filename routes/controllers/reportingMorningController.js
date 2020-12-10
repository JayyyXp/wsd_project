import * as service from "../../services/reportingMorningServices.js";
import * as util from "../../utils/checkUserTodayReport.js";


const postReportingMorningForm = async({session, render, request, response}) => {
    const body = request.body();
    const params = await body.value;
    
    const user = await session.get('user');

    const user_id = user.id;
    const sleep_duration = params.get('sleep_duration');
    const sleep_quality = params.get('sleep_quality');
    const mood = params.get('mood');
    const date = params.get('date');

    // Validate data    
    const errors = await service.validateReportMorningData(user_id, sleep_duration, sleep_quality, mood, date);

    // Send data to database

    await service.addReportMorningToMorningTable(user_id, sleep_duration, sleep_quality, mood, date);
    const today_report = await util.checkUserTodayReport(session);


    const data = {
        errors: errors, 
        log_email: user.email,
        morning_report: today_report.morning_report,
        evening_report: today_report.evening_report
    }


    render('reporting.ejs', data);
    //response.redirect('/behavior/reporting');
}

export { postReportingMorningForm }