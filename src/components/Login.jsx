import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div>
      <div>
        <form className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
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
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              name="password"
              id="password1"
              type="password"
              required={true}
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button type="submit">Login</Button>
        </form>
        <div className="text-center mt-3">
          <p>
            Not have a account ?{" "}
            <span className="underline-offset-4 text-blue-600 underline">
              <Link to="/register">Register Here</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
