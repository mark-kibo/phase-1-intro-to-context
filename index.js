// Your code here
function createEmployeeRecord(array){
    let result={}
    for (let key in array){
        if(key == 0){
            result["firstName"]= array[key]
        }else if(key == 1){
            result["familyName"]= array[key]
        }else if(key == 2){
            result["title"]= array[key]
        }else if( key == 3){
            result["payPerHour"]= array[key]
        }
    }
    let timeInEvents=[]
    let timeOutEvents=[]
    result=Object.assign(result, {"timeInEvents": timeInEvents},{"timeOutEvents": timeOutEvents})


    return result;

}


function createEmployeeRecords(arrays){
    let result=[]

    arrays.forEach(element => {
        let data=createEmployeeRecord(element)
        // console.log(data)
        result.push(data)
    });
    // console.log(result)
    return result;
}

// console.log(createEmployeeRecords([["kibo", "new"], ["zippy", "leo"]]))
function createTimeInEvent(employeeRecord, dateStamp){
    const year = dateStamp.slice(0, 4);
    const month = dateStamp.slice(5, 7); // month is zero-indexed
    const day = dateStamp.slice(8, 10);
    const hours = dateStamp.slice(11, 13);
    const minutes = dateStamp.slice(13, 15);
    
    const dateObject = new Date(year, month, day, hours, minutes);
   
    let list=employeeRecord.timeInEvents
    
    let newHour = dateObject.getHours()
    let newYear =dateObject.getFullYear();
    let newMonth = dateObject.getMonth() + 1; // Adding 1 because getMonth() returns values from 0 to 11
    let newDay = dateObject.getDate();
    let date = `${year}-${month}-${day}`;

    list.push({"type": "TimeIn","hour" :newHour,"date": date})

    return employeeRecord
}

// console.log(createEmployeeRecords([["kibo", "new"], ["zippy", "leo"]]))
function createTimeOutEvent(employeeRecord, dateStamp){
    const year = dateStamp.slice(0, 4);
    const month = dateStamp.slice(5, 7); // month is zero-indexed
    const day = dateStamp.slice(8, 10);
    const hours = dateStamp.slice(11, 13);
    const minutes = dateStamp.slice(13, 15);

    const dateObject = new Date(year, month, day, hours, minutes);

    let list=employeeRecord.timeOutEvents
    let newHour = dateObject.getHours();

    let newYear =dateObject.getFullYear();
    let newMonth = dateObject.getMonth() + 1; // Adding 1 because getMonth() returns values from 0 to 11
    let newDay = dateObject.getDate();
    let date = `${year}-${month}-${day}`;
    console.log(newHour, newYear, newDay, date)
    list.push({"type": "TimeOut","hour" :newHour,"date": date})

    return employeeRecord
}


function hoursWorkedOnDate(employeeRecord,datestamp){
    let records =createEmployeeRecord(employeeRecord)
    let updatedBpRecord = createTimeInEvent(records, datestamp)
    let updatedBpRecordOne = createTimeOutEvent(records, datestamp)
    let list = updatedBpRecord.timeInEvents
    let list2 = updatedBpRecordOne.timeOutEvents

    let inHour;
    let outHour;

    list.forEach(data=>{
       
        if(Object.values(data).includes(datestamp)){
            inHour=data.hour
        }
    })
    
    
    list2.forEach(data=>{
        if(Object.values(data).includes(datestamp)){
            outHour=data.hour
            }
    })

    return outHour - inHour
    

}


function wagesEarnedOnDate(employeeRecord,datestamp){
    let hours = hoursWorkedOnDate(employeeRecord, datestamp)
    let payRate=createEmployeeRecord(employeeRecord).payPerHour

    return payRate * hours


}

function allWagesFor(employeeRecords){
    let records=createEmployeeRecords(employeeRecords)
    let hours = []
    records.forEach(element=>{
        let wagesEarned=wagesEarnedOnDate(element, element.timeInEvents.date)
        hours.push(wagesEarned)
    })

    let result = hours.reduce((accumulator, currentValue) => accumulator + currentValue)

    return result
}

function findEmployeeByFirstName(employeeRecords, myFirstName){
    let employees=createEmployeeRecords(employeeRecords)
    console.log(typeof(myFirstName))
    let employee = employees.find((data) =>{
        if(data["firstName"] == myFirstName){
            return data
        }
    })
    console.log(employee)
}

findEmployeeByFirstName([["Julius", "Caesar", "General", 27], ["Byron", "Poodle", "Mascot", 3]], "Byron")

function calculatePayroll(employeeRecords){
    let employees=createEmployeeRecords(employeeRecords)
    employees.forEach(employee=>{
        date1String= `${employee.timeInEvents[0].date} ${employee.timeInEvents[0].hour}`
        date2String= `${employee.timeOutEvents[0].date} ${employee.timeOutEvents[0].hour}`
        const date1 = new Date(date1String);
        const date2 = new Date(date2String);
    
        const timeDiffInMs = Math.abs(date2 - date1);
        const timeDiffInHours = timeDiffInMs / 3600000;
    })
   

    const date1 = new Date(date1String);
    const date2 = new Date(date2String);

    const timeDiffInMs = Math.abs(date2 - date1);
    const timeDiffInHours = timeDiffInMs / 3600000;

    console.log(timeDiffInHours); // outputs 3.5
}