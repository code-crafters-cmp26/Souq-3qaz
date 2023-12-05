import React from 'react'
import styles from './Settings.module.css'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
function Settings() {
    return (
        <div className={styles.settings}>
            <h1>Settings</h1>
            <form className={styles.form}>
                <h2>Personal Info</h2>
                <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" className={styles.avatar} />
                <Input text="Change Picture" type="file" />
                <Input text="Username" type="text" />
                <Input text="First Name" type="text" />
                <Input text="Last Name" type="text" />
                <Input text="Email" type="email" />
                <Input text="Phone Number" type="tel" />
                <Input text="Password" type="password" />
                <Input text="Confirm Password" type="password" />
                <Button text="Save Changes" />
            </form>

            <form className={styles.form}>
                <h2>Address</h2>
                <Input text="Address1" type="text" />
                <Input text="Address2" type="text" />
                <Input text="City" type="text" />
                <Input text="State" type="text" />
                <Input text="Zip Code" type="number" />
                <Button text="Save Changes" />
            </form>
            <form className={styles.form}>
                <h2>Payment Info</h2>
                <Input text="Card Number" type="number" />
                <Input text="Expiration Date" type="date" />
                <Input text="CVV" type="password" />
                <Button text="Save Changes" />
            </form>

            {/*Account Deletion*/}
            <form className={styles.form + " " + styles.delete}>
                <h2>Account Deletion</h2>
                <Input text="Password" type="password" />
                <Input text="Confirm Password" type="password" />
                <Button text="Delete Account" />
            </form>



        </div>
    )
}

export default Settings