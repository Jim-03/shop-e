import styles from "./LoginForm.module.css";
import { FaUser } from "react-icons/fa";
import { FaKey } from "react-icons/fa";

function LoginForm() {
  return (
    <form className={styles.loginForm}>
      <h1>Login</h1>
      <label htmlFor="username">Username</label>
      <div>
        <FaUser className={styles.icons} />
        <input type="text" id="username" placeholder="Username" />
      </div>
      <label htmlFor="password">Password</label>
      <div>
        <FaKey className={styles.icons} />
        <input type="password" id="password" placeholder="Password" />
      </div>
      <button>Login</button>
      <a href="#">Create account</a>
    </form>
  );
}

export default LoginForm;
