/**
 * 
 * 产品介绍页模型
 * @param {String} name  产品名称
 * @param {String} header_img  图片
 * @param {String} main_title  主标题
 * @param {String} sub_title  副标题
 * @param {String} desc  描述
 * @param {String} update_time  更新时间
 * @returns 
 */
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const ProductSchema = new Schema({
        name: { type: String, unique: true },
        header_img: { type: Schema.ObjectId, ref: 'Product' },
        main_title: { type: String },
        sub_title: { type: String },
        desc: { type: String },
        update_time: { type: Date, default: Date.now }
    })

    return mongoose.model('Product', ProductSchema)
}