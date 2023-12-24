import styles from "./Settings.module.css";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { useAuth } from "../../components/AuthProvider/AuthProvider";
import { useState } from "react";
function Settings() {

  const { userData } = useAuth();
  const [img, setImg] = useState(null);


  const handleChange = (event) => {
    setInput(event.target.value);
  };


  return (
    <div className={styles.settings}>
      <h1>Settings</h1>
      <form className={styles.form}>
        <h2>Personal Info</h2>
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="Avatar"
          className={styles.avatar}
        />
        <Input text="Change Picture" type="file"/>
        <Input text="First Name" type="text" initialVal={userData?.firstname} />
        <Input text="Last Name" type="text" initialVal={userData?.lastname} />
        <Input text="Email" type="email" initialVal={userData?.email} />
        <Input text="Phone Number" type="tel" initialVal={userData?.phonenumber} />
        <Input text="Password" type="password" />
        <Input text="Confirm Password" type="password" />
        <Button text="Save Changes" />
      </form>

      <form className={styles.form}>
        <h2>Address</h2>
        <Input text="#Apt." type="text" initialVal={userData?.appartmentnumber} />
        <Input text="#Building" type="text" initialVal={userData?.buildingnumber} />
        <Input text="Country" type="text" initialVal={userData?.country} />
        <Input text="City" type="text" initialVal={userData?.city} />
        <Input text="Street" type="text" initialVal={userData?.street} />
        <Button text="Save Changes" />
      </form>
      <form className={styles.form + " " + styles.delete}>
        <h2>Account Deletion</h2>
        <Input text="Password" type="password" />
        <Input text="Confirm Password" type="password" />
        <Button text="Delete Account" />
      </form>
    </div>
  );
}

export default Settings;
