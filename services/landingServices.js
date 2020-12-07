import { executeQuery } from "../database/database.js";

const getAvgMoodForDay = async(date) =>{

    const query = `
    WITH morning AS (
        SELECT AVG(morning_mood) AS morning_mood_avg FROM morning WHERE date = $1
        ), evening AS (
        SELECT AVG(evening_mood) AS evening_mood_avg FROM evening WHERE date = $1
        )
        
        SELECT ( COALESCE(morning_mood_avg, 0) + COALESCE(evening_mood_avg, 0) ) / 2 AS day_mood_avg
        FROM morning, evening 
    `;

    const res = await executeQuery(query, date);

    return res.rowsOfObjects()[0];
}


export { getAvgMoodForDay }