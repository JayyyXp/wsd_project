import { Router } from "../deps.js";
import * as usercontroller from "./controllers/userController.js";
import * as authcontroller from "./controllers/authController.js";
import * as reportingcontroller from "./controllers/reportingController.js";
import * as reportingmorningcontroller from "./controllers/reportingMorningController.js";
import * as reportingeveningcontroller from "./controllers/reportingEveningController.js";
import * as reportingsummarycontroller from "./controllers/reportingSummaryController.js";

import * as helloApi from "./apis/api.js";

const router = new Router();


router.get('/auth/register', usercontroller.showRegistrationForm);
router.post('/auth/register', usercontroller.postRegistrationForm);

router.get('/auth/login', authcontroller.showLoginForm);
router.post('/auth/login', authcontroller.postLoginForm);
router.post('/auth/logout', authcontroller.postLogoutForm);

router.get('/behavior/reporting', reportingcontroller.showReportingForm);

router.post('/behavior/reporting/morning', reportingmorningcontroller.postReportingMorningForm);
router.post('/behavior/reporting/evening', reportingeveningcontroller.postReportingEveningForm);

router.get('/behavior/summary', reportingsummarycontroller.showSummaryForm);
router.post('/behavior/summary/week', reportingsummarycontroller.showSummaryWeekForm);
router.post('/behavior/summary/month', reportingsummarycontroller.showSummaryMonthForm);

export { router };