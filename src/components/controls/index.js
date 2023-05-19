import React from 'react';
import './style.css';
import ControlsInfo from '../controls-info';

function Controls(props) {
  return (
    <div className="Controls">
      <ControlsInfo props={props}></ControlsInfo>
      <div className="Controls-button">
        <button onClick={() => props.onOpenCart()}>Перейти</button>
      </div>
    </div>
  );
}

export default React.memo(Controls);
