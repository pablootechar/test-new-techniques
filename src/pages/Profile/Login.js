import React, { useState } from "react";
import axios from "axios";
import "./css/Login.css";
import { SHA512 } from "crypto-js";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { shade } from "polished";

const SlideTab = styled.div`
  position: absolute;
  height: 100%;
  width: 50%;
  left: 0;
  z-index: 0;
  border-radius: 5px;
  background: -webkit-linear-gradient(
    left,
    ${({ theme }) => theme.representativeColor},
    ${({ theme }) => theme.colors.themeTextColor}
  );
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
`;

const InputForm = styled.input`
  height: 100%;
  width: 100%;
  color: #000;
  outline: none;
  padding-left: 15px;
  border-radius: 5px;
  border: 1px solid ligthgrey;
  border-bottom-width: 2px;
  font-size: 17px;
  transition: all 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.representativeColor};
  }

  &::placeholder {
    color: #999;
    transition: all 0.3s ease;
  }
`;

const ForgotPasswordLink = styled.div`
  margin-top: 5px;

  & > p {
    color: ${({ theme }) => theme.representativeColor};
    text-decoration: underline;
    cursor: pointer;
    margin: 5px;
  }

  & > p:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const FormButton = styled.button`
  height: 50px;
  width: 100%;
  border-radius: 5px;
  background: ${({ theme }) => shade(0.2, theme.representativeColor)};
  transition: 0.2s;
  font-size: 22px;
  color: #f5f5f5;
`;

export default function Login() {
  const [values, setValues] = useState();
  const [userErrorInfos, setUserErrorInfos] = useState(false);

  const cancelRefresh = (e) => {
    e.preventDefault();
  };

  function signupBtn() {
    alterar_url("/profile/register");
    const loginForm = document.querySelector("form.login");
    loginForm.style.marginLeft = "-50%";
  }
  function loginBtn() {
    alterar_url("/profile/login");
    const loginForm = document.querySelector("form.login");
    loginForm.style.marginLeft = "0%";
  }

  function setErrorInfos() {
    setUserErrorInfos(true);
    const inputEmail = document.querySelector("#login-input-email");
    const inputPass = document.querySelector("#login-input-pass");
    inputEmail.style.border = "2px solid #ff0000";
    inputPass.style.border = "2px solid #ff0000";
  }

  function checkUser(data) {
    const email = SHA512(data?.email).toString();
    const password = SHA512(data?.senha).toString();

    if (data.email !== "" && data.senha !== "") {
      axios
        .get(`https://animatrix-api.vercel.app/login/${email}`)
        .then((response) => {
          response.data.map((info) => {
            if (info.email === email && info.password === password) {
              localStorage.setItem(
                "@animatrix/profile",
                JSON.stringify({
                  id: info?.id,
                  email: data?.email,
                  password: data?.senha,
                })
              );
              window.location.href = "/home";
            } else {
              setErrorInfos(true);
            }
          });
        });
    }
  }

  function loginClick() {
    checkUser(values);
  }

  const handelChangeLogin = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleChange = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const sendRegister = () => {
    const email = SHA512(values?.email).toString();
    const password = SHA512(values?.senha).toString();

    axios
      .get(`https://animatrix-api.vercel.app/login/${email}`)
      .then((response) => {
        if (response.data.length === 0) {
          axios
            .post("https://animatrix-api.vercel.app/insertuser", {
              name: values.nome,
              email: email,
              password: password,
              photoId: 1,
              isPremium: 0,
              isAdmin: 0,
            })
            .then((response) => {
              console.log(response);
            });
          window.location.href = "/login";
        } else {
          alert("Esse email já existe");
        }
      });
  };

  function alterar_url(nova) {
    window.history.pushState({}, null, nova);
  }

  return (
    <div className="wrapper-pai">
      <div className="wrapper">
        <div className="form-container">
          <div className="slide-controls">
            <input type="radio" name="slide" id="login" />
            <input type="radio" name="slide" id="signup" />
            <label
              htmlFor="login"
              onClick={() => {
                loginBtn();
              }}
              className="slide login"
            >
              Sign in
            </label>
            <label
              htmlFor="signup"
              onClick={() => {
                signupBtn();
              }}
              className="slide signup"
            >
              Sign up
            </label>
            <SlideTab className="slider-tab" />
          </div>
          <div className="form-inner">
            <form className="login" onSubmit={cancelRefresh}>
              <div className="field">
                <InputForm
                  type="text"
                  placeholder="Email Address"
                  autoComplete="off"
                  name="email"
                  id="login-input-email"
                  onChange={handelChangeLogin}
                  required
                />
              </div>
              <div className="field">
                <InputForm
                  type="password"
                  placeholder="Password"
                  autoComplete="off"
                  name="senha"
                  id="login-input-pass"
                  onChange={handelChangeLogin}
                  required
                />
              </div>
              {userErrorInfos === true && (
                <div className="div user-error">
                  <span>Invalid username or password</span>
                </div>
              )}
              <Link to="/settings/recovery-password/">
                <ForgotPasswordLink>
                  <p>Forgot your password?</p>
                </ForgotPasswordLink>
              </Link>
              <FormButton
                onClick={() => {
                  loginClick();
                }}
              >
                Login
              </FormButton>
            </form>
            <form className="signup" onSubmit={cancelRefresh}>
              <div className="field">
                <InputForm
                  type="text"
                  placeholder="Your name"
                  autoComplete="off"
                  name="nome"
                  onChange={handleChange}
                  tabIndex={-1}
                  required
                />
              </div>
              <div className="field">
                <InputForm
                  type="text"
                  placeholder="Email Address"
                  name="email"
                  onChange={handleChange}
                  tabIndex={-1}
                  required
                />
              </div>
              <div className="field">
                <InputForm
                  type="password"
                  placeholder="Password"
                  name="senha"
                  onChange={handleChange}
                  tabIndex={-1}
                  required
                />
              </div>
              <div className="field">
                <InputForm
                  type="password"
                  placeholder="Confirm password"
                  name="confirm-senha"
                  tabIndex={-1}
                  required
                />
              </div>
              <FormButton
                onClick={() => {
                  sendRegister();
                }}
                tabIndex={-1}
              >
                Sign Up
              </FormButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
