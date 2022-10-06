import { StyleSheet, Text, View } from "react-native";
import { ChangeEvent, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const editEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const editPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const submitForm = () => {
    // query firebase
  };

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.centered_text, ...styles.h1_heading }}>
        Welcome back!
        <br />
        Please login.
      </Text>

      <form style={styles.form_container}>
        <div>
          <Text style={styles.h4_heading}>Email</Text>

          <div style={styles.centered_text}>
            <input
              onChange={editEmail}
              className="input"
              style={styles.form_field}
              value={email}
              type="text"
            />
          </div>
        </div>

        <div>
          <Text style={styles.h4_heading}>Password</Text>

          <div style={styles.centered_text}>
            <input
              onChange={editPassword}
              className="input"
              style={styles.form_field}
              value={password}
              type="password"
            />
          </div>
        </div>

        <div style={styles.centered_text}>
          <button
            onClick={submitForm}
            style={{ ...styles.form_button, ...styles.h4_heading }}
            className="btn"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>

      <Text>Don't have an account? {<a href={"./Signup"}>Sign up.</a>} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  centered_text: {
    textAlign: "center",
  },
  h1_heading: {
    fontSize: 30,
    fontWeight: "bold",
  },
  h4_heading: {
    fontSize: 14,
    fontWeight: "bold",
  },
  form_container: {
    width: "80%",
    height: "50%",
  },
  form_field: {
    width: "100%",
    borderColor: "#f2f2f2",
    backgroundColor: "#f2f2f2",
    padding: "5px",
    margin: "10px"
  },
  form_button: {
    width: "100%",
    borderColor: "#d9d9d9",
    backgroundColor: "#d9d9d9",
    padding: "5px",
    margin: "10px"
  }
});
