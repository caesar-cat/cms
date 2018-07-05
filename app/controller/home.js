'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
 
  async index() {
    this.ctx.body = '<h1>Hi, Egg</h1>';
  }
}

module.exports = HomeController;
