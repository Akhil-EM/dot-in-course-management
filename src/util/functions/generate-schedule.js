module.exports = 
//courseId : number
//fromDate : dd-mm-yyyy
//fromTime : hh:mm (24hr format)
//duration : number 
function generateCourseSchedule(courseId, fromDate, fromTime, duration) {
  const moment = require("moment");
  let startDate = moment(new Date(fromDate));
  let endDate = moment(startDate).add(duration * 2, "days");
  let schedules = [];
  let toTime = moment(new Date(fromDate + " " + fromTime))
    .add(1, "hours")
    .format("HH:mm:sss");

  for (var m = moment(startDate); m.isBefore(endDate); m.add(1, "days")) {
    if (m.day() !== 0) {
      //avoiding sunday
      schedules.push({
        courseId: courseId,
        date: m.format("YYYY-MM-DD"),
        fromTime: fromTime,
        toTime: toTime,
      });
    }
  }
  return schedules.slice(0, duration);
}