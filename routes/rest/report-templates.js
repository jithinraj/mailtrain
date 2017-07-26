'use strict';

const passport = require('../../lib/passport');
const _ = require('../../lib/translate')._;
const reportTemplates = require('../../models/report-templates');

const router = require('../../lib/router-async').create();


router.getAsync('/report-templates/:reportTemplateId', passport.loggedIn, async (req, res) => {
    const reportTemplate = await reportTemplates.getById(req.context, req.params.reportTemplateId);
    reportTemplate.hash = reportTemplates.hash(reportTemplate);
    return res.json(reportTemplate);
});

router.postAsync('/report-templates', passport.loggedIn, passport.csrfProtection, async (req, res) => {
    await reportTemplates.create(req.context, req.body);
    return res.json();
});

router.putAsync('/report-templates/:reportTemplateId', passport.loggedIn, passport.csrfProtection, async (req, res) => {
    const reportTemplate = req.body;
    reportTemplate.id = parseInt(req.params.reportTemplateId);

    await reportTemplates.updateWithConsistencyCheck(req.context, reportTemplate);
    return res.json();
});

router.deleteAsync('/report-templates/:reportTemplateId', passport.loggedIn, passport.csrfProtection, async (req, res) => {
    await reportTemplates.remove(req.context, req.params.reportTemplateId);
    return res.json();
});

router.postAsync('/report-templates-table', passport.loggedIn, async (req, res) => {
    return res.json(await reportTemplates.listDTAjax(req.context, req.body));
});

router.getAsync('/report-template-user-fields/:reportTemplateId', passport.loggedIn, async (req, res) => {
    const userFields = await reportTemplates.getUserFieldsById(req.context, req.params.reportTemplateId);
    return res.json(userFields);
});

router.getAsync('/report-templates-create-permitted', passport.loggedIn, async (req, res) => {
    return res.json(await shares.checkTypePermission(req.context, 'namespace', 'createReportTemplate'));
});


module.exports = router;