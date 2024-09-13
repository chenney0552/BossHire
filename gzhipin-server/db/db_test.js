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

testSave();