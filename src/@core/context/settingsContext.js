// ** React Imports
import { createContext, useState, useEffect } from 'react'
import { getSession } from 'next-auth/react'

// ** ThemeConfig Import
import themeConfig from 'src/configs/themeConfig'

const initialSettings = {
  themeColor: 'primary',
  mode: themeConfig.mode,
  contentWidth: themeConfig.contentWidth
}

// ** Create Context
export const SettingsContext = createContext({
  saveSettings: () => null,
  settings: initialSettings
})

export const SettingsProvider = ({ children }) => {
  // ** State
  const [settings, setSettings] = useState({ ...initialSettings })
  const [userNama, setUserNama] = useState(null)
  const [userNoreg, setUserNoreg] = useState(null)
  const [UserLOG, setUserLOG] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession()
      setUserLOG(session)
      const userData = session?.user.name ?? null // menggunakan operator nullish coalescing untuk menangani session null/undefined
      const userNoreg = session?.token.noreg ?? null // menggunakan operator nullish coalescing untuk menangani session null/undefined

      setUserNama(userData)
      setUserNoreg(userNoreg)
    }

    fetchData()
  }, [userNoreg])

  const saveSettings = updatedSettings => {
    setSettings(updatedSettings)
  }

  return (
    <SettingsContext.Provider value={{ settings, saveSettings, userNama, userNoreg, UserLOG }}>
      {children}
    </SettingsContext.Provider>
  )
}

export const SettingsConsumer = SettingsContext.Consumer
