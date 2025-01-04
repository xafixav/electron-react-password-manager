import React, { useState } from 'react';
import './main.css';

type PasswordOptions = {
  symbols: boolean;
  numbers: boolean;
  uppercase: boolean;
  lowercase: boolean;
};

function Main() {
  const [passwordSize, setPasswordSize] = useState(6);
  const [passwordOptions, setPasswordOptions] = useState({
    symbols: true,
    numbers: true,
    uppercase: true,
    lowercase: true,
  } as PasswordOptions);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target as HTMLInputElement;
    if (name === 'passwordSize') {
      const newSize = Number(value);
      if (!Number.isNaN(newSize)) return setPasswordSize(newSize);
    }
    return setPasswordOptions((prevState) => ({
      ...prevState,
      [`${name}`]: checked,
    }));
  };

  const options = () => {
    const keys = Object.keys(passwordOptions);
    const response = keys.map((el) => {
      if ((passwordOptions as any)[`${el}`] === false) {
        return <p>false</p>;
      }
      return <p>true</p>;
    });
    // console.log(passwordOptions);
    return response;
  };

  return (
    <div className="main_container">
      <div className="main_password">
        <h1>PASSSWORD SIZE?</h1>
        <input
          type="number"
          name="passwordSize"
          onChange={handleChange}
          value={passwordSize}
        />
      </div>

      <div className="main_options">
        <h1>OPTIONS</h1>
        <p className="main_options_checkbox_p">Symbols</p>
        <input
          type="checkbox"
          name="symbols"
          onChange={handleChange}
          checked={passwordOptions.symbols}
        />

        <p className="main_options_checkbox_p">Numbers</p>
        <input
          type="checkbox"
          name="numbers"
          onChange={handleChange}
          checked={passwordOptions.numbers}
        />

        <p className="main_options_checkbox_p">UpperCase</p>
        <input
          type="checkbox"
          name="uppercase"
          onChange={handleChange}
          checked={passwordOptions.uppercase}
        />

        <p className="main_options_checkbox_p">LowerCase</p>
        <input
          type="checkbox"
          name="lowercase"
          onChange={handleChange}
          checked={passwordOptions.lowercase}
        />
      </div>
      <p>{passwordSize}</p>
      <div>{options()}</div>
    </div>
  );
}

export default Main;
