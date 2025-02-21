import {useState} from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  function handleSubmit(event) {
    event.preventDefault();

    console.log(`User info - Email: ${formData.email} Password: ${formData.password}`);
  }

  function handleInputChange(key, value) {
    setFormData(prevData => ({
      ...prevData,
      [key]: value,
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
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
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
