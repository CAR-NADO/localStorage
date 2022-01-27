import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './Header.css';
const Header = () => {
  const [userList, setUserList] = useState([]);
  // console.log(userList.length);
  let arr = JSON.parse(localStorage.getItem('users')) || [] ;
  const [error, setError] = useState("");
  const [errorE, setErrorE] = useState("");
  const [errorN, setErrorN] = useState("");
  const [errorP, setErrorP] = useState("");

  const [userRegistration, setUserRegistration] = useState({
    username: "",
    email: "",
    number: "",
    password: ""
  });
  const { username, number, password, email } = userRegistration
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value);
    setUserRegistration({ ...userRegistration, [name]: value });
  }

  useEffect(()=> {
      setUserList(JSON.parse(localStorage.getItem("users")))
    // JSON.parse --> will convert json to object
    // JSON.stringfy --> will convert object to json
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validation call
    if (username.length === 0) {
      setError("Please enter the username")
    }
    else if (username.length <= 3 || username.length >= 16) {
      setError("")
      setError("Username should be 3 to 16 characters")
    }
    else if (email.length === 0) {
      setError("")
      setErrorE("Please enter your email")
    }
    else if (number.length === 0) {
      setErrorE("")

      setErrorN("Please enter your mobile number")
    }
    else if (number.length != 10) {
      setErrorN("")
      setErrorN("Number should be 10 digit")
    }
    else if (password.length === 0) {
      setErrorN("")
      setErrorP("Please enter the password")
    }
    else if (password.length <= 4 || password.length >= 12) {
      setErrorP("")
      setErrorP("Password should be 4 to 12 characters")
    }
    else {
      setErrorP("")
      // console.log("data storage in localStorage", userRegistration);
      // Data store in Local Storage
      // arr.push(userRegistration, userRegistration.id = 1)
      arr.push(userRegistration)
      // console.log("array",arr);
      // console.log("local storage setItem",localStorage.setItem("users", JSON.stringify(arr)));
      localStorage.setItem("users", JSON.stringify(arr));
    }
  }
  const handleDelete = (id) => {

  };
  // console.log("userList", userList);
  return (
    <div className="App">
      <header className="App-header">
        <div className="registration_form">
          <div className="form_header">
            <h3>[Registration Form:]</h3>
          </div>
          <div className="form_name">
            <h5>Full Name:</h5>
            <input type="text"
              autoComplete='off'
              placeholder='Enter Your Name'
              name='username'
              required
              value={userRegistration.username}
              onChange={handleInput}
              id='a' />
            <p className='error'>{error}</p>
          </div>

          <div className="email">
            <h5>Email:</h5>
            <input type="text"
              autoComplete='off'
              placeholder='Enter Your Email'
              name='email'
              required
              value={userRegistration.email}
              onChange={handleInput} />
            <p className='error'>{errorE}</p>
          </div>

          <div className="mobile_number">
            <h5>Mobile Number:</h5>
            <input type="number"
              autoComplete='off'
              placeholder='Mobile Number'
              name='number'
              required
              value={userRegistration.number}
              onChange={handleInput} />
            <p className='error'>{errorN}</p>
          </div>

          <div className="password">
            <h5>Password:</h5>
            <input type="password"
              autoComplete='off'
              placeholder='Password'
              name='password'
              required
              value={userRegistration.password}
              onChange={handleInput} />
            <p className='error'>{errorP}</p>
          </div>

          <div className="button">
            <button type='submit' onClick={handleSubmit} >Registration</button>
          </div>
        </div>
        <div className="right_container">
          { 
            userList &&
            userList.map((data, i) => {
              // console.log("data",data);
            
              const { number, email, username, id } = data;
              // console.log("data",data)
              return (
                <div className="card" key={i} >
                  <div className="data">
                    <div className="id_data">
                      <h3 id='h3'>ID:</h3> <h5 id='h02'>{i}</h5>
                    </div>
                    <div className="name_data">
                      <h3 id='h3'>Username:</h3> <h5 id='h01'>{username}</h5>
                    </div>
                    <div className="email_data">
                      <h3 id='h3'>Email:</h3> <h5 id='h03'>{email}</h5>
                    </div>
                    <div className="mob_data">
                      <h3 id='h3'>Phone:</h3> <h5 id='h5'>{number}</h5>
                    </div>
                  </div>
                  <div className="add_delete_btn">
                    <button className='edit_button' onClick={() => handleDelete(id)}>Delete:
                    </button>
                    <Link to={`/update/${id}`}>
                      <button className='update_button'>Edit:</button>
                    </Link>
                  </div>
                </div>
              )
            })
          }
        </div>
      </header>
    </div>
  );
}
export default Header;