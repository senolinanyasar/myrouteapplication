import React from 'react'
import { useState } from 'react'
import SettingSection from './SettingSection'
import { Bell } from "lucide-react";
import ToggleSwitch from './ToggleSwitch'



const Notification = () => {
    const [notification, setNotification] = useState ({
        push: false,
        email: false,
        sms: false,
    })

  return (<SettingSection icon={Bell} title='Notification'>
    <ToggleSwitch label='Email' isOn={notification.email} onToggle={() => setNotification({...notification, email: !notification.email})} />
    <ToggleSwitch label='Push Notification' isOn={notification.push} onToggle={() => setNotification({...notification, push: !notification.push})} />
    <ToggleSwitch label='SMS' isOn={notification.sms} onToggle={() => setNotification({...notification, sms: !notification.sms})} />
    </SettingSection>
  );
};

export default Notification;