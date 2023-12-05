
import styles from "./About.module.css";
import FadingTextContainer from "../../components/FadingTextContainer/FadingTextContainer";

const About = () => {
  return (
    <div className={styles.about}>
      <div className={styles.cover}>
      </div>
      <FadingTextContainer title="About Souq 3oqaz">
        <p>Welcome to Souq 3oqaz, your one-stop destination for all your online shopping needs. We are dedicated to providing you with the best shopping experience, offering a wide range of products at competitive prices.</p>
      </FadingTextContainer>
      <FadingTextContainer title="Our Story">
        <p>Souq 3oqaz was founded in 2023 by a group of entrepreneurs who wanted to revolutionize the online shopping experience in the Middle East. We are a team of passionate engineers who are committed to providing our customers with the best online shopping experience.</p>
      </FadingTextContainer>
      <FadingTextContainer title="Our Mission">
        <p>Our mission is to provide our customers with the best online shopping experience. We are committed to providing our customers with a wide range of products at competitive prices. We are also committed to providing our customers with the best customer service.</p>
      </FadingTextContainer>
      <FadingTextContainer title="Our Vision">
        <p>Our vision is to be the leading online shopping destination in the Middle East.</p>
      </FadingTextContainer>

    </div>
  );
};

export default About;
