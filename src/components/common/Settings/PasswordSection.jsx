import React from 'react'
import SettingSection from './SettingSection'
import { Lock } from 'lucide-react'

const PasswordSection = () => {
  return (
    <SettingSection icon={Lock} title='Change Password'>
        <div className='mt-10'>
            <button className='ml-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded transition duration-200 w-full sm:w-auto'>
                Change Password
            </button>
        </div>
    </SettingSection>
  )
}

export default PasswordSection