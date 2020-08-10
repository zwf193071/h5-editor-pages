const mongoose = require('mongoose');
const config = {
    mongodb: 'mongodb://admin:123456@localhost:27017/h5page?authSource=admin'
};
mongoose.connect(config.mongodb, { useNewUrlParser: true });
mongoose.connection.once("open", function () {
    console.log("数据库连接成功")
});

const schema = mongoose.Schema({
    name: String
})
const UserModel = mongoose.model('User', schema);

UserModel.create({
    name: "wenfang"
}, function (err, doc) {
    if (err) console.log(err)
    else {
        console.log("添加成功了");
        console.log(doc)
    }
})