/*
The model to manipulate the data in mongoDB
*/
const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost:27017/gzhipin';
mongoose.connect(dbUrl);
const conn = mongoose.connection;
conn.on('connected', () => {console.log('DB connect OK')});

const userSchema = mongoose.Schema({
    username: {type: String, required: true}, // 用户名
    password: {type: String, required: true}, // 密码
    type: {type: String, required: true}, // 用户类型: dashen/laoban
    header: {type: String}, // 头像名称
    post: {type: String}, // 职位
    info: {type: String}, // 个人或职位简介
    company: {type: String}, // 公司名称
    salary: {type: String} // 月薪
});

const UserModel = mongoose.model('user', userSchema);

// export the Model
exports.UserModel = UserModel

const chatSchema = mongoose.Schema({
    from: {type: String, required: true}, // 发送者
    to: {type: String, required: true}, // 接收者
    chat_id: {type: String, required: true}, // 聊天id 由from和to生成
    content: {type: String, required: true}, // 内容
    read: {type: Boolean, default: false}, // 是否已读
    create_time: {type: Number, default: Date.now} // 创建时间
});

const ChatModel = mongoose.model('chat', chatSchema);

exports.ChatModel = ChatModel;