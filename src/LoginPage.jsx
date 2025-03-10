import {useNavigate} from "react-router-dom";

const LoginPage = () => {

    const navigate = useNavigate();

    return (
        <>
            <div>
                <h1>Login Page</h1>
                <button onClick={navigate("/Home")}> Go Back Home</button>
            </div>
        </>

    )
}

export default LoginPage;