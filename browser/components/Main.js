import React, { Component } from 'react';
import axios from 'axios';

import StudentList from './StudentList.js';
import SingleStudent from './SingleStudent.js';
import NewStudentForm from './NewStudentForm.js';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      selectedStudent: {},
      showStudent: false,
    };
    this.addStudent = this.addStudent.bind(this);
    this.selectStudent = this.selectStudent.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getStudents();
  }

  async getStudents() {
    console.log('fetching');
    try {
      const { data } = await axios.get('/student');
      this.setState({ students: data });
      console.log('This is the State', this.state);
    } catch (err) {
      console.error(err);
    }
  }

  async addStudent(student) {
    const { data } = await axios.post('/student', student);
    this.setState({
      students: [...this.state.students, data],
      showStudent: false,
    });
  }

  selectStudent(student) {
    return this.setState({
      selectedStudent: student,
    });
  }

  handleClick(e) {
    return this.setState({
      showStudent: !this.state.showStudent,
    });
  }

  render() {
    console.log('this is the state in main', this.state);
    return (
      <div>
        <h1>Students</h1>
        <button onClick={this.handleClick}>Add Student</button>
        {this.state.showStudent ? <NewStudentForm addStudent={this.addStudent} /> : null}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Tests</th>
            </tr>
          </thead>
          <StudentList
            students={this.state.students}
            selectStudent={this.selectStudent}
          />
        </table>
        {this.state.selectedStudent.id ? (
          <SingleStudent student={this.state.selectedStudent} />
        ) : null}
      </div>
    );
  }
}
