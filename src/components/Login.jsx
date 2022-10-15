import {
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  TwitterAuthProvider,
} from "firebase/auth";
import { Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import app from "../firebase/firebase.init";
const Login = () => {
  const auth = getAuth(app);
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [user, setUser] = useState({});
  const handleSignIn = (event) => {
    event.preventDefault();
    setLogin(false);
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        setLogin(true);
        toast("Login Success", { autoClose: 1000 });
        form.reset();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Login Faild", { autoClose: 1000 });
      });
  };

  const handleBlur = (event) => {
    const email = event.target.value;
    setEmail(email);
  };

  const forgetPass = () => {
    if (!email) {
      toast.info("Enter You email to reset password", { autoClose: 1000 });
    } else {
      sendPasswordResetEmail(auth, email).then(() => {
        toast.success("Password Reset Email Sent", { autoClose: 1000 });
      });
    }
  };
  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const loginWithTwitter = () => {
    const provider = new TwitterAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        console.error(error);
        setUser({});
      });
  };
  return (
    <div>
      <div>
        <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              onBlur={handleBlur}
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
          {login && (
            <div className="flex items-center gap-2 ">
              <p className="text-green-400">Login Success</p>
            </div>
          )}
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
        <div className="text-center mt-3">
          <p>
            Forget Password ?{" "}
            <span className="underline-offset-4 text-blue-600 underline">
              <button onClick={forgetPass}>Click Here</button>
            </span>
          </p>
        </div>
        {user.uid ? (
          <div
            className="text-center border w-9/12 mx-auto my-4 border-blue-500 py-2 cursor-pointer"
            onClick={handleSignOut}
          >
            <div>
              <p>Sign Out</p>
            </div>
          </div>
        ) : (
          <div>
            <div
              className="text-center border w-9/12 mx-auto my-4 border-blue-500 py-2 cursor-pointer"
              onClick={loginWithGoogle}
            >
              <div>
                <p>Sign In With Google</p>
              </div>
            </div>
            <div
              className="text-center border w-9/12 mx-auto my-4 border-blue-500 py-2 cursor-pointer"
              onClick={loginWithTwitter}
            >
              <div>
                <p>Sign In With Twitter</p>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-center text-center">
          {user.providerData.forEach((profile) => {
            console.log("Sign-in provider: " + profile.providerId);
            console.log("  Provider-specific UID: " + profile.uid);
            console.log("  Name: " + profile.displayName);
            console.log("  Email: " + profile.email);
            console.log("  Photo URL: " + profile.photoURL);
          })}
        </div>
      </div>
    </div>
  );
};

export default Login;
