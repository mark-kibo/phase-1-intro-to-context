function createEmployeeRecord(array){
    let result={
        "firstName": array[0],
        "familyName":array[1],
        "title":array[2],
        "payPerHour": array[3],
        "timeInEvents":[],
        "timeOutEvents":[]
    }
    return result;

}


function createEmployeeRecords(arrays){
    let result=[]

    arrays.forEach(element => {
        let data=createEmployeeRecord(element)
        result.push(data)
    });
    return result;
}


function createTimeInEvent(employeeRecord, datestamp){
    const year = datestamp.slice(0, 4);
    const month = datestamp.slice(5, 7);
    const day = datestamp.slice(8, 10);
    const hours = datestamp.slice(11, 13);
    const minutes = datestamp.slice(13, 15);

    // create date object
    const dateObject = new Date(year, month - 1, day, hours, minutes);
    
    
    //  extract our date and hour from dateObject
    let date = `${year}-${month}-${day}`;
    let hour = dateObject.toLocaleString('en-US', { hour12: false, hour: 'numeric', minute: 'numeric' }).replace(":" , "");

    // access timeevents in employee record and pass our timeInobject
    let timeInDetails={
        "type": "TimeIn",
        "hour": parseInt(hour),
        "date": date
    }
    employeeRecord.timeInEvents.push(timeInDetails)

    return employeeRecord
}

function createTimeOutEvent(employeeRecord, datestamp){
    const year = datestamp.slice(0, 4);
    const month = datestamp.slice(5, 7);
    const day = datestamp.slice(8, 10);
    const hours = datestamp.slice(11, 13);
    const minutes = datestamp.slice(13, 15);

    // create date object
    const dateObject = new Date(year, month - 1, day, hours, minutes);
    
    
    //  extract our date and hour from dateObject
    let date = `${year}-${month}-${day}`;
    let hour = dateObject.toLocaleString('en-US', { hour12: false, hour: 'numeric', minute: 'numeric' }).replace(":" , "");

    // access timeevents in employee record and pass our timeInobject
    let timeOutDetails={
        "type": "TimeOut",
        "hour": parseInt(hour),
        "date": date
    }
    employeeRecord.timeOutEvents.push(timeOutDetails)

    return employeeRecord
}


function hoursWorkedOnDate(employeeRecord, dateString){
    // "00044-13-15"
    let timeInHour;
    let timeOutHour


    // get employee time in and time out that match the date specified
    employeeRecord.timeInEvents.forEach(element => {
        if(element["date"] === dateString) timeInHour= element["hour"]
        
    });
    employeeRecord.timeOutEvents.forEach(timeOutEvent=>{
        if(timeOutEvent["date"] === dateString) timeOutHour= timeOutEvent["hour"]
     })



    // calculate hours worked,  by extracting hours and minutes depending on the result.
    // the result can have a length of 3 or 4 meaning , you can minus hours and get eg 1200 which means 12 hours and 0 minutes
// or 200 which means 2hours and 0 minutes 
    let hoursWorked= timeOutHour-timeInHour
    if(hoursWorked.toString().length == 3){
        hoursWorked=parseInt(hoursWorked.toString().slice(0,1)) + (parseInt(hoursWorked.toString().slice(1))/60)
    }else if(hoursWorked.toString().length == 4){
        hoursWorked=parseInt(hoursWorked.toString().slice(0,2)) + (parseInt(hoursWorked.toString().slice(3))/60)
    }
    
    return hoursWorked
   
}


function wagesEarnedOnDate(employeeRecord, datestamp){
    let hoursWorked=hoursWorkedOnDate(employeeRecord, datestamp)
    let payPerHour=employeeRecord.payPerHour

    // return wage = time taken * pay per hour
    return hoursWorked * payPerHour

}


function allWagesFor(employeeRecord){
    let wages=[]
    employeeRecord.timeInEvents.forEach(event=>{
        let date=""
        if(event["date"] != date){
            date=event["date"]
            let pay = wagesEarnedOnDate(employeeRecord, date)
            wages.push(pay)
        }
    })

    let result=wages.reduce((accumulator, currentValue)=> accumulator + currentValue)

    return result
}


function calculatePayroll(employees){
    let result = []
    employees.forEach(employee =>{
        result.push(allWagesFor(employee))
    })

    return result.reduce((accumulator, currentValue)=> accumulator + currentValue)
}





