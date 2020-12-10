import * as service from "../../services/landingServices.js";


const showLandingPage = async({render, session}) => {

    const today = new Date();
    const date_today = `${today.getFullYear()}-${today.getMonth() + 1}-${String(today.getDate()).padStart(2, '0')}`;
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const date_yesterday = `${yesterday.getFullYear()}-${yesterday.getMonth() + 1}-${String(yesterday.getDate()).padStart(2, '0')}`;


    const res_today = await service.getAvgMoodForDay(date_today);
    const res_yesterday = await service.getAvgMoodForDay(date_yesterday);

    let message = 'everyday is the same...'
    if (res_today.day_mood_avg > res_yesterday.day_mood_avg){
        message = 'things are looking bright today';
    } else if (res_today.day_mood_avg < res_yesterday.day_mood_avg) {
        message = 'things are looking gloomy today';
    }

    const data = {
        day_mood_avg: (!res_today.day_mood_avg) ? 'not found' : res_today.day_mood_avg,
        res_yesterday: (!res_yesterday.day_mood_avg) ? 'not found' : res_yesterday.day_mood_avg,
        message: message,
        log_email: null
    }

    const user = await session.get('user');
    if (user){
        data.log_email = user.email; 
    }

    render('landing.ejs', data);
}

export { showLandingPage }