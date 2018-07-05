/**
 * 
 * 首页模型
 * 
 * @param {Array} banner  banner
 * @param {Array} module  模块
 * @param {Array} partner  合作伙伴
 * @param {String} update_time  更新时间
 * @returns 
 */
module.exports = app => {

    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const BannerSchema = new Schema({
        banner: [{
            img: { type: Schema.ObjectId, ref: 'Image' },
            desc: { type: String },
            sort: { type: Number},
        }],
        module: [{ text: String, img: { type: Schema.ObjectId, ref: 'Image'}, sort: Number }],
        partner:[{img: { type: Schema.ObjectId, ref: 'Image' }, sort: Number}],
        update_time: { type: Date, default: Date.now }
    })

    return mongoose.model('Banner', BannerSchema)
}