/**
 * 
 * 招聘模型
 * @param {String} title  标题
 * @param {String} Object.job_desc 工作描述
 * @param {String} Object.job_require 工作要求
 * @param {String} Object.address 办公地址
 * @param {Number} Object.sort 排序
 * @param {Number} sort  排序
 * @param {String} update_time  更新时间
 * @returns 
 */
module.exports = app => {

    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const JobDetailSchema = new Schema({
        title: { type: String },
        second_type: {
            type: Schema.ObjectId,
            ref: 'JobSecondType'
        },
        job_desc: { type: String },
        job_require: { type: String },
        address: { type: String },
        update_time: {
            type: Date,
            default: Date.now
        }
    })

    return mongoose.model('JobDetail', JobDetailSchema)
}