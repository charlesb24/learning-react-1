import {useState} from "react";

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
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onBlur={() => handleInputBlur('email')}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
          <div className="control-error">
            { emailIsInvalid && <p>Please enter a valid email address.</p> }
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onBlur={() => handleInputBlur('password')}
            onChange={(e) => handleInputChange('password', e.target.value)}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
