import {useState} from "react";
import Input from "./Input.jsx";

export default function StateLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [edited, setEdited] = useState({
    email: false,
    password: false,
  });

  const emailIsInvalid = edited.email && !formData.email.includes('@');
  const passwordIsInvalid = edited.password && formData.password.length < 6;

  function handleSubmit(event) {
    event.preventDefault();

    console.log(`User info - Email: ${formData.email} Password: ${formData.password}`);
  }

  function handleInputBlur(key) {
    setEdited(prevState => ({
      ...prevState,
      [key]: true,
    }));
  }

  function handleInputChange(key, value) {
    setFormData(prevData => ({
      ...prevData,
      [key]: value,
    }));

    setEdited(prevState => ({
      ...prevState,
      [key]: false,
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          onBlur={() => handleInputBlur('email')}
          onChange={(e) => handleInputChange('email', e.target.value)}
          value={formData.email}
          error={emailIsInvalid && 'Please enter a valid email address.'}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          onBlur={() => handleInputBlur('password')}
          onChange={(e) => handleInputChange('password', e.target.value)}
          value={formData.password}
          error={passwordIsInvalid && 'Please enter a valid password.'}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
