import { Link } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from '../redux/slice/loginSlice';

const Header = () => {
    const { isLoggedIn } = useSelector((state: any) => state.login);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handlelogout = () => {
        dispatch(logout());
        navigate("/")
    }
    console.log("isLoggedIn", isLoggedIn)
    return (
        <header className="bg-blue-500 text-white p-1">
            <div className="container mx-auto flex justify-between items-center">
                <h4 className="text-2xl font-bold">Book Explorer</h4>
                <div className="flex space-x-4">
                    <Link to="/">
                        Home
                    </Link>
                    {
                        isLoggedIn && <button onClick={handlelogout} className="text-white hover:text-gray-300">
                            Logout
                        </button>
                    }
                    {
                        !isLoggedIn && <Link to="/login" className="text-white hover:text-gray-300">
                            Sign In
                        </Link>
                    }
                    {
                        isLoggedIn && <Link to="/favorite-books" className="text-white hover:text-gray-300">
                            Favorite Books
                        </Link>
                    }
                    {
                        isLoggedIn && <Link to="/auth/me" className="text-white hover:text-gray-300">
                            Account
                        </Link>
                    }


                </div>
            </div>
        </header>
    )
}

export default Header