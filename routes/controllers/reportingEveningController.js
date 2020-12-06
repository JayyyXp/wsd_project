import * as service from "../../services/reportingEveningServices.js";


const postReportingEveningForm = async({session, render, request, response}) => {
    const body = request.body();
    const params = await body.value;
    
    const user = await session.get('user');

    const user_id = user.id;
    const sport_time = params.get('sport_time');
    const study_time = params.get('study_time');
    const eating = params.get('eating');
    const mood = params.get('mood');
    const date = params.get('date');

    // Validate data    
    const errors = await service.validateReportEveningData(user_id, sport_time, study_time, eating, mood, date);

    // Send data to database

    await service.addReportEveningToEveningTable(user_id, sport_time, study_time, eating, mood, date);

    render('reporting.ejs', {errors: errors});
    //response.redirect('/behavior/reporting');
}

export { postReportingEveningForm }