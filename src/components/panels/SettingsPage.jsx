import React from 'react'
import Header from '../common/Header'
import Profile from '../common/Settings/Profile'
import Notification from '../common/Settings/Notification'
import PasswordSection from '../common/Settings/PasswordSection'
import DeleteAccount from '../common/Settings/DeleteAccount'
import Plan from '../common/Settings/Plan'


const SettingsPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
			<Header title='Settings' />
			<main className='max-w-4xl mx-auto py-6 px-4 lg:px-8'>
				<Profile />
        <div className='mt-8'>
				<Notification/>
        </div>
        <div className='mt-8'>
				<Plan/>
        </div>
        <div className='mt-8'>
				<PasswordSection/>
        </div>
        <div className='mt-8'>
				<DeleteAccount/>
        </div>
			</main>
		</div>
	);
};
export default SettingsPage;