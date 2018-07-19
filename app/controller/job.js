// 'use strict';

const Controller = require('egg').Controller;

class JobController extends Controller {
 
  //查询一级菜单
  async fetchFirstType() {
    const result = await this.ctx.model.JobFirstType.find();
    this.ctx.body = {code: 0, result};
  }

  //新增一级菜单
  async addFirstType() {
    const { title, sort } = this.ctx.request.body
    const info = await this.ctx.model.JobFirstType.findOne({title})
    if(info) {
        this.ctx.body = {code: 10020, msg: '菜单名已存在'}
    }
    try{
        let result = await this.ctx.model.JobFirstType.create({title, sort})
        this.ctx.body = { code: '0', msg: '添加成功', result }  
    }catch (err) {
        if(err) {
            this.logger.error(err)
            this.ctx.body = {}
        }
    }
  }

  //删除一级菜单
  async removeFirstType() {
    const { title } = this.ctx.request.body;
    try {
        let result = await this.ctx.model.JobFirstType.remove({title})
        this.ctx.body = { code: '0', msg: '删除成功', result }
    }catch (err) {
        if(err) {
            this.logger.error(err)
            this.ctx.body = {}
        }
    }
    
  }
  
  //修改一级菜单
  async updateFirstType() {
    const { title, sort, id } = this.ctx.request.body
    try {
        let result = this.ctx.model.JobFirstType.findByIdAndUpdate(id, { title, sort })
        this.ctx.body = { code: 0, msg: '修改成功', result }
    }catch (err) {
        if(err) {
            this.logger.error(err)
            this.ctx.body = {}
        }
    }
  }
}

module.exports = JobController;
