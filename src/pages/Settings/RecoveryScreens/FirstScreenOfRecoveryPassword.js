import React, { useState } from "react";
import DatabaseApi from "../../../shared/DatabaseApi";
import emailjs from '@emailjs/browser';
import { SHA512 } from "crypto-js";
import { RecoveryButton, RecoveryForm, RecoveryInput } from "../components";

export const FirstScreenOfRecoveryPassword = () => {
  const [userInfo, setUserInfo] = useState();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [values, setValues] = useState({});

  function setEmailValue(param) {
    setValues(() => ({
      [param?.target?.name]: param?.target?.value,
    }));
  }

  async function setEssentialInfo(value, item) {
    const cryptEmail = SHA512(values.email).toString();
    let infoUser = await DatabaseApi.isLogged(cryptEmail);
    console.log(userInfo)
    setEmail(cryptEmail);
    return setUserInfo(
      typeof infoUser !== "undefined" ? infoUser : "No email was found"
    );
  }

  function randomHex() {

    const seed = [0xa2, 0xd9, 0xe5, 0x5a];

    const MUAHAHA_TABLE = [
      0x62, 0xd6, 0xa7, 0xce, 0x89, 0xe8, 0x1f,
      0x9c, 0xf2, 0x05, 0x2b, 0x36, 0x0d, 0x98,
      0x4d, 0x64, 0x14, 0x57, 0x7e, 0xc1, 0x2d,
      0x23, 0xd3, 0x91, 0x50, 0xbe, 0xe2, 0x55,
      0xe3, 0x0f, 0x44, 0x9a, 0xd8, 0x84, 0xb5,
      0xa8, 0x5d, 0x0e, 0x8c, 0x61, 0xa7, 0x8f,
      0x3a, 0x97, 0x6e, 0x73, 0xcf, 0x42, 0x16,
      0x52, 0x2a, 0xc2, 0xfb, 0x3d, 0x68, 0x83,
      0x26, 0x4a, 0x96, 0xd7, 0x8d, 0xb9, 0x71,
      0x45, 0xc3, 0x12, 0x7a, 0xf5, 0x5c, 0xc5,
      0x1c, 0x67, 0xae, 0xba, 0x75, 0xdb, 0x6b,
      0x20, 0x3e, 0x9d,
    ];

    let hex = '';

    for (let i = 0; i < 4; i++) {
      const randomNum = Math.floor(Math.random() * 256);
      let key = randomNum ^ seed[i] ^ MUAHAHA_TABLE[randomNum % 75] + i;
      hex += key.toString(16).padStart(2, '0');
    }
    return hex.toUpperCase();
  }

  async function sendEmail(e) {
    e.preventDefault();
    setEssentialInfo();

    if (values.email === "") {
      alert("Fill in all fields");
      return;
    }

    const key = randomHex();

    if (typeof userInfo !== "undefined") {
      if (
        userInfo !== "No email was found" &&
        userInfo?.name !== "Default" &&
        userInfo?.email === email
      ) {
        await DatabaseApi.insertRecoveryCode(email, key);

        const templateParams = {
          from_name: userInfo?.name,
          message: key,
          email: values?.email,
        };

        emailjs
          .send(
            "service_qordmib",
            "template_mb6emuo",
            templateParams,
            "1Ibi_WbcXfMudvwsT"
          )
          .then(
            (response) => {
              localStorage.setItem("@animatrix/recovery/email", email);
              setUserInfo(undefined);
              setError("");
              window.location.href = "/settings/recovery-password/click-the-ok-button-to-proceed";
            },
            (err) => {
              console.log("Error: ", err);
            }
          );


      } else {
        return setError(
          "Email not found. Make sure you typed it in correctly, or complete your registration."
        );
      }
    }
  }

  return (
    <RecoveryForm onSubmit={setEssentialInfo}>
        <h1>Recovery password</h1>
        <div>
          <RecoveryInput
            className={error !== "" ? "input-error" : "input"}
            name="email"
            id="email"
            type="text"
            placeholder="Email:"
            onChange={(e) => setEmailValue(e)}
            value={values.email}
            autoComplete="off"
          />
          {error !== "" && <span className="label error">{error}</span>}
        </div>
        <RecoveryButton type="submit" onClick={(e) => sendEmail(e)}>Recovery</RecoveryButton>
    </RecoveryForm>
  );
};