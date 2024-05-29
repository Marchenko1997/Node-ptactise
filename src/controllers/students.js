import { getAllStudents, getStudentById, createStudent, deleteStundent, updateStudent } from  '../db/services/students.js';
import createHttpError from 'http-errors';
export const getStudentsController = async (
    req,
    res,
      next,
  ) => {
      try {
        const students = await getAllStudents();

        res.json({
          status: 200,
          message: 'Successfully found students!',
          data: students,
        });
      } catch(err) {
          next(err);
      }
  };

  export const getStudentByIdController = async (req, res, next) => {
    const { studentId } = req.params;
    const student = await getStudentById(studentId);

    if (!student) {
      // 2. Створюємо та налаштовуємо помилку
      next(createHttpError(404, 'Student not found'));
      return;
    }

    res.json({
      status: 200,
      message: `Successfully found student with id ${studentId}!`,
      data: student,
    });
  };

  export const createStudentController = async (req, res) => {
   const student = await createStudent(req.body);
   res.status(201).json({
     status: 201,
     message: 'Successfully created student!',
     data: student,
   });
  };

  export const deleteStudentController = async (req, res) => {
    const { studentId } = req.params;
    const student = await deleteStundent(studentId);
    if(!student) {
        createHttpError(404, 'Student not found');
        return;
    }

    res.status(204).send();
  };

  export const upsertStudentController = async (req, res) => {
    const { studentId } = req.params;
    const result = await updateStudent(studentId, req.body, { upsert:true,});
    if (!result) {
        createHttpError(404, 'Student not found');
        return;
    }

    const status = result?.isNew ? 201 : 200;
    res.status(status).json ({
        status,
        message: 'Successfully upserted a student!',
        data: result.student
    });
  };

  export const patchStudentController = async (req, res, next) => {
    const {studentId} = req.params;
    const result = await updateStudent(studentId, req.body);

    if(!result) {
        next(createHttpError(404, 'Student not found'));
        return;
    }

    res.json({
        status:200,
        message: 'Successfully patched a student!',
        data: result.student,
    });
  };


