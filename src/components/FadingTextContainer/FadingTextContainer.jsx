import styles from "./FadingTextContainer.module.css";
import { useEffect } from "react";
function FadingTextContainer({ title, children }) {

    useEffect(() => {
        const handleScroll = () => {

            const fadingTextContainer = document.querySelector(`.${styles.fading_text_container}`);
            const fadingTextContainerTop = fadingTextContainer.getBoundingClientRect().top;
            const fadingTextContainerBottom = fadingTextContainer.getBoundingClientRect().bottom;
            const fadingTextContainerHeight = fadingTextContainerBottom - fadingTextContainerTop;
            const fadingTextContainerMiddle = fadingTextContainerTop + (fadingTextContainerHeight / 2);

            const windowTop = window.innerHeight;
            const windowBottom = 0;

            const fadingTextContainerMiddleInWindow = fadingTextContainerMiddle < windowTop && fadingTextContainerMiddle > windowBottom;

            if (fadingTextContainerMiddleInWindow) {
                const fadingTextContainerMiddleInWindowPercentage = (fadingTextContainerMiddle - windowBottom) / (windowTop - windowBottom);
                const fadingTextContainerMiddleInWindowPercentageCapped = Math.min(Math.max(fadingTextContainerMiddleInWindowPercentage, 0), 1);
                const fadingTextContainerMiddleInWindowPercentageCappedInverted = 1 - fadingTextContainerMiddleInWindowPercentageCapped;
                fadingTextContainer.style.opacity = fadingTextContainerMiddleInWindowPercentageCappedInverted;
            } else {
                fadingTextContainer.style.opacity = 1;
            }
        };

        // Attach the event listener when the component mounts
        window.addEventListener("scroll", handleScroll);

        
    }, []);
    return (
        <div className={styles.fading_text_container}>
            <h1>{title}</h1>
            <p>{children}</p>
        </div>
    )
}

export default FadingTextContainer