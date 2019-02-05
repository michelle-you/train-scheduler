
$(document).ready(function(){
    $("#submit-button").click(function(){
        var trainName = $("#train-name").val()
        $("#row1").append(trainName);
        
    })
})