import { HttpException, Injectable } from '@nestjs/common';
import { STUDENTS } from './students.mock';

@Injectable()
export class StudentsService {
  students = STUDENTS;

//get all Students
  getAllStudents(): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.students);
    });
  }

  //get all Students By Id
  getStudentsById(studentId): Promise<any> {
    let id = Number(studentId);
    return new Promise((resolve) => {
      const student = this.students.find((student) => student.id === id);
      if (!student) {
        throw new HttpException('Student does not exist', 404);
      }
      resolve(student);
    });
  }

  //Add Student
  addStudent(student): Promise<any> {
    return new Promise((resolve) => {
      this.students.push(student);
      resolve(this.students);
    });
  }

  // Update Student by id in params
  updateStudent(studentId, updateStudentDto): Promise<any> {
    let id = Number(studentId);
    return new Promise((resolve) => {
      let index = this.students.findIndex((student) => student.id === id);
      if (index === -1) {
        throw new HttpException('Student does not exist', 404);
      }
      if(updateStudentDto.id!=null){
      this.students.splice(index, 1, updateStudentDto);
    }else{
      throw new HttpException('Give Student ID for updation', 404);
    }
      resolve(this.students);
    });
  }

    // Update Student by checking id in body
  updateStudentWithoutId(updateStudentDto): Promise<any> {
    let id = Number(updateStudentDto.id);
    return new Promise((resolve) => {
      const student = this.students.find((student) => student.id === id);
      if (!student) {
        throw new HttpException('Student does not exist', 404);
      }else{
      student.id=updateStudentDto.id;
      student.Name=updateStudentDto.Name;
      student.RollNumber=updateStudentDto.RollNumber;
      student.Class =updateStudentDto.Class;
      student.Section=updateStudentDto.Section;
      }
      resolve(this.students);
    
    });
  }

  // Delete Student by id in params
  deleteStudent(studentId): Promise<any> {
    let id = Number(studentId);
    return new Promise((resolve) => {
      let index = this.students.findIndex((student) => student.id === id);
      if (index === -1) {
        throw new HttpException('Student does not exist', 404);
      }
      this.students.splice(index, 1);
      resolve(this.students);
    });
  }
}
