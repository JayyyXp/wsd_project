import { executeQuery } from "../database/database.js";

const validateReportMorningData = async(user_id, sleep_duration, sleep_quality, mood, date) =>{

    const errors = [];
    //TODO: check rest of parameters is ok ?

    // user has already submitted morning report for this day
    const query = "SELECT * FROM morning WHERE user_id = $1 AND date = $2;"
    const res = await executeQuery(query, user_id, date);
    if (res.rowCount > 0) {
        errors.push(`A morning report for day ${date} found, log updated`)

        const query = "DELETE FROM morning WHERE user_id = $1 AND date = $2;"
        await executeQuery(query, user_id, date);
    }

    return errors;
}

const addReportMorningToMorningTable = async(user_id, sleep_duration, sleep_quality, mood, date) =>{

    const query = "INSERT INTO morning (user_id, sleep_duration, sleep_quality, morning_mood, date) VALUES ($1, $2, $3, $4, $5);";
    await executeQuery(query, user_id, sleep_duration, sleep_quality, mood, date);
}

export { addReportMorningToMorningTable, validateReportMorningData }