import React, { createContext, useContext, useState, useEffect } from 'react';

import { register, login, verifyEmail, resetPassword, getUserProfile, logout, resendEmail, forgotPassword , googleAuth } from '../api/authApi'; // Importing API functions
import { usersApi } from '../api/usersApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(null);
    const [onboard, setOnboard] = useState(false);
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(true);
    // const [authEmail, setAuthEmail] = useState(null)

    const clearAuthData = async () => {
         localStorage.removeItem('accessToken');
         localStorage.removeItem('refreshToken');
         localStorage.removeItem('userProfile');
        setAuthData(null); // Clear the authData state as well
    };

    const fetchOnboard = async () => {
      if (!authData) {
        setLoading(false);
        return;
      }

      try {
        const response = await usersApi.getOnboardStatus();
        setOnboard(response.data.data.completed);
        setStep(response.data.data.step)
      } catch (err) {
        console.error("Error checking onboarding status", err);
      } finally {
        setLoading(false);
      }
    };



    useEffect(() => {

    fetchOnboard();
  }, [authData]);

    // const clearStorage = async () => {
    //      localStorage.clear();
    //     console.log('localStorage cleared');
    //   };

    // Retrieve data from localStorage on app start
    useEffect(() => {
        const loadAuthData = async () => {
            const storedAccessToken = localStorage.getItem('accessToken');
            const storedRefreshToken = localStorage.getItem('refreshToken');
            const storedUserData = localStorage.getItem('userProfile');
            // const firstLaunche = localStorage.getItem('firstLaunch');

            console.log('pokemon',{ storedAccessToken, storedRefreshToken, storedUserData });
            
            if (storedAccessToken && storedRefreshToken ) {
                setAuthData({
                    ...JSON.parse(storedUserData),
                    accessToken: storedAccessToken,
                    refreshToken: storedRefreshToken,
                });
            } 
        };
        // clearAuthData();
        loadAuthData();
    }, []);

    // useEffect(() => {
    //     // Check if authData has user info, if not clear it
    //     if (authData && !authData.user) {
    //         clearAuthData();
    //         console.log('authData does not have user, cleared authData');
    //     }
        
    //     const checkFirstLaunch = async () => {
    //         try {
    //           const firstLaunch =  localStorage.getItem("firstLaunch");
      
    //           if (!firstLaunch) {
    //             // First time opening the app, clear old auth data
    //              localStorage.clear();
    //              localStorage.setItem("firstLaunch", "true");
    //           }
    //         } catch (error) {
    //           console.error("Error checking first launch:", error);
    //         }
    //       };
          
    //       checkFirstLaunch();
    // }, [authData]);

    // Register user
    const handleRegister = async (userData) => {
        try {
            const response = await register(userData);
            // const user = response.data.user;
            return { status: 'success', message: 'Register successful' };
        } catch (error) {
            return error;
            // console.error('Registration failed', error);
        }
    };

    // Login user
    const handleLogin = async (credentials) => {
        try {
            const response = await login(credentials);
            console.log('respone',response.data);
            const user = response.data.user;
            const role = response.data.user.role;
            const setup = response.data.requires_setup;
            const tokens = response.data.tokens;

            // Save to localStorage
            localStorage.setItem('accessToken', tokens.accessToken);
            localStorage.setItem('refreshToken', tokens.refreshToken);
            localStorage.setItem('userProfile', JSON.stringify({
                userId: user._id,
                user: user,
                role: role.name,
                setup: setup

            }));

            console.log('response',response)

            setAuthData({
                userId: user._id,
                user: user,
                role: role,
                setup: setup,
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
            });
            return { status: 'success', message: 'Login successful' };
        } catch (error) {
            // console.log('response',response)
            console.error('Login failed2', error);
            return error;
        }
    };


    const handleGoogleLogin = async (credentials) => {
        try {
            const response = await googleAuth(credentials);
            console.log('respone',response.data.user);
            const user = response.data.user;
            const role = response.data.user.role;
            const setup = response.data.requires_setup;
            const tokens = response.data;

            // Save to localStorage
            localStorage.setItem('accessToken', tokens.accessToken);
            localStorage.setItem('refreshToken', tokens.refreshToken);
            localStorage.setItem('userProfile', JSON.stringify({
                userId: user._id,
                user: user,
                role: role.name,
                setup: setup

            }));

            console.log('response',response)

            setAuthData({
                userId: user._id,
                user: user,
                role: role,
                setup: setup,
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
                // userProfile: user.UserProfile,
                // emailVerified: user.Auth.isEmailVerified,
            });
            return { status: 'success', message: 'Login successful' };
        } catch (error) {
            // console.log('response',response)
            console.error('Login failed', error);
            return { status: 'error', message: 'Login failed' };
        }
    };

    // Email verification
    const handleVerifyEmail = async (verificationCode) => {
        try {
            const response = await verifyEmail(verificationCode);
            return { status: 'success', message: 'Email Verified', response: response};
        } catch (error) {
            console.error('Email verification failed', error);
        }
    };

    // Resend Email verification
    const handleResendEmail = async (email) => {
        try {
            const response = await resendEmail(email);
            return { status: 'success', message: 'Email Verified', response: response};
        } catch (error) {
            console.error('Email verification failed', error);
        }
    };

     // Password reset
     const handleForgotPassword = async (email) => {
        try {
            const response = await forgotPassword(email);
            return { status: 'success', message: 'Email Verified', response: response};
        } catch (error) {
            console.error('Password reset failed', error);
            throw error; // Re-throw the error so it can be caught in the component
        }
    };

    // Verify OTP for forgot password
    const handleVerifyForgotPasswordEmail = async (data) => {
        try {
            const response = await verifyEmail(data);
            return { status: 'success', message: 'OTP Verified', response: response};
        } catch (error) {
            console.error('OTP verification failed', error);
            throw error;
        }
    };

    // Password reset
    const handleResetPassword = async (data) => {
        try {
            const response = await resetPassword(data);
            return { status: 'success', message: 'Password has been reset.', response: response};
        } catch (error) {
            console.error('Password reset failed', error);
        }
    };

    // Logout user
    const handleLogout = async (userData) => {
        try {
            const response = await logout(userData);
            
        } catch (error) {
            console.error('Failed to fetch user logout', error);
        };
        setAuthData(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userProfile');
        // setAuthData(null);
        //  try {
        //     await resetPassword(email);
        //     console.log('Password reset link sent to:', email);
        // } catch (error) {
        //     console.error('Password reset failed', error);
        // }
    };

    // Fetch user profile
    const fetchUserProfile = async () => {
        try {
            const profile = await getUserProfile();
            setAuthData({
                ...authData,
                userProfile: profile,
            });
        } catch (error) {
            console.error('Failed to fetch user profile', error);
        }
    };

    return (
        <AuthContext.Provider value={{
            authData,
            onboard,
            step,
            loading,
            fetchOnboard,
            handleLogin,
            handleGoogleLogin,
            handleLogout,
            handleRegister,
            handleVerifyEmail,
            handleResetPassword,
            fetchUserProfile,
            handleResendEmail,
            handleForgotPassword,
            handleVerifyForgotPasswordEmail
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
