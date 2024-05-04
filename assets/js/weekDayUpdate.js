const Habits = require('../../models/habitModel');
const Status = require('../../models/statusModel');

// Function to update status based on current date and remove oldest status
async function updateStatusAndRemoveOldest(){
    try{
        // Find all habits and populate their status array
        let habits = await Habits.find({}).populate('status');
       
        // Get the current date and format it
        const monthNames = [
            "January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"
        ];
        
        let currentDate = new Date();
        
        const month = monthNames[currentDate.getMonth()];
        const day = currentDate.getDate();
        const year = currentDate.getFullYear();
        const formattedDate = `${day} ${month} ${year}`;

        // Update status for each habit
        for(const habit of habits){
            // Check if status for the current date already exists
            const existingStatus = await habit.status.find(status => status.date === formattedDate);

            if(!existingStatus){
                 // If status for the current date doesn't exist, create one
                 const newStatus = await Status.create({
                    date: formattedDate,
                    dateStatus: 'Not Started',
                    habit: habit._id
                });

                // Add new status to the habit's status array
                await habit.status.push(newStatus);

                // Remove the oldest status if the status array length exceeds 7
                if(habit.status.length > 7){
                    const oldestStatus = await habit.status.shift(); // Remove the oldest status
                    await  Status.findByIdAndDelete(oldestStatus._id); // Delete the oldest status from the database
                };

                await habit.save(); // Save the updated habit

            };
        };

        console.log('Status updated successfully.');

    }catch(error){
        console.error('Error in updating status :', error);
    }
};

module.exports.runDailyUpdate = function() {
    
    setInterval(() => {
        updateStatusAndRemoveOldest();
    },10000);

}

//runDailyUpdate();

// function runDailyUpdate() {
//     updateStatusAndRemoveOldest();
    
// }
// setTimeout(runDailyUpdate, 20000); 
// module.exports.run = runDailyUpdate();