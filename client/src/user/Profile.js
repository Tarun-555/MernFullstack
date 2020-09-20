import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";
import { read, update, updateUser } from "./apiUser";
import {signup} from "../auth"

const Profile = ({ match }) => {
  
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    success: false,
  });

  const { token } = isAuthenticated(); 
  const { name, email, password, error, success } = values;

  const init = (userId) => {
    // console.log(userId);
    read(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({ ...values, name: data.name, email: data.email });
      }
    });
  };

  useEffect(() => {
    init(match.params.userId); 
  }, []);

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
     //console.log("v",values);
    update(match.params.userId, token, { name, email, password })
     .then(
      (data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log("he",data);
          updateUser(data, () => {
            setValues({
              ...values,
              name: data.name,
              email: data.email,
              //password:data.password,
              success: true,
            });
          });
        }
      }
    );
    
  };

  const redirectUser = (success) => {
    if (success) {
      return <Redirect to="/" />;
    }
  };

  const profileUpdate = (name, email, password) => (
    <form align="left" className="card w-50 w-sm-100">
      <div className="card-body">
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            onChange={handleChange("name")}
            className="form-control"
            value={name}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            type="email"
            onChange={handleChange("email")}
            className="form-control"
            value={email}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            type="password"
            onChange={handleChange("password")}
            className="form-control"
            value={password}
          />
        </div>

        <button onClick={clickSubmit} className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );

  return (
    <Layout
      className="container"
    >
      <div align="center" className="my-4">
        <h2 className="mb-4">Profile update</h2>
        {profileUpdate(name, email, password)}
        {redirectUser(success)}
      </div>
    </Layout>
  );
};

export default Profile;
