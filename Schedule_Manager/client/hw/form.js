var form = document.getElementById('form')
form.onsubmit = function (event) {
    event.preventDefault(); //finishes submission
    let questions = [
        form.homeworkCourse.value,
        form.homeworkLink.value,
        form.homeworkDeadline.value,
        form.hwDesc.value
    ], cours=lnk=dedline=desc="", homework={}, valid=true;
    if (!isValidDate(questions[2])){
        valid=false
    } else {
        let date = questions[2].split('-')
        dedline = {
            Month:parseInt(date[2], 10),
            Day:parseInt(date[1],10),
            Year:parseInt(date[0],10)
        }
        cours = questions[0]
        lnk = questions[1]
        desc= questions[3]
        homework = {
            Course:cours,
            Link:lnk,
            Deadline:dedline,
            Description:desc
        }
    };
    if(valid){
        newError('Success')
        var xmlrequest = new XMLHttpRequest();
        xmlrequest.open("POST", "/api/hw")
        xmlrequest.setRequestHeader("Content-Type", "application/json")
        let entry = JSON.stringify(homework)
        console.log(entry)
        xmlrequest.send(entry)
    } else {
        // reset form
        console.log('hw=',homework)
        form.reset()
        newError('Invalid Deadline!')
        return false
    }
};

function isValidDate(dateString)
{
    console.log("input date =", dateString)
        
    // Parse the date parts to integers
    var parts = dateString.split("-");
    var day = parseInt(parts[2], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[0], 10);

    // // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12){
        console.log("failed ranges")
        return false;
    }
        

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    let result = day > 0 && day <= monthLength[month - 1];
    console.log(result)
    return result;
};

function newError(err){
    errorElement = document.getElementById('error')
    errorElement.innerHTML = err +"<br>"
}