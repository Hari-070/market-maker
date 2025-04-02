import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin } from 'lucide-react';
import { message } from 'antd'; // Importing the message component for alerts

const Profile = () => {
  // State to hold user data
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    phone: ''
  });

  // State to handle loading and error status
  const [loading, setLoading] = useState(false);

  // Fetch the user's profile data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        // Replace with actual API endpoint to fetch user data
        const response = await fetch('/api/user/profile');
        const data = await response.json();
        setUser({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone
        });
      } catch (error) {
        message.error('Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Handle the change of input values
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      // Replace with actual API endpoint to save user data
      const response = await fetch('/api/user/profile/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        message.success('Profile updated successfully!');
      } else {
        message.error('Failed to update profile.');
      }
    } catch (error) {
      message.error('An error occurred while updating your profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Profile Settings</h2>

          <div className="space-y-6">
            <div className="flex items-center">
              <User className="h-5 w-5 text-gray-400 mr-3" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={user.fullName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-400 mr-3" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="flex items-center">
              <Phone className="h-5 w-5 text-gray-400 mr-3" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            <button
              onClick={handleSaveChanges}
              disabled={loading}
              className={`w-full ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
