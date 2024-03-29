import React, { useState} from "react";
import styles from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [signupErrorMessage, setSignupErrorMessage] = useState("");

  const [isSignUpLoading, setIsSignUpLoading] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const [activeMode, setActiveMode] = useState("signup");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitSignUpForm = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setSignupErrorMessage("Passwords do not match");
      setFormData({
        ...formData,
        password: "",
        confirmPassword: "",
      });
      return;
    }

    setIsSignUpLoading(true);

    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === "FAIL") {
          setSignupErrorMessage(data.message);
          setIsSignUpLoading(false);
        } else {
          // localStorage.setItem("jwt", data.token);
          // navigate("/dashboard");
          
          console.log("Account Created");
          setSignupErrorMessage("Account Created");
          alert("Account has been created,You can login in Now");
          setIsSignUpLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSubmitLoginForm = (e) => {
    e.preventDefault();
    setIsLoginLoading(true);
    // console.log("fucntion started");
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === "FAIL") {
          setLoginErrorMessage(data.message);
          console.log(data.message);
          setIsLoginLoading(false);
          setFormData({
            ...formData,
            password: "",
          });
        } else {
          localStorage.setItem("jwt", data.token);
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    console.log("function stopped");

  };

  

  

  

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.subContainer}>
          <div className={styles.logo}>QUIZZIE</div>
          <div className={styles.modeSwitch}>
            <button
              className={`${styles.signUpMode} ${
                activeMode === "signup" ? styles.activeMode : ""
              }`}
              onClick={() => setActiveMode("signup")}
            >
              Sign Up
            </button>
            <button
              className={`${styles.logInMode} ${
                activeMode === "login" ? styles.activeMode : ""
              }`}
              onClick={() => setActiveMode("login")}
            >
              Log In
            </button>
          </div>

          {activeMode === "signup" && (
            <div className={styles.signUpFormContainer}>
              <form
                action={`${process.env.REACT_APP_API_BASE_URL}/api/signup`}
                method="POST"
                onSubmit={handleSubmitSignUpForm}
                className={styles.formContainer}
              >
                <div className={styles.formAttribute}>
                  <label htmlFor="name" className={styles.formLabel}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formAttribute}>
                  <label htmlFor="email" className={styles.formLabel}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formAttribute}>
                  {" "}
                  <label htmlFor="password" className={styles.formLabel}>
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formAttribute}>
                  <label htmlFor="confirmPassword" className={styles.formLabel}>
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className={styles.formInput}
                  />
                </div>
                {signupErrorMessage && (
                  <div className={styles.errorMessageLabel}>
                    {signupErrorMessage}
                  </div>
                )}
                <button
                  type="submit"
                  className={styles.signUpBtn}
                  onClick={handleSubmitSignUpForm}
                >
                  {isSignUpLoading ? "Loading..." : "Sign Up"}
                </button>
              </form>
            </div>
          )}

          {activeMode === "login" && (
            <div className={styles.logInFormContainer}>
              <form
                action={`${process.env.REACT_APP_API_BASE_URL}/api/login`}
                method="POST"
                onSubmit={handleSubmitLoginForm}
                className={styles.formContainer}
              >
                <div className={styles.formAttribute}>
                  {" "}
                  <label htmlFor="email" className={styles.formLabel}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formAttribute}>
                  <label htmlFor="password" className={styles.formLabel}>
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={styles.formInput}
                  />
                </div>

                {loginErrorMessage && (
                  <div className={styles.errorMessageLabel}>
                    {loginErrorMessage}
                  </div>
                )}

                <button type="submit" className={styles.signUpBtn}>
                  {isLoginLoading ? "Loading..." : "Log In"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SignUp;
