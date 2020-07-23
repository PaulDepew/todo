import React, { useState} from 'react';

export const SettingsContext = React.createContext();

const SettingsProvider = (props) => {

  let defaultSettings = {
    showComplete: true,
    pageMax: 3,
    sort: 'difficulty'
  } ;

  const [settings, setSettings] = useState([defaultSettings]);

  const state = {
    settings,
    changeSetting: (setting =>setSettings({...settings, setting}))
  }

  return (
    <SettingsContext.Provider value={state}>
        {props.children}
    </SettingsContext.Provider>
  )
}

export default SettingsProvider;