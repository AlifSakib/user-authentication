import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import app from "../firebase/firebase.init";
const auth = getAuth(app);
const Register = () => {
  const [errorPass, setErrorPass] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setErrorPass("Password should contain atleast two uppercase character");
      return;
    }

    if (!/(?=.*[!@#$&*])/.test(password)) {
      setErrorPass("Password should contain altleast one special character");
      return;
    }

    if (!/(?=.*[0-9].*[0-9])/.test(password)) {
      setErrorPass("Password should contain alteast two digits");
      return;
    }
    if (!/.{8}/.test(password)) {
      setErrorPass("Password length should be more theb 8 character");
      return;
    }
    setErrorPass("");

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Enter your email here" />
            </div>
            <TextInput
              id="email1"
              type="email"
              name="email"
              placeholder="name@gmail.com"
              required={true}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Enter your password" />
            </div>
            <TextInput
              name="password"
              id="password1"
              type="password"
              required={true}
            />
          </div>

          <div className="flex items-center gap-2 text-red-600 ">
            <p>{errorPass}</p>
          </div>
          <Button type="submit">Registration</Button>
        </form>
        <div className="text-center mt-3">
          <p>
            Already have an account ?{" "}
            <span className="underline-offset-4 text-blue-600 underline">
              <Link to="/login">Login Here</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
