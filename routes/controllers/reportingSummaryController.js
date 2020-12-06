import * as service from "../../services/summaryServices.js";


const showSummaryForm = async({render, session}) => {

    const user = await session.get('user');

    const default_data = await service.getdefaultSummaryData(user.id);
    const data = {
        week_summary: 'last week',
        month_summary: 'last month',
        sleep_duration_week_avg: default_data.sleep_duration_week_avg,
        sport_time_week_avg: default_data.sport_time_week_avg,
        study_time_week_avg: default_data.study_time_week_avg,
        sleep_quality_week_avg: default_data.sleep_quality_week_avg,
        mood_week_avg: default_data.mood_week_avg
    }

    render('summary.ejs', data);
}

export { showSummaryForm }