import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });

            localStorage.setItem(
                "token",
                response.data.data.token
            );

            navigate("/orders");
        } catch (error) {
            alert("Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-sm space-y-4 border p-6 rounded-lg">
                <h1 className="text-2xl font-bold">Login</h1>

                <input
                    className="w-full border p-2 rounded"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="w-full border p-2 rounded"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-black text-white p-2 rounded"
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default Login;