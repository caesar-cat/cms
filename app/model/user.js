/**
 * 
 * 用户模型
 * @param {String} userName  用户名
 * @param {String} password  用户密码
 * @param {String} level     权限等级
 * @param {String} update_time  更新时间
 * @returns 
 */
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const UserSchema = new Schema({
        userName: {
            type: String,
            unique: true
        },
        password: {
            type: String
        },
        level: {
            type: Number
        },
        update_time: {
            type: Date,
            default: Date.now
        }
    })

    return mongoose.model('User', UserSchema)
}