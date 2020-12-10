import { executeQuery } from "../database/database.js";

const getAvgMoodForDay = async(date) =>{

    const query = `
    WITH morning AS (
        SELECT AVG(morning_mood) AS morning_mood_avg FROM morning WHERE date = $1
        ), evening AS (
        SELECT AVG(evening_mood) AS evening_mood_avg FROM evening WHERE date = $1
        )
        
        SELECT morning_mood_avg, evening_mood_avg
        FROM morning, evening 
    `;

    const res = await executeQuery(query, date);
    const res_rows = res.rowsOfObjects()[0];


    let  mood_avg = null;

    if (!!res_rows.morning_mood_avg && !res_rows.evening_mood_avg){
        mood_avg = Number(res_rows.morning_mood_avg);
    } else if (!res_rows.morning_mood_avg && !!res_rows.evening_mood_avg){
        mood_avg = Number(res_rows.evening_mood_avg);
    } else if (!!res_rows.morning_mood_avg && !!res_rows.evening_mood_avg){
        mood_avg = (Number(res_rows.morning_mood_avg) + Number(res_rows.evening_mood_avg)) / 2;
    }

    const data = {
        day_mood_avg: mood_avg
    }
    return data;
}


export { getAvgMoodForDay }