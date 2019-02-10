import React, { Component } from 'react';
import axios from 'axios';

import StudentList from './StudentList.js';
import SingleStudent from './SingleStudent.js';
import NewStudentForm from './NewStudentForm'

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      selectedStudent: {},
      showForm: false
    };

    this.selectStudent = this.selectStudent.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.getStudents();
  }

  async getStudents() {
    console.log('fetching');
    try {
      const { data } = await axios.get('/student');
      this.setState({ students: data });
    } catch (err) {
      console.error(err);
    }
  }

  selectStudent(student) {
    return this.setState({
      selectedStudent: student,
    });
  }

  onClick() {
    event.preventDefault()
    this.setState({
      showForm: !this.state.showForm
    })
  }

  render() {
    return (
      <div>
        <h1>Students</h1>
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
        <button onClick={this.onClick}>Add New Student</button>
        {this.state.showForm ? <NewStudentForm /> : null}
      </div>
    );
  }
}
