import { executeQuery } from "../../database/database.js";

// curl http://localhost:7777/api/summary
const getAvgLastSevenDay = async(request) => {

    const query = `
    WITH morning_avg AS(
        SELECT 
            AVG(sleep_duration) AS sleep_duration_avg,
            AVG(sleep_quality) AS sleep_quality_avg,
            AVG(morning_mood) AS morning_mood_avg 
        FROM 
            morning 
        WHERE 
            CURRENT_DATE - CAST ($1 AS INTEGER) <= morning.date
            AND morning.date <= CURRENT_DATE
    ), evening_avg AS (
        SELECT 
            AVG(sport_time) AS sport_time_avg,
            AVG(study_time) AS study_time_avg,
            AVG(evening_mood) AS evening_mood_avg 
        FROM 
            evening 
        WHERE 
            CURRENT_DATE - CAST ($1 AS INTEGER) <= evening.date
            AND evening.date <= CURRENT_DATE
    )
    
    SELECT 
        sleep_duration_avg,
        sport_time_avg,
        study_time_avg,
        sleep_quality_avg,
        morning_mood_avg,
        evening_mood_avg
    FROM
        morning_avg, evening_avg
    `;

    const result = await executeQuery(query, '7');

    if (result && result.rowCount > 0) {
        const res_rows = result.rowsOfObjects()[0];
        let  mood_avg = null;

        if (!!res_rows.morning_mood_avg && !res_rows.evening_mood_avg){
            mood_avg = Number(res_rows.morning_mood_avg);
        } else if (!res_rows.morning_mood_avg && !!res_rows.evening_mood_avg){
            mood_avg = Number(res_rows.evening_mood_avg);
        } else if (!!res_rows.morning_mood_avg && !!res_rows.evening_mood_avg){
            mood_avg = (Number(res_rows.morning_mood_avg) + Number(res_rows.evening_mood_avg)) / 2;
        }

        const data = {
            sleep_duration_avg: res_rows.sleep_duration_avg,
            sport_time_avg: res_rows.sport_time_avg,
            study_time_avg: res_rows.study_time_avg,
            sleep_quality_avg: res_rows.sleep_quality_avg,
            mood_avg: mood_avg

        }

        request.response.body = [data];

    } else {
        request.reponse.status = 401;
    }

}

//  curl http://localhost:7777/api/summary/2020/12/06
const getAvgForDay = async(request) => {
    const year = String(request.params.year);
    const month = String(request.params.month).padStart(2, '0');
    const day = String(request.params.day).padStart(2, '0');

    const query = `
    WITH morning_avg AS(
        SELECT 
            AVG(sleep_duration) AS sleep_duration_avg,
            AVG(sleep_quality) AS sleep_quality_avg,
            AVG(morning_mood) AS morning_mood_avg 
        FROM 
            morning 
        WHERE 
            EXTRACT(DAY FROM morning.date) = $1
            AND EXTRACT(MONTH FROM morning.date) = $2
            AND EXTRACT(YEAR FROM morning.date) = $3
    ), evening_avg AS (
        SELECT 
            AVG(sport_time) AS sport_time_avg,
            AVG(study_time) AS study_time_avg,
            AVG(evening_mood) AS evening_mood_avg 
        FROM 
            evening 
        WHERE 
            EXTRACT(DAY FROM evening.date) = $1
            AND EXTRACT(MONTH FROM evening.date) = $2
            AND EXTRACT(YEAR FROM evening.date) = $3
    )
    
    SELECT 
        sleep_duration_avg,
        sport_time_avg,
        study_time_avg,
        sleep_quality_avg,
        morning_mood_avg,
        evening_mood_avg
    FROM
        morning_avg, evening_avg
    `;

    const result = await executeQuery(query, day, month, year);

    if (result && result.rowCount > 0) {
        const res_rows = result.rowsOfObjects()[0];
        let  mood_avg = null;

        if (!!res_rows.morning_mood_avg && !res_rows.evening_mood_avg){
            mood_avg = Number(res_rows.morning_mood_avg);
        } else if (!res_rows.morning_mood_avg && !!res_rows.evening_mood_avg){
            mood_avg = Number(res_rows.evening_mood_avg);
        } else if (!!res_rows.morning_mood_avg && !!res_rows.evening_mood_avg){
            mood_avg = (Number(res_rows.morning_mood_avg) + Number(res_rows.evening_mood_avg)) / 2;
        }

        const data = {
            sleep_duration_avg: res_rows.sleep_duration_avg,
            sport_time_avg: res_rows.sport_time_avg,
            study_time_avg: res_rows.study_time_avg,
            sleep_quality_avg: res_rows.sleep_quality_avg,
            mood_avg: mood_avg

        }

        request.response.body = [data];


    } else {
        request.reponse.status = 401;
    }
}

export { getAvgLastSevenDay, getAvgForDay}