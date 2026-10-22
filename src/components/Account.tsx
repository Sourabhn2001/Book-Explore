import { useDispatch, useSelector } from "react-redux"
import { logout } from '../redux/slice/loginSlice';

const Account = () => {
    const { user } = useSelector((state: any) => state.login);
    const dispatch = useDispatch();

    const { firstName, lastName, email, id } = user || {};

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Account</h1>
            <p>Welcome, {firstName} {lastName}!</p>
            <p>Email: {email}</p>
            <p>User ID: {id}</p>
            <button className="button-secondary mt-2 border-2 p-1 rounded-md" onClick={() => {
                dispatch(logout());
                localStorage.clear();
            }}>Logout</button>
        </div>
    )
}

export default Account