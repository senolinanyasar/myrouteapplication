// Dashboard.js
import React from "react";
import './Dashboard.css';

const Dashboard = ({ userRole, userInfo }) => {
    const {
        companyName = "",
        sector = "",
        todaySales,
        todayCollection,
        monthlyRevenue,
        monthlyExpense,
        stockValue,
        cashAssets = {},
        debts,
    } = userInfo || {};

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div className="header-info">
                    <h1>{companyName}</h1>
                    <p>Sector: {sector}</p>
                </div>
                <div className="header-right">
                    <div className="date-box">{new Date().toLocaleDateString()}</div>
                    <div className="account-icon">
                        <button className="account-button">Account</button>
                        <div className="dropdown-menu">
                            <button>Profile</button>
                            <button>Change Password</button>
                            <button>Logout</button>
                        </div>
                    </div>
                </div>
            </header>
            <div className="dashboard-main">
                <div className="stats-grid">
                    <div className="stats-box">
                        <h3>Today's Sales</h3>
                        <p>${todaySales || "0.00"}</p>
                    </div>
                    <div className="stats-box">
                        <h3>Today's Collection</h3>
                        <p>${todayCollection || "0.00"}</p>
                    </div>
                    <div className="stats-box">
                        <h3>Monthly Revenue</h3>
                        <p>${monthlyRevenue || "0.00"}</p>
                    </div>
                    <div className="stats-box">
                        <h3>Monthly Expense</h3>
                        <p>${monthlyExpense || "0.00"}</p>
                    </div>
                    <div className="stats-box">
                        <h3>Stock Value</h3>
                        <p>${stockValue || "0.00"}</p>
                    </div>
                    <div className="stats-box">
                        <h3>Cash Assets</h3>
                        <ul>
                            <li>Cash: ${cashAssets.cash || "0.00"}</li>
                            <li>POS: ${cashAssets.pos || "0.00"}</li>
                            <li>Bank: ${cashAssets.bank || "0.00"}</li>
                            <li>Cheques: ${cashAssets.cheques || "0.00"}</li>
                            <li>Receivables: ${cashAssets.receivables || "0.00"}</li>
                        </ul>
                    </div>
                    <div className="stats-box">
                        <h3>Total Debts</h3>
                        <p>${debts || "0.00"}</p>
                    </div>
                </div>
                <nav className="dashboard-nav">
                    <ul>
                        <li>Location</li>
                        <li>Customers</li>
                        <li>Products
                            <ul>
                                <li>Stock</li>
                            </ul>
                        </li>
                        <li>Sales</li>
                        <li>Purchases</li>
                        <li>Account Management
                            <ul>
                                <li>Account Details</li>
                                <li>Expenses</li>
                            </ul>
                        </li>
                        <li>Reports
                            <ul>
                                <li>Sales & Purchases</li>
                                <li>Financial Reports</li>
                                <li>Stock Reports</li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Dashboard;
