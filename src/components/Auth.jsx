import {useAuth} from "../context/AuthContext.jsx"
import {useNavigate} from "react-router-dom";

const Auth = () =>{
    const navigate = useNavigate();
    const {user, loading, signInWithGoogle, logout} = useAuth();

    if (loading) return <p>Loading...</p>;

    return(
        <div className="user-section">
            {user ? (
                <>
                    <span className="userName">{user.displayName}</span>
                    <button className="Button" onClick={logout}>Sign Out</button>

                </>) : (<>
                <button className="Button" onClick={signInWithGoogle}> Login with Google</button>
            </>)}
            <button className="Button" onClick={() => navigate("/RecipeBox")}>RecipeBox</button>
        </div>
    );
};

export default Auth;