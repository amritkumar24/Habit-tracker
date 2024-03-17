const mongoose = require('mongoose');

const habitModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    status: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Status'
        }
    ]
}, {
    timestamps: true
}
);

const Habits = mongoose.model('Habits', habitModelSchema);

module.exports = Habits;