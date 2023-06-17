import React, { ReactNode, useState, HTMLAttributes } from 'react';
import styles from '../styles/tooltip.module.css'

interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  text:String;
}

const Tooltip:React.FC<TooltipProps> = ({ children, text, ...rest }) => {
  const [show, setShow] = React.useState(false);

  return (
    <div>
      <div className={styles['tooltip']} style={show ? { visibility: "visible" } : {}}>
        {text}
        <span className={styles['tooltip-arrow']} />
      </div>
      <div
        {...rest}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </div>
    </div>
  );
}

export default Tooltip;
