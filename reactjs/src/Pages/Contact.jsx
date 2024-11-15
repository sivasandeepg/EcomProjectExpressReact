//rafce
import React from 'react'
 

const Contact = () => {
  return (
    <div class="container">
    <h2>Vertical (basic) Form</h2>
    <form>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" class="form-control" id="email" placeholder="Enter email"/>
      </div>
      <div class="form-group">
        <label for="pwd">Password:</label>
        <input type="password" class="form-control" id="pwd" placeholder="Enter password"/>
      </div>
      <div class="checkbox">
        <label><input type="checkbox"/> Remember me</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button> 
    </form>
  </div> 
  )
}
 
export default Contact