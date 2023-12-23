import styles from "./FadingTextContainer.module.css";
//import ScrollAnimation from 'react-animate-on-scroll';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
function FadingTextContainer({ title, children }) {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <div className={styles.fading_text_container} data-aos="fade-in">
      <h1>{title}</h1>
      <p>{children}</p>
    </div>
  );
}

export default FadingTextContainer;
