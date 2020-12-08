import * as service from "../../services/summaryServices.js";


const showSummaryForm = async({render, session}) => {

    const user = await session.get('user');

    const default_data = await service.getdefaultSummaryData(user.id);
    const data = {
        week_summary: 'last week (7 days)',
        month_summary: 'last month (30 days)',
        
        week: {
            sleep_duration_week_avg: (default_data.sleep_duration_week_avg) ? default_data.sleep_duration_week_avg : 'not found',
            sport_time_week_avg: (default_data.sport_time_week_avg) ? default_data.sport_time_week_avg : 'not found',
            study_time_week_avg: (default_data.study_time_week_avg) ? default_data.study_time_week_avg : 'not found',
            sleep_quality_week_avg: (default_data.sleep_quality_week_avg) ? default_data.sleep_quality_week_avg : 'not found',
            mood_week_avg: (default_data.mood_week_avg) ? default_data.mood_week_avg : 'not found'
        },
        month: {
            sleep_duration_month_avg: (default_data.sleep_duration_month_avg) ? default_data.sleep_duration_month_avg : 'not found',
            sport_time_month_avg: (default_data.sport_time_month_avg) ? default_data.sport_time_month_avg : 'not found',
            study_time_month_avg: (default_data.study_time_month_avg) ? default_data.study_time_month_avg : 'not found',
            sleep_quality_month_avg: (default_data.sleep_quality_month_avg) ? default_data.sleep_quality_month_avg : 'not found',
            mood_month_avg: (default_data.mood_month_avg) ? default_data.mood_month_avg : 'not found'
        }
    }

    render('summary.ejs', data);
}

const showSummaryWeekForm = async({render, request, session}) => {
    const body = request.body();
    const params = await body.value;

    const user = await session.get('user');
    const week = params.get('week'); //2020-W50
    const week_parts = week.split("-W");

    const week_data = await service.getWeekSummaryData(user.id, week_parts[1], week_parts[0]);

    const data = {
        week_summary: `week ${week_parts[1]} year ${week_parts[0]}`,
        month_summary: 'not selected',
        
        week: {
            sleep_duration_week_avg: (week_data.sleep_duration_week_avg) ? week_data.sleep_duration_week_avg : 'not found',
            sport_time_week_avg: (week_data.sport_time_week_avg) ? week_data.sport_time_week_avg : 'not found',
            study_time_week_avg: (week_data.study_time_week_avg) ? week_data.study_time_week_avg : 'not found',
            sleep_quality_week_avg: (week_data.sleep_quality_week_avg) ? week_data.sleep_quality_week_avg : 'not found',
            mood_week_avg: (week_data.mood_week_avg) ? week_data.mood_week_avg : 'not found'
        },
        month: {
            sleep_duration_month_avg: null
        }
    }

    render('summary.ejs', data);
}

const showSummaryMonthForm = async({render, request, session}) => {
    const body = request.body();
    const params = await body.value;

    const user = await session.get('user');
    const month = params.get('month'); //'1978-06'
    const month_parts = month.split("-");

    const month_data = await service.getMonthSummaryData(user.id, month_parts[1], month_parts[0]);

    const data = {
        week_summary: 'not selected',
        month_summary: `month ${month_parts[1]} year ${month_parts[0]}`,
        
        week: {
            sleep_duration_week_avg: null
        },
        month: {
            sleep_duration_month_avg: (month_data.sleep_duration_month_avg) ? month_data.sleep_duration_month_avg : 'not found',
            sport_time_month_avg: (month_data.sport_time_month_avg) ? month_data.sport_time_month_avg : 'not found',
            study_time_month_avg: (month_data.study_time_month_avg) ? month_data.study_time_month_avg : 'not found',
            sleep_quality_month_avg: (month_data.sleep_quality_month_avg) ? month_data.sleep_quality_month_avg : 'not found',
            mood_month_avg: (month_data.mood_month_avg) ? month_data.mood_month_avg : 'not found'
        }
    }

    render('summary.ejs', data);
}

export { showSummaryForm, showSummaryWeekForm, showSummaryMonthForm }