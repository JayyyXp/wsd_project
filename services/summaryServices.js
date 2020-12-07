import { executeQuery } from "../database/database.js";

const getdefaultSummaryData = async(user_id) => {
    
    const query = `
    WITH morning_avg AS(
        SELECT 
            AVG(sleep_duration) AS sleep_duration_avg,
            AVG(sleep_quality) AS sleep_quality_avg,
            AVG(morning_mood) AS morning_mood_avg 
        FROM 
            morning 
        WHERE 
            morning.user_id = $1 
            AND CURRENT_DATE - CAST ($2 AS INTEGER) <= morning.date
            AND morning.date <= CURRENT_DATE
    ), evening_avg AS (
        SELECT 
            AVG(sport_time) AS sport_time_avg,
            AVG(study_time) AS study_time_avg,
            AVG(evening_mood) AS evening_mood_avg 
        FROM 
            evening 
        WHERE 
            evening.user_id = $1
            AND CURRENT_DATE - CAST ($2 AS INTEGER) <= evening.date
            AND evening.date <= CURRENT_DATE
    )
    
    SELECT 
        sleep_duration_avg,
        sport_time_avg,
        study_time_avg,
        sleep_quality_avg,
        (morning_mood_avg::decimal + evening_mood_avg ::decimal) / 2 AS mood_avg
    FROM
        morning_avg, evening_avg
    `;

    // TODO: jos res_ row number == 0 nii ei näytetä
    const res_week = await executeQuery(query, user_id, '7');
    const row_week = res_week.rowsOfObjects()[0];
    
    const res_month = await executeQuery(query, user_id, '30');
    const row_month = res_month.rowsOfObjects()[0];

    const data = {
        sleep_duration_week_avg: row_week.sleep_duration_avg,
        sport_time_week_avg: row_week.sport_time_avg,
        study_time_week_avg: row_week.study_time_avg,
        sleep_quality_week_avg: row_week.sleep_quality_avg,
        mood_week_avg: row_week.mood_avg,

        sleep_duration_month_avg: row_month.sleep_duration_avg,
        sport_time_month_avg: row_month.sport_time_avg,
        study_time_month_avg: row_month.study_time_avg,
        sleep_quality_month_avg: row_month.sleep_quality_avg,
        mood_month_avg: row_month.mood_avg
    }

    return data;
} 

const getWeekSummaryData = async(user_id, week, year) => {

    const query = `
    WITH morning_avg AS(
        SELECT 
            AVG(sleep_duration) AS sleep_duration_avg,
            AVG(sleep_quality) AS sleep_quality_avg,
            AVG(morning_mood) AS morning_mood_avg 
        FROM 
            morning 
        WHERE 
            morning.user_id = $1 
            AND EXTRACT(WEEK FROM morning.date) = $2
            AND EXTRACT(YEAR FROM morning.date) = $3
    ), evening_avg AS (
        SELECT 
            AVG(sport_time) AS sport_time_avg,
            AVG(study_time) AS study_time_avg,
            AVG(evening_mood) AS evening_mood_avg 
        FROM 
            evening 
        WHERE 
            evening.user_id = $1
            AND EXTRACT(WEEK FROM evening.date) = $2
            AND EXTRACT(YEAR FROM evening.date) = $3
    )
    
    SELECT 
        sleep_duration_avg,
        sport_time_avg,
        study_time_avg,
        sleep_quality_avg,
        (morning_mood_avg::decimal + evening_mood_avg ::decimal) / 2 AS mood_avg
    FROM
        morning_avg, evening_avg
    `;

    const res_week = await executeQuery(query, user_id, week, year);
    const row_week = res_week.rowsOfObjects()[0];

    const data = {
        sleep_duration_week_avg: row_week.sleep_duration_avg,
        sport_time_week_avg: row_week.sport_time_avg,
        study_time_week_avg: row_week.study_time_avg,
        sleep_quality_week_avg: row_week.sleep_quality_avg,
        mood_week_avg: row_week.mood_avg
    }

    return data;
}
export { getdefaultSummaryData, getWeekSummaryData }