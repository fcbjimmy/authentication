import React, { useEffect, useState } from 'react';

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
  return <div className='clock'>{time}</div>;
}

export default Clock;
