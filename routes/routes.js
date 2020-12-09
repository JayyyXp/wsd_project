import { Router } from "../deps.js";
import * as usercontroller from "./controllers/userController.js";
import * as authcontroller from "./controllers/authController.js";
import * as reportingcontroller from "./controllers/reportingController.js";
import * as reportingmorningcontroller from "./controllers/reportingMorningController.js";
import * as reportingeveningcontroller from "./controllers/reportingEveningController.js";
import * as summarycontroller from "./controllers/summaryController.js";
import * as landingcontroller from "./controllers/landingController.js";

import * as api from "./apis/api.js";

const router = new Router();


router.get('/auth/register', usercontroller.showRegistrationForm);
router.post('/auth/register', usercontroller.postRegistrationForm);

router.get('/auth/login', authcontroller.showLoginForm);
router.post('/auth/login', authcontroller.postLoginForm);
router.post('/auth/logout', authcontroller.postLogoutForm);

router.get('/behavior/reporting', reportingcontroller.showReportingForm);

router.post('/behavior/reporting/morning', reportingmorningcontroller.postReportingMorningForm);
router.post('/behavior/reporting/evening', reportingeveningcontroller.postReportingEveningForm);

router.get('/behavior/summary', summarycontroller.showSummaryForm);
router.post('/behavior/summary/week', summarycontroller.showSummaryWeekForm);
router.post('/behavior/summary/month', summarycontroller.showSummaryMonthForm);

router.get('/', landingcontroller.showLandingPage);

router.get('/api/summary', api.getAvgLastSevenDay);
router.get('/api/summary/:year/:month/:day', api.getAvgForDay);

export { router };