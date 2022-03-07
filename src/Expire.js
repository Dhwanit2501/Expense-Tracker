import React, { useEffect, useState } from "react";
import './style.css'

const Expire = props => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, props.delay);
  }, [props.delay]);

  return visible ? <div id="fade" /* style={{color:"#0b090a",animation:" hide 5s",position:"relative",fontFamily:"'Yanone Kaffeesatz', sans-serif",fontSize:"80px",textAlign:"center"}} */>{props.children}</div> : <div />;
};

export default Expire;