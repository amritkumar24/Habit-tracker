const Habits = require('../models/habitModel');
const Status = require('../models/statusModel');

const monthNames = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];

module.exports.weekView = async function(req, res){
    try{
        let habits = await Habits.find({}).populate('status');

        let currentDate = new Date();

        const month = monthNames[currentDate.getMonth()];
        const day = currentDate.getDate();

        const date = `${month} ${day}`;

        res.render('./weekViewPage', {
            habits:habits,
            currdate:date
        });
    }catch(error){
        console.log('Error', error);
    }
};

module.exports.toggleStatus = async function(req, res){
    try{
        let currentDate = new Date().toLocaleString();
        let status = await Status.findOne({habit: req.query.id, date: req.query.date});
        
        if(new Date(status.date).toLocaleString() <= currentDate){

            if(status.dateStatus === 'Not Started'){
                status.dateStatus = 'Done';
            }else if(status.dateStatus === 'Done'){
                status.dateStatus = 'Not Done';
            }else{
                status.dateStatus='Not Started'
            }

            status.save();

            return res.redirect('back');
        }else{
            return res.status(400).send('Cannot toggle status for future dates.');
        }
    } catch (error) {
        console.log('Error', error);
        return res.status(500).send('Internal server error.');
    }
};