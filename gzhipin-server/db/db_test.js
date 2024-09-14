const mongoose = require('mongoose');
const md5 = require('blueimp-md5');
const dbUrl = 'mongodb://localhost:27017/gzhipin_test';

mongoose.connect(dbUrl);

const db = mongoose.connection;

db.on('connected', () => {
    console.log('database connected');
});

db.on('error', (err) => {
    console.log('database error', err);
});

// define schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    type: { // Boss or Candidate
        type: String,
        required: true
    }
});

// define model
const UserModel = mongoose.model('user', userSchema);

function testSave() {
    const user = {
        username: 'testBossUser',
        password: md5('123456'),
        type: 'Boss'
    };

    const userModel = new UserModel(user);

    userModel.save((err, user) => {
        if (err) {
            console.log('Save error', err);
        } else {
            console.log('Save success', user);
        }
    });
}

// testSave();

function testFind() {
    UserModel.find((err, users) => {
        if (err) {
            console.log('Find error', err);
        } else {
            console.log('Find success', users);
        }
    });

    UserModel.findOne({_id: '66e4b666123e05bb8c980303'}, function (error, user) {
        console.log('findOne()', error, user);
    });
}

function testUpdate() {
    UserModel.findByIdAndUpdate({_id: '66e4b666123e05bb8c980303'}, {username: 'updatedUser'}, function (error, oldUser) {
        if (error) {
            console.log('Update error', error);
        } else {
            console.log('Update success', oldUser);
        }
    });
}

function testDelete() {
    UserModel.remove({_id: '66e4b666123e05bb8c980303'}, function (error, doc) {
        if (error) {
            console.log('Delete error', error);
        } else {
            console.log('Delete success', doc);
        }
    });
}

testDelete();