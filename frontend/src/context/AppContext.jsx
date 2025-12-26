// src/context/AppContext.jsx
import React, { createContext, useEffect, useState, useCallback } from 'react';

export const AppContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(() => localStorage.getItem('token'));
	const [user, setUser] = useState(() => {
		try { return JSON.parse(localStorage.getItem('user')) || null; } catch { return null; }
	});
	const [loading, setLoading] = useState(false);

	// Persist changes
	useEffect(() => {
		if (token) localStorage.setItem('token', token); else localStorage.removeItem('token');
	}, [token]);
	useEffect(() => {
		if (user) localStorage.setItem('user', JSON.stringify(user)); else localStorage.removeItem('user');
	}, [user]);

	const login = useCallback((jwt, userData) => {
		setToken(jwt);
		setUser(userData);
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setUser(null);
		localStorage.removeItem('token');
		localStorage.removeItem('user');
	}, []);

	const value = { token, user, loading, setLoading, login, logout, isAuthenticated: !!token };
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
