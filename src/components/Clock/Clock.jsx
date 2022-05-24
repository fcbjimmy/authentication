import React, { useEffect, useState } from 'react';
import clockCSS from './clockstyle.module.css';

function Clock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setTime(
        date.toLocaleTimeString([], {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    }, 1000);
  }, []);
  return <div className={clockCSS.clock}>{time}</div>;
}

export default Clock;
