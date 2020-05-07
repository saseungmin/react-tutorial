import React from 'react';
import styles from './CssModule.module.scss';

const CSSModule = () => {
    console.log(styles.wrapper);
    return (
        <div className={`${styles.wrapper} ${styles.inverted}`}>
            안녕하세요. 저는 <span className="something">CssModule!</span>
        </div>
    );
};

export default CSSModule;