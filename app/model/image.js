/**
 * 
 * 图片模型
 * @param {String} href  图片路径
 * @param {Array} desc  图片描述
 * @param {String} update_time  更新时间
 * @returns 
 */
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const ImageSchema = new Schema({
        href: {
            type: String
        },
        desc: {
            type: String
        },
        update_time: {
            type: Date,
            default: Date.now
        }
    })

    return mongoose.model('Image', ImageSchema)
}