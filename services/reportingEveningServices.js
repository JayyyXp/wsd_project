import { executeQuery } from "../database/database.js";

const validateReportEveningData = async(user_id, sport_time, study_time, eating, mood, date) =>{

    //TODO: check rest of parameters is ok ?
    const errors = [];

    // user has already submitted morning report for this day
    const query = "SELECT * FROM evening WHERE user_id = $1 AND date = $2;"
    const res = await executeQuery(query, user_id, date);
    if (res.rowCount > 0) {
        errors.push(`A evening report for day ${date} found, log updated`)

        const query = "DELETE FROM evening WHERE user_id = $1 AND date = $2;"
        await executeQuery(query, user_id, date);
    }

    return errors;
}

const addReportEveningToEveningTable = async(user_id, sport_time, study_time, eating, mood, date) =>{

    const query = "INSERT INTO evening (user_id, sport_time, study_time, eating, evening_mood, date) VALUES ($1, $2, $3, $4, $5, $6);";
    await executeQuery(query, user_id, sport_time, study_time, eating, mood, date);
}

export { addReportEveningToEveningTable, validateReportEveningData }