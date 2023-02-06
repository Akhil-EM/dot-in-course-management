const router = require("express").Router();
const courseController = require("../../controllers/course.controller");
const { validator, authChecker, roleChecker } = require("../../middleware");
const { staticValidator } = validator;
const {
  validationStatus,
  validateCourse,
  validateCourseJoinOrLeave
} = staticValidator;

router.post(
  "/",
  authChecker,
  roleChecker(["teacher"]),
  validateCourse(),
  validationStatus,
  courseController.createCourse
);

router.put(
  "/:courseId",
  authChecker,
  roleChecker(["teacher"]),
  validateCourse(),
  validationStatus,
  courseController.editCourse
);

router.get(
  "/my-courses",
  authChecker,
  roleChecker(["teacher"]),
  courseController.getCourses
);

router.get(
  "/",
  authChecker,
  roleChecker(["student"]),
  courseController.getStudentCourses
);

router.get(
  "/:courseId",
  authChecker,
  roleChecker(["student","teacher"]),
  courseController.getCourse
);

router.delete(
  "/:courseId",
  authChecker,
  roleChecker(["teacher"]),
  courseController.removeCourse
);

router.post(
  "/:courseId/:courseStatus",
  authChecker,
  roleChecker(["student"]),
  validateCourseJoinOrLeave(),
  validationStatus,
  courseController.joinOrLeaveCourse
);



module.exports = router;



