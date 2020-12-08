import * as service from "../../services/reportingMorningServices.js";


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

    render('reporting.ejs', {errors: errors, log_email: user.email});
    //response.redirect('/behavior/reporting');
}

export { postReportingMorningForm }