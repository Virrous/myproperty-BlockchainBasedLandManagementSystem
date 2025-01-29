import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import './admin.css';

const Admin = () => {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [officers, setOfficers] = useState([]);
    const [users, setUsers] = useState([]);
    const [showOfficerForm, setShowOfficerForm] = useState(false);
    const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admintoken");
    if (token) {
      navigate("/AdminLogin");
      return;
    }
  }, [navigate]);

    const [newOfficer, setNewOfficer] = useState({
        office_name: '',
        office_department: '',
        office_mobile: '',
        office_email: '',
        office_location: '',
        office_district: '',
        password_hash: '', // Will store hashed password
    });

    const [password, setPassword] = useState({ new: '', confirm: '' });

    const handlePasswordChange = async (event) => {
        event.preventDefault();

        if (!password.old || !password.new || !password.confirm) {
            alert("Please fill in all password fields.");
            return;
        }

        if (password.new !== password.confirm) {
            alert("New password and confirmation do not match.");
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8080/changeAdminPassword',
                { oldPassword: password.old, newPassword: password.new },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("admintoken")}`,
                    },
                }
            );
            alert(response.data || "Password changed successfully!");
            setPassword({ old: '', new: '', confirm: '' }); // Clear the form after success
        } catch (error) {
            console.error("Error changing password:", error);
            const errorMessage =
                error.response?.data || "An error occurred. Please try again.";
            alert(errorMessage);
        }
    };

    useEffect(() => {
        fetchOfficers();
        fetchUsers();
    }, []);

    const fetchOfficers = async () => {
        const response = await fetch('http://localhost:8080/getOfficers');
        const data = await response.json();
        setOfficers(data);
    };

    const fetchUsers = async () => {
        const response = await fetch('http://localhost:8080/getUsers');
        const data = await response.json();
        setUsers(data);
    };

    const handleSectionClick = (section) => {
        setActiveSection(section);
        setShowOfficerForm(false);
    };

    const addOfficer = () => {
        setShowOfficerForm(true);
    };

    const handleOfficerInputChange = async (e) => {
        const { name, value } = e.target;

        if (name === 'password_hash') {
            // Hash the password before setting it in the state
            const hashedPassword = await bcrypt.hash(value, 10);
            setNewOfficer((prevState) => ({
                ...prevState,
                password_hash: hashedPassword,
            }));
        } else {
            setNewOfficer((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleOfficerSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/addOfficer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newOfficer),
            });

            if (response.ok) {
                alert('Officer added successfully');
                fetchOfficers(); // Fetch updated list of officers
                setShowOfficerForm(false);
            } else {
                alert('Error adding officer');
            }
        } catch (error) {
            console.error('Error submitting officer:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("admintoken");
        delete axios.defaults.headers.common['Authorization'];
        navigate('/AdminLogin');
    };

    return (
        <div className="admin-container">
            <div className="admin-panel">
                <h2>Admin Panel</h2>
                <ul>
                    <li><button onClick={() => handleSectionClick('dashboard')}>Dashboard</button></li>
                    <li><button onClick={() => handleSectionClick('officers')}>Officers</button></li>
                    <li><button onClick={() => handleSectionClick('users')}>Users</button></li>
                    <li><button onClick={() => handleSectionClick('settings')}>Settings</button></li>
                </ul>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>

            <div className="main-panel">
                {activeSection === 'dashboard' && (
                    <div className="dashboard-panel">
                        <h2>Welcome to the Dashboard</h2>
                        <p>This is your main dashboard overview.</p>
                    </div>
                )}

                {activeSection === 'officers' && (
                    <div className="officer-panel">
                        <h2>Officers</h2>
                        <button onClick={addOfficer} className="add-officer-btn">Add New Officer</button>
                        {showOfficerForm && (
                            <form className="officer-form" onSubmit={handleOfficerSubmit}>
                                <input type="text" name="office_name" placeholder="Officer Name" required onChange={handleOfficerInputChange} />
                                <input type="text" name="office_department" placeholder="Department" required onChange={handleOfficerInputChange} />
                                <input type="text" name="office_mobile" placeholder="Mobile No." required onChange={handleOfficerInputChange} />
                                <input type="email" name="office_email" placeholder="Email" required onChange={handleOfficerInputChange} />
                                <input type="text" name="office_location" placeholder="Location" required onChange={handleOfficerInputChange} />
                                <input type="password" name="password_hash" placeholder="Password" required onChange={handleOfficerInputChange} />
                                <select name="office_district" required onChange={handleOfficerInputChange}>
                                    <option value="">Select District</option>
                                    <option value="Bhojpur">Bhojpur</option>
                                    <option value="Dhankuta">Dhankuta</option>
                                    <option value="Ilam">Ilam</option>
                                    <option value="Jhapa">Jhapa</option>
                                    <option value="Khotang">Khotang</option>
                                    <option value="Morang">Morang</option>
                                    <option value="Okhaldhunga">Okhaldhunga</option>
                                    <option value="Panchthar">Panchthar</option>
                                    <option value="Sankhuwasabha">Sankhuwasabha</option>
                                    <option value="Solukhumbu">Solukhumbu</option>
                                    <option value="Sunsari">Sunsari</option>
                                    <option value="Taplejung">Taplejung</option>
                                    <option value="Tehrathum">Tehrathum</option>
                                    <option value="Udayapur">Udayapur</option>
                                </select>
                                <button type="submit">Submit</button>
                                <button type="button" onClick={() => setShowOfficerForm(false)}>Cancel</button>
                            </form>
                        )}

                        <table>
                            <thead>
                                <tr>
                                    <th>S.N</th>
                                    <th>Name</th>
                                    <th>Department</th>
                                    <th>Mobile No.</th>
                                    <th>Email</th>
                                    <th>Location</th>
                                </tr>
                            </thead>
                            <tbody>
                                {officers.map((officer, index) => (
                                    <tr key={officer.office_id}>
                                        <td>{index + 1}</td>
                                        <td>{officer.office_name}</td>
                                        <td>{officer.office_department}</td>
                                        <td>{officer.office_mobile}</td>
                                        <td>{officer.office_email}</td>
                                        <td>{officer.office_location}, {officer.office_district}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeSection === 'users' && (
                    <div className="user-panel">
                        <h2>Users</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>S.N</th>
                                    <th>Name</th>
                                    <th>Mobile No.</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Citizenship No.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.user_id}>
                                        <td>{user.user_id}</td>
                                        <td>{user.full_name}</td>
                                        <td>{user.phone_no}</td>
                                        <td>{user.email}</td>
                                        <td>{user.address}</td>
                                        <td>{user.citizenship_no}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

{activeSection === 'settings' && (
                    <div className="settings-panel">
                        <h2>Change Password</h2>
                        <form onSubmit={handlePasswordChange}>
                            <input
                                type="password"
                                placeholder="Old Password"
                                required
                                value={password.old}
                                onChange={(e) =>
                                    setPassword({ ...password, old: e.target.value })
                                }
                            />
                            <input
                                type="password"
                                placeholder="New Password"
                                required
                                value={password.new}
                                onChange={(e) =>
                                    setPassword({ ...password, new: e.target.value })
                                }
                            />
                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                required
                                value={password.confirm}
                                onChange={(e) =>
                                    setPassword({ ...password, confirm: e.target.value })
                                }
                            />
                            <button type="submit">Change Password</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
