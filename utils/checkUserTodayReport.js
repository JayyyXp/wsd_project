import { executeQuery } from "../database/database.js";

const checkUserTodayReport = async(session) => {

    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const user = await session.get('user');

    const queryM = `
    SELECT * 
    FROM morning
    WHERE 
        user_id = $1
        AND EXTRACT(DAY FROM date) = $2
        AND EXTRACT(MONTH FROM date) = $3
        AND EXTRACT(YEAR FROM date) = $4
    `;
    const queryE = `
    SELECT * 
    FROM evening
    WHERE 
        user_id = $1
        AND EXTRACT(DAY FROM date) = $2
        AND EXTRACT(MONTH FROM date) = $3
        AND EXTRACT(YEAR FROM date) = $4
    `;

    const resM = await executeQuery(queryM, user.id, day, month, year);
    const resE = await executeQuery(queryE, user.id, day, month, year);

    const data = {
        morning_report: (resM.rowCount > 0) ? 'made' : 'not made',
        evening_report: (resE.rowCount > 0) ? 'made' : 'not made'
    }

    return data

}

export { checkUserTodayReport }