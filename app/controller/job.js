const Controller = require('../core/base_controller');

class JobController extends Controller {
 
    //查询一级菜单
    async fetchFirstType() {
        const result = await this.ctx.model.JobFirstType.find().sort({'sort': 1});
        this.success(result)
    }

    //新增一级菜单
    async addFirstType() {
        const { title, sort } = this.ctx.request.body
        const info = await this.ctx.model.JobFirstType.findOne({title})
        if(info) {
            this.ctx.body = {code: 1, msg: '菜单名已存在'}
        }
        try{
            let result = await this.ctx.model.JobFirstType.create({title, sort})
            this.success(result)  
        }catch (err) {
            if(err) {
                this.dbError(err)
            }
        }
    }

    //删除一级菜单
    async removeFirstType() {
        const { _id } = this.ctx.request.body;
        try {
            let result = await this.ctx.model.JobFirstType.remove({_id})
            this.success(result)
        }catch (err) {
            if(err) {
                this.dbError(err)
            }
        }
        
    }
  
    //修改一级菜单
    async updateFirstType() {
        const { title, sort, _id } = this.ctx.request.body
        try {
            let result = await this.ctx.model.JobFirstType.findByIdAndUpdate(_id, { title, sort })
            this.success(result)
        }catch (err) {
            if(err) {
                this.dbError(err)
            }
        }
    }

    //查询二级菜单
    async fetchSecondType() {
        const params = this.ctx.request.body;
        let result = await this.ctx.model.JobSecondType.find(params).sort({'sort': 1})
        this.success(result)
    }
    
    //新增二级菜单
    async addSecondType() {
        const { title, sort, first_type } = this.ctx.request.body
        const info = await this.ctx.model.JobSecondType.findOne({title})
        if(info) {
            this.ctx.body = {code: 1, msg: '菜单名已存在'}
        }
        try{
            let result = await this.ctx.model.JobSecondType.create({title, sort, first_type})
            this.success(result)  
        }catch (err) {
            if(err) {
                this.dbError(err)
            }
        }
    }

    //删除二级菜单
    async removeSecondType() {
        const { _id } = this.ctx.request.body;
        try {
            let result = await this.ctx.model.JobSecondType.remove({_id})
            this.success(result)
        }catch (err) {
            if(err) {
                this.dbError(err)
            }
        }
    }
    
    //修改二级菜单
    async updateSecondType() {
        const { title, sort, first_type, _id } = this.ctx.request.body
        try {
            let result = await this.ctx.model.JobSecondType.findByIdAndUpdate(_id, { title, sort, first_type })
            this.success(result)
        }catch (err) {
            if(err) {
                this.dbError(err)
            }
        }
    }

    //查询职位列表
    async fetchJobList() {
        const { pageSize = 10, currentPage = 1, address, second_type, title } = this.ctx.request.body
        const match = {}
        if(address) match.address = address
        if(second_type) {
            match['secondType.title'] = second_type
        }
        if(title) match.title = title
        const list = await this.ctx.model.JobDetail.aggregate([
            {
                $lookup: {
                    from: 'jobsecondtypes',
                    localField: 'second_type',
                    foreignField: '_id',
                    as: 'secondType'
                }
            },
            { $skip : (currentPage - 1)*pageSize },
            { $limit : pageSize },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    update_time: 1,
                    address: 1,
                    job_require: 1,
                    job_desc: 1,
                    'secondType.title': 1,
                    'secondType._id': 1
                }
            },
            {
                $unwind: '$secondType'
            },
            {
                $match: match
            }
        ])
        const total =  await this.ctx.model.JobDetail.count()
        const result ={ list, pagination: { pageSize, currentPage, total } }
        this.success(result)
    }

    //新增职位
    async addJob() {
        const { title, second_type, job_desc, job_require, address } = this.ctx.request.body
        const info = await this.ctx.model.JobDetail.findOne({title})
        if(info) {
            this.ctx.body = {code: 1, msg: '该职位已存在'}
        }
        try{
            let result = await this.ctx.model.JobDetail.create({title, second_type, job_desc, job_require, address})
            this.success(result)  
        }catch (err) {
            if(err) {
                this.dbError(err)
            }
        }
    }

    //删除职位
    async removeJob() {
        const { _id } = this.ctx.request.body;
        try {
            let result = await this.ctx.model.JobDetail.remove({_id})
            this.success(result)
        }catch (err) {
            if(err) {
                this.dbError(err)
            }
        }
    }

    //修改职位信息
    async updateJobDetail() {
        const { title, second_type, job_desc, job_require, address, _id } = this.ctx.request.body
        try {
            let result = await this.ctx.model.JobDetail.findByIdAndUpdate(_id, { title, second_type, job_desc, job_require, address })
            this.success(result)
        }catch (err) {
            if(err) {
                this.dbError(err)
            }
        }
    }
}

module.exports = JobController;
