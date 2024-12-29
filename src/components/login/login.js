import React, { useState } from 'react';
import { loginService } from '../../service/auth/Auth';
import { useDispatch } from 'react-redux';
import { AuthAction } from '../../redux/actions';
import { notification } from 'antd';
import { useNavigate } from 'react-router';

const Login = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLoginClick = () => {
        const data = { email, password };
        console.log('Login Data:', data);

        loginService(data).then((response) => {
            console.log('API Response:', response);
            localStorage.setItem('token', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            localStorage.setItem('user', JSON.stringify(response.userDTO));

            notification.success({
                message: "Login Successful",
                duration: 1.5,
            });

            dispatch(AuthAction.login({
                user: response.userDTO,
                token: response.accessToken,
                refreshToken: response.refreshToken
            }));
            navigate('/');

        })
        
        .catch((err) => {
            console.log(err);
            notification.error({
                message: "Login Failed",
                description: "Invalid email or password",
                duration: 2,
            });
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
                <form 
                    onSubmit={(e) => {
                        e.preventDefault(); // Prevent the default form submission behavior
                        handleLoginClick(); // Call the login handler on form submit
                    }} 
                    className="space-y-4"
                >
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        Login
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600">
                    Don't have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
