var form = document.getElementById('form')
form.onsubmit = function (event) {
    event.preventDefault(); //finishes submission
    let questions = [
        form.hwSemester.value,
        form.hwYear.value,
        form.homeworkCourse.value,
        form.homeworkLink.value,
        form.homeworkDeadline.value,
        form.hwDesc.value
    ], sem=cours=lnk=dedline=desc="", yr = 2021, homework={}, valid=true, error=0;
    sem = questions[0]
    if (!isValidDate(questions[4])){
        error=2
        valid=false
    } else {
        let date = questions[4].split('/')
        dedline = {
            Month:parseInt(date[2], 10),
            Day:parseInt(date[1],10),
            Year:parseInt(date[0],10)
        }
        yr = questions[1]
        cours = questions[2]
        lnk = questions[3]
        desc= questions[5]
        homework = {
            Semester:sem,
            Year:yr,
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
        xmlrequest.send(JSON.stringify(homework))
    } else {
        // reset form
        console.log('hw=',homework)
        form.reset()
        if(error===1){
            newError('Did not choose a semester!')
        } else if(error === 2){
            newError('Invalid Deadline!')
        }
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

    // var inputDate = new Date(year,month,day), curr = new Date();
    // var millisecondsPerDay = 1000 * 60 * 60 * 24;
    // var millisBetween = curr.getTime() - inputDate.getTime();
    // var days = millisBetween / millisecondsPerDay;

    // // Round down.
    // const difference = Math.floor(days);
    // if (difference <= 0){
    //     console.log("there are " + difference + "days between ",inputDate,"and",curr )
    //     //deadline is either today or already passed
    //     return false
    // }
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