/**
 * 
 * 导航模型
 * @param {String} title  导航标题
 * @param {String} href  导航链接
 * @param {Array} children  二级导航
 * @param {String} update_time  更新时间
 * @returns 
 */
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const NavSchema = new Schema({
        title: {
            type: String,
            unique: true
        },
        href: {
            type: String
        },
        children: [{
            title: String,
            href: String
        }],
        update_time: {
            type: Date,
            default: Date.now
        }
    })

    return mongoose.model('Nav', NavSchema)
}