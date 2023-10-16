import React, { useState } from "react";
import DatabaseApi from "../../../shared/DatabaseApi";

export const ThirdScreenOfRecoveryPassword = () => {
  const [error, setError] = useState("");
  const [code, setCode] = useState("");

  function handleInputChange(e) {
    const value = e.target.value.toUpperCase();
    setCode(value);
  }

  async function checkCode(inputCode) {
    let cryptEmail = localStorage.getItem("@animatrix/recovery/email");

    const returnDatabase = await DatabaseApi.requestRecoveryCode(
      cryptEmail,
      code
    );

    if (returnDatabase?.email === cryptEmail && returnDatabase?.code === code) {
      // Code is correct
      window.location.href = "/settings/recovery-password/enter-new-password";
    } else {
      setError("The code entered is wrong!");
    }
  }

  return (
    <form>
      <h3>Please enter the 8-digit code.</h3>
      <div>
        <input
          className={error !== "" ? "code error" : "input"}
          maxLength="8"
          value={code}
          onChange={(e) => handleInputChange(e)}
        />
        {error !== "" && <span className="label error">{error}</span>}
      </div>
      <div
        onClick={() => {
          if (code?.length === 8) {
            checkCode(code);
            setError("");
          }
        }}
      >
        Verify
      </div>
    </form>
  );
};