import * as service from "../../services/summaryServices.js";


const showSummaryForm = async({render, session}) => {

    const user = await session.get('user');

    const default_data = await service.getdefaultSummaryData(user.id);
    const data = {
        week_summary: 'last week',
        month_summary: 'last month',
        
        week: {
            sleep_duration_week_avg: default_data.sleep_duration_week_avg,
            sport_time_week_avg: default_data.sport_time_week_avg,
            study_time_week_avg: default_data.study_time_week_avg,
            sleep_quality_week_avg: default_data.sleep_quality_week_avg,
            mood_week_avg: default_data.mood_week_avg
        },
        month: {
            sleep_duration_month_avg: default_data.sleep_duration_month_avg,
            sport_time_month_avg: default_data.sport_time_month_avg,
            study_time_month_avg: default_data.study_time_month_avg,
            sleep_quality_month_avg: default_data.sleep_quality_month_avg,
            mood_month_avg: default_data.mood_month_avg
        }
    }

    render('summary.ejs', data);
}

const showSummaryWeekForm = async({render, request, session}) => {
    const body = request.body();
    const params = await body.value;

    const user = await session.get('user');
    const week = params.get('week'); //2020-W50
    const week_parts = week.split("-W")

    const week_data = await service.getWeekSummaryData(user.id, week_parts[1], week_parts[0]);
    console.log(week_data);

    const data = {
        week_summary: `week ${week_parts[1]} year ${week_parts[0]}`,
        month_summary: 'not selected',
        
        week: {
            sleep_duration_week_avg: week_data.sleep_duration_week_avg,
            sport_time_week_avg: week_data.sport_time_week_avg,
            study_time_week_avg: week_data.study_time_week_avg,
            sleep_quality_week_avg: week_data.sleep_quality_week_avg,
            mood_week_avg: week_data.mood_week_avg
        },
        month: {
            sleep_duration_month_avg: null
        }
    }
    console.log(data);
    render('summary.ejs', data);
}

export { showSummaryForm, showSummaryWeekForm }