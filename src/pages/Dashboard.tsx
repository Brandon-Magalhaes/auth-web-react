import { API_URL } from '../config';
// src/pages/Dashboard.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
    const [user, setUser] = useState<{ email: string } | null>(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${API_URL}/users/me`);
                setUser(res.data);
            } catch (err: any) {
                setError('Sessão expirada. Faça login novamente.');
                setTimeout(() => navigate('/login'), 3000);
            }
        };
        fetchUser();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        delete axios.defaults.headers.common['Authorization'];
        navigate('/login');
    };

    if (error) return <p className="text-red-500 text-center mt-8">{error}</p>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">Bem-vindo ao Dashboard</h1>
                {user && <p className="mb-4">Logado como: <strong>{user.email}</strong></p>}
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                    Sair
                </button>
            </div>
        </div>
    );
}
