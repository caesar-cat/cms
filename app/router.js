'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  //一级分类
  const jobFirstTypeRouter = app.router.namespace('/job/first_type')
  jobFirstTypeRouter.get('/fetch', controller.job.fetchFirstType)
  jobFirstTypeRouter.post('/add', controller.job.addFirstType)
  jobFirstTypeRouter.post('/remove', controller.job.removeFirstType)
  jobFirstTypeRouter.post('/update', controller.job.updateFirstType)

  //二级分类
  const jobSecondTypeRouter = app.router.namespace('/job/second_type')
  jobSecondTypeRouter.get('/fetch', controller.job.fetchSecondType)
  jobSecondTypeRouter.post('/add', controller.job.addSecondType)
  jobSecondTypeRouter.post('/remove', controller.job.removeSecondType)
  jobSecondTypeRouter.post('/update', controller.job.updateSecondType)

  //职位列表
  const jobListRouter = app.router.namespace('/job/list')
  jobListRouter.get('/fetch', controller.job.fetchJobList)
  jobListRouter.post('/add', controller.job.addJob)
  jobListRouter.post('/remove', controller.job.removeJob)
  jobListRouter.post('/update', controller.job.updateJobDetail)
};
