const { Controller } = require('egg');
class BaseController extends Controller {
  get user() {
    return this.ctx.session.user;
  }

  success(result) {
    this.ctx.body = {
      code: 0,
      msg: 'success',
      result,
    };
  }

  dbError(err) {
    this.ctx.body = {
      code: 20001,
      msg: 'db error',
      err
    }
  }
}
module.exports = BaseController;