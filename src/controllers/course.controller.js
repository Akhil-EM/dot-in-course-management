const moment = require("moment");
const statusCodes = require("../registry/html-status-codes");
const response = require("../models/api/response.model");
const { logError, logInfo } = require("../util/logger");
const { generateSchedule } = require("../util/functions");

const { db, sequelize } = require("../models/db");
const { Course, CourseParticipant, CourseSchedule } = db;

exports.createCourse = async (req, res) => {
  try {
    let { name, details, duration, startDate, fromTime } = req.body;

    let toTime = moment(new Date("11-12-2023" + " " + fromTime))
      .add(1, "hours")
      .format("HH:mm:sss");

    let courseCheck = await Course.findOne({
      where: {
        name,
      },
    });

    if (courseCheck)
      return res
        .status(statusCodes.NOT_ACCEPTABLE)
        .json(response("failed", "this course already added."));

    let [scheduleCheck, meta] = await sequelize.query(`SELECT * FROM courses
                                                        LEFT JOIN course_schedules
                                                              ON course_schedules.course_id = courses.course_id
                                                        WHERE courses.created_by = ${req.user.userId}
                                                              AND course_schedules.date = "${startDate}"
                                                              AND CAST("${fromTime}" as TIME) BETWEEN course_schedules.from_time AND course_schedules.to_time`);

    if (scheduleCheck.length > 0) {
      return res
        .status(statusCodes.NOT_ACCEPTABLE)
        .json(response("failed", "you have a class scheduled in this time"));
    }

    let { course_id } = await Course.create({
      name,
      description: details,
      duration,
      from_date: startDate,
      from_time: fromTime,
      to_time: toTime,
      created_by: req.user.userId,
    });

    let schedules = generateSchedule(course_id, startDate, fromTime, duration);
    await Promise.all(
      schedules.map(async (schedule) => {
        await CourseSchedule.create({
          course_id: schedule.courseId,
          date: schedule.date,
          from_time: schedule.fromTime,
          to_time: schedule.toTime,
        });
      })
    );

    res.json(response("success", "new course created successfully"));
  } catch (error) {
    console.log(error);
    logError(__dirname, "function", error);
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json(response("error", error.message));
  }
};

exports.editCourse = async (req, res) => {
  try {
    let { name, details, duration, startDate, fromTime } = req.body;
    let courseId = req.params.courseId;

    //check time or start date or duration changed
    let DBcourse = await Course.findOne({
      where: {
        course_id: courseId,
      },
      raw: true,
    });

    let toTime = moment(new Date("11-12-2023" + " " + fromTime))
      .add(1, "hours")
      .format("HH:mm:sss");
    if (
      DBcourse.fromTime !== DBcourse.from_time ||
      moment(new Date(DBcourse.from_date)).format("YYYY-MM-DD") !==
        moment(new Date(DBcourse.startDate)).format("YYYY-MM-DD") ||
      duration !== DBcourse.duration
    ) {
      //remove old schedules and generate new ones
      await CourseSchedule.destroy({
        where: { course_id: courseId },
      });

      let schedules = generateSchedule(courseId, startDate, fromTime, duration);
      await Promise.all(
        schedules.map(async (schedule) => {
          await CourseSchedule.create({
            course_id: schedule.courseId,
            date: schedule.date,
            from_time: schedule.fromTime,
            to_time: schedule.toTime,
          });
        })
      );
    }

    //update course
    await Course.update(
      {
        name,
        description: details,
        duration,
        from_date: startDate,
        from_time: fromTime,
        to_time: toTime,
      },
      {
        where: {
          course_id: courseId,
        },
      }
    );

    res.json(response("success", "course edited successfully"));
  } catch (error) {
    console.log(error);
    logError(__dirname, "function", error);
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json(response("error", error.message));
  }
};

exports.getCourses = async (req, res) => {
  try {
    let courses = await Course.findAll({
      where: { created_by: req.user.userId },
    });

    res.json(response("success", "courses", { courses: courses }));
  } catch (error) {
    logError(__dirname, "function", error);
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json(response("error", error.message));
  }
};

exports.getStudentCourses = async (req, res) => {
  try {
    let courses = await Course.findAll({});

    res.json(response("success", "courses", { courses: courses }));
  } catch (error) {
    console.log(error);
    logError(__dirname, "function", error);
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json(response("error", error.message));
  }
};

exports.getCourse = async (req, res) => {
  try {
    let { courseId } = req.params;
    let course = await Course.findOne({
      where: {
        course_id: courseId,
      },
      raw: true,
    });

    let schedules = await CourseSchedule.findAll({
      where: {
        course_id: courseId,
      },
    });

    course.schedules = schedules;

    res.json(response("success", "course", { course: course }));
  } catch (error) {
    console.log(error);
    logError(__dirname, "function", error);
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json(response("error", error.message));
  }
};

exports.removeCourse = async (req, res) => {
  try {
    let { courseId } = req.params;

    let courseCheck = await Course.findOne({
      where: {
        course_id: courseId,
      },
    });

    if (!courseCheck)
      return res
        .status(statusCodes.NOT_FOUND)
        .json(response("failed", "course not found"));

    let participantsCheck = await CourseParticipant.findOne({
      where: {
        course_id: courseId,
      },
      raw: true,
    });

    if (participantsCheck)
      return res
        .status(statusCodes.NOT_ACCEPTABLE)
        .json(
          response(
            "failed",
            "students are joined in this course,unable to remove"
          )
        );

    await CourseSchedule.destroy({
      where: { course_id: courseId },
    });

    await Course.destroy({
      where: { course_id: courseId },
    });

    res.json(response("success", "course deleted successfully"));
  } catch (error) {
    console.log(error);
    logError(__dirname, "function", error);
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json(response("error", error.message));
  }
};

exports.joinOrLeaveCourse = async (req, res) => {
  try {
    let { courseStatus, courseId } = req.params;

    let status = "";
    if (courseStatus == "join") {
      let joinedStatus = await CourseParticipant.findOne({
        where: {
          course_id: courseId,
          student_id: req.user.userId,
        },
      });
      if (joinedStatus)
        return res
          .status(statusCodes.NOT_ACCEPTABLE)
          .json(response("failed", "already joined in this course"));

      await CourseParticipant.create({
        course_id: courseId,
        student_id: req.user.userId,
      });
      status = "joined";
    }

    if (courseStatus == "leave") {
      let joinedStatus = await CourseParticipant.findOne({
        where: {
          course_id: courseId,
          student_id: req.user.userId,
        },
      });
      if (!joinedStatus)
        return res
          .status(statusCodes.NOT_ACCEPTABLE)
          .json(response("failed", "not joined in this course"));
      await CourseParticipant.destroy({
        where: {
          course_id: courseId,
          student_id: req.user.userId,
        },
      });

      status = "leaved";
    }

    res.json(response("success", `course ${status}`));
  } catch (error) {
    console.log(error);
    logError(__dirname, "function", error);
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json(response("error", error.message));
  }
};
