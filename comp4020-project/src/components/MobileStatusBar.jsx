import React from 'react';
import { BsBatteryFull, BsWifi } from 'react-icons/bs';
import { RiSignalWifiLine } from 'react-icons/ri';

function MobileStatusBar() {
  // Get current time
  const [time, setTime] = React.useState(new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }));
  
  // Update time every minute
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }));
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#000000',
      color: 'white',
      padding: '5px 15px',
      height: '55px',
      width: '100%',
      boxSizing: 'border-box',
      fontSize: '14px',
      fontWeight: 'bold',
      borderTopLeftRadius: '20px',
      borderTopRightRadius: '20px'
    }}>
      <div style={{ paddingLeft: '5px' }}>{time}</div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <RiSignalWifiLine size={16} />
        <BsWifi size={16} />
        <BsBatteryFull size={20} />
      </div>
    </div>
  );
}

export default MobileStatusBar;
