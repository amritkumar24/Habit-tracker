const mongoose = require('mongoose');

const statusModelSchema = new mongoose.Schema({
    date:{
        type:String,
    },

    dateStatus:{
        type:String,
    },

    habit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Habits',
    }
},{
    timestamps: true
}
);

const Status = mongoose.model('Status', statusModelSchema);

module.exports = Status;