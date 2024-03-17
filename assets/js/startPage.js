{
    //Method to redirect to the main page of the habit app
    $('#startButton').click(function(event){
        event.preventDefault();
        window.location.href = 'http://localhost:4000/main/dayView';
    });
}