/**
 * 
 * 招聘岗位二级分类模型
 * @param {Number} title  标题
 * @param {Number} sort  排序
 * @param {String} update_time  更新时间
 * @returns 
 */
module.exports = app => {

    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const JobSecondTypeSchema = new Schema({
        first_type: {
            type: Schema.Types.ObjectId,
            ref: 'JobFirstType'
        },
        title: {
            type: String,
            unique: true
        },
        sort: {
            type: Number
        },
        update_time: {
            type: Date,
            default: Date.now
        }
    }, {
        versionKey: false
    })

    return mongoose.model('JobSecondType', JobSecondTypeSchema)
}