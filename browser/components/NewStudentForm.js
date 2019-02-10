import React, { Component } from 'react';

export default class NewStudentForm extends Component {
  render() {
    return (
      <form>
        <label htmlFor="firstName">First Name</label>
        <input type="text" name="firstName" />
        <label htmlFor="lastName">Last Name</label>
        <input type="text" name="lastName" />
        <label htmlFor="email">Email</label>
        <input type="text" name="email" />
        <button type="submit">Submit</button>
      </form>
    )
  }
}