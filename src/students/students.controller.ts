import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { AddStudentDto } from './add-student.dto';
import { UpdateStudentDto } from './update-Student.dto';

@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}


  //get all Students
  @Get()
  async getAllStudents() {
    const students = await this.studentsService.getAllStudents();
    return students;
  }

    //get all Students By Id
  @Get(':studentId')
  async getStudentsById(@Param('studentId') studentId) {
    const student = await this.studentsService.getStudentsById(studentId);
    return student;
  }

    //Add Student
  @Post()
  async addStudent(@Body() addStudentDto: AddStudentDto) {
    const student = await this.studentsService.addStudent(addStudentDto);
    return student;
  }

    // Update Student by id in params
  @Patch(':studentId')
  async update(
    @Param('studentId') studentId,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    const student = await this.studentsService.updateStudent(
      studentId,
      updateStudentDto,
    );
    return student;
  }

  // Update Student by checking id in body
  @Put()
  async updateStudent(
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    const student = await this.studentsService.updateStudentWithoutId(updateStudentDto);
    return student;
  }

    // Delete Student by id in params
  @Delete(':studentId')
  async deleteStudent(@Param('studentId') studentId) {
    const students = await this.studentsService.deleteStudent(studentId);
    return students;
  }
}
