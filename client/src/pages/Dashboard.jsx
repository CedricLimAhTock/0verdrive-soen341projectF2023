import React, { useState } from 'react'
import './styles/Dashboard.css'
import Profile from '../components/DashboardDetails/Profile'
import Favorites from '../components/DashboardDetails/Favorites'
import Bookings from '../components/DashboardDetails/Bookings'
import Offers from '../components/DashboardDetails/Offers'
import Listings from '../components/DashboardDetails/Listings'
import Users from '../components/DashboardDetails/Users'

const Dashboard = () => {

    const [activeTab, setActiveTab] = useState('profile');

    const logout = () => {
        localStorage.removeItem('jwtToken');
        window.location.reload();
        console.log('Logged out successfully');
    }


    const data = {
        price: "$1,000,000",
        address: "1234 Main St, San Diego, CA 92101",
        bedrooms: 3,
        bathrooms: 2,
        size: 2000,
        firstName: "John",
        lastName: "Doe",
        email: "gay@gmail.com",
        phone: "123-456-7890"

    };

    const userRole = 'admin';

    return (
        <div className='dashboard'>
            <div className="sidebar">
                <button
                    className={activeTab === 'profile' ? 'active-tab' : ''}
                    onClick={() => setActiveTab('profile')}
                >
                    Profile
                </button>

                {userRole == 'renter' && (
                    <>
                        <button
                            className={activeTab === 'favorites' ? 'active-tab' : ''}
                            onClick={() => setActiveTab('favorites')}
                        >
                            Favorites
                        </button>
                    </>
                )}

                {userRole === 'renter' || userRole === 'broker' ? (
                    <>
                        <button
                            className={activeTab === 'bookings' ? 'active-tab' : ''}
                            onClick={() => setActiveTab('bookings')}
                        >
                            Bookings
                        </button>

                        <button
                            className={activeTab === 'offers' ? 'active-tab' : ''}
                            onClick={() => setActiveTab('offers')}
                        >
                            Offers
                        </button>
                    </>
                ) : null}

                {userRole == 'broker' && (
                    <>
                        <button
                            className={activeTab === 'listings' ? 'active-tab' : ''}
                            onClick={() => setActiveTab('listings')}
                        >
                            Listings
                        </button>
                    </>
                )}

                {userRole == 'admin' && (
                    <>
                        <button
                            className={activeTab === 'users' ? 'active-tab' : ''}
                            onClick={() => setActiveTab('users')}
                        >
                            Users
                        </button>
                    </>
                )}

                <button className="logout" onClick={logout}>Logout</button>
            </div>


            <div className="dashboard-info">
                <div className="banner">
                    <h2 className='title'>{activeTab}</h2>
                    <p className="path">Home/{activeTab}</p>
                </div>

                <div className="dashboard-data">
                    {activeTab === 'profile' && <Profile data={data} />}
                    {activeTab === 'favorites' && <Favorites />}
                    {activeTab === 'bookings' && <Bookings data={data}/>}
                    {activeTab === 'offers' && <Offers />}
                    {activeTab === 'listings' && <Listings />}
                    {activeTab === 'users' && <Users />}
                </div>

            </div>



        </div>
    )
}

export default Dashboard