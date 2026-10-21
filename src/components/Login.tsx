import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { login } from "../redux/slice/loginSlice";

const Login = () => {
    const [formData, setFormData] = useState({ username: "", password: "" })
    let navigate = useNavigate();
    const { loading } = useSelector((state: any) => state.login);
    const [error, setError] = useState({})
    const dispatch = useDispatch();

    function validation() {
        let isValid = true;
        if (formData.username.trim() === "") {
            setError((prev) => ({ ...prev, username: "Username is required" }))
            isValid = false;
        }
        if (formData.password.trim() === "") {
            setError((prev) => ({ ...prev, password: "Password is required" }))
            isValid = false;
        }
        return isValid;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))

        if (error[name]) {
            setError((prev) => ({ ...prev, [name]: undefined }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validation()) return;

        try {
            const res = await dispatch(login(formData)).unwrap();
            if (res) {
                navigate("/favorite-books")
                setFormData({ username: "", password: "" })
            }

        } catch (error) {
            console.error("Login failed:", error);
        }

    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded shadow">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="text-gray-700 text-sm font-bold mb-2">
                            Username
                        </label>
                        <input
                            className="border rounded w-full py-2 px-3 text-gray-700"
                            name="username"
                            type="text"
                            value={formData.username}
                            placeholder="Username"
                            onChange={handleChange}
                        />
                        {error?.username && <p className="text-red-500 text-xs mt-1">{error.username}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="border rounded w-full py-2 px-3 text-gray-700"
                            name="password"
                            type="text"
                            value={formData.password}
                            placeholder="Password"
                            onChange={handleChange}
                        />
                        {error.password && <p className="text-red-500 text-xs mt-1">{error.password}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded pointer"
                            type="submit"
                        >
                            {loading ? "Logging in ...." : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;