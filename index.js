// Your code here

function createEmployeeRecord(array){
    return {
        firstName : array[0],
        familyName : array[1],
        title : array[2],
        payPerHour : array[3],
        timeInEvents : [],
        timeOutEvents : []
    };
};

function createEmployeeRecords(arrays){
    const employeeRecords = [];

    arrays.forEach((array)=>{
        const employeeRecord = createEmployeeRecord(array);
        employeeRecords.push(employeeRecord);
    })

    return employeeRecords;
};

function createTimeInEvent(employeeRecord,dateStamp){
    const [date, hour] = dateStamp.split(" ");
    employeeRecord.timeInEvents.push({
        type : 'TimeIn',
        hour : parseInt(hour, 10),
        date : date,
    });
    return employeeRecord;
};

function createTimeOutEvent(employeeRecord,dateStamp){
    const [date, hour] = dateStamp.split(" ");
    employeeRecord.timeOutEvents.push({
        type : 'TimeOut',
        hour : parseInt(hour, 10),
        date : date,
    });
    return employeeRecord;
};

function hoursWorkedOnDate (employeeRecord,dateStamp){
    const timeIn = employeeRecord.timeInEvents.find((e)=> e.date === dateStamp);
    const timeOut = employeeRecord.timeOutEvents.find((e)=> e.date === dateStamp);

    const tI = parseInt(timeIn.hour, 10);
    const tO = parseInt(timeOut.hour, 10);

    const totalHours = (tO - tI) / 100;

    return totalHours;
};

function wagesEarnedOnDate(employeeRecord, dateStamp){
    const totalHours = hoursWorkedOnDate(employeeRecord,dateStamp);
    const payPerHour = employeeRecord.payPerHour;

    return totalHours * payPerHour;
};

function allWagesFor(employeeRecord){
    let totalWage = 0;

    employeeRecord.timeInEvents.forEach((timeInEvent)=>{
        const date = timeInEvent.date;
        const pay = wagesEarnedOnDate(employeeRecord,date);
        totalWage += pay;
    });

    return totalWage;
};

function calculatePayroll(employeeRecords){
    let totalPay = 0;
    employeeRecords.forEach((employeeRecord)=>{
        totalPay += allWagesFor(employeeRecord);
    });

    return totalPay;
};