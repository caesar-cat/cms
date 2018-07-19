'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const jobRouter = app.router.namespace('/job/first_type')
  jobRouter.get('/fetch', controller.job.fetchFirstType)
  jobRouter.post('/add', controller.job.addFirstType)
  jobRouter.post('/remove', controller.job.removeFirstType)
  jobRouter.post('/update', controller.job.updateFirstType)
};
