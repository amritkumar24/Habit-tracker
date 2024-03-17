const Habits = require('../models/habitModel');
const Status = require('../models/statusModel');

const monthNames = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];

module.exports.main = async function(req, res){
    try{
        let habits = await Habits.find({}).populate("status");

        let currentDate = new Date();
        
        const month = monthNames[currentDate.getMonth()];
        const day = currentDate.getDate();

        const currDate = `${month} ${day}`;
        
        res.render('./mainPage', {
            habits:habits,
            currDate:currDate
        });

    } catch(error){
        console.log('Error', error);
    }
};

module.exports.create=async function(req, res){
    try{
        nameValue = (req.body.habits? req.body.habits: req.body.custom_habit);

        let habit = await Habits.findOne({ name: nameValue });

        if(habit){
            console.log('This habit Aleady exists');
            return res.redirect('back');
        };

        habit = await Habits.create({
            name: nameValue
        });


        for(let i=0; i<7; i++){
            
        let currentDate = new Date();
        const check = currentDate.setDate(currentDate.getDate()-i);

        const month = monthNames[currentDate.getMonth()];
        const day = currentDate.getDate();
        
        const formattedDate = `${month} ${day}`;

        let date = await Status.create({
            date:formattedDate,
            dateStatus: 'Not Started',
            habit: habit._id
        });

        habit.status.push(date);
        }

        await habit.save();

        return res.redirect('back');
    }catch(error){
        console.log('Error', error);
    }
};

module.exports.delete = async function(req, res){
    try{
        let habit = await Habits.findById(req.params.id);
        await habit.deleteOne();

        await Status.deleteMany({habit:req.params.id});

        res.redirect('back');
    }catch (error){
        console.log('Error', error);
    }
};

module.exports.toggleStatus = async function(req, res){
    try{
        let currentDate = new Date();

        const month = monthNames[currentDate.getMonth()];
        const day = currentDate.getDate();

        const date = `${month} ${day}`;

        console.log(req.query.id, date);
        

        let status = await Status.findOne({habit:req.query.id, date:date});
        console.log(status);

        status.dateStatus = req.query.status;
        status.save();
        console.log(status);

        return res.redirect('back');
    } catch(error){
        console.log('Error', error);
    }
};
