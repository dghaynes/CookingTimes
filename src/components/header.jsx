
import SearchBar from "./SearchBar.jsx";
import Auth from "./Auth.jsx";
import {useAuth} from "../context/AuthContext.jsx";

const Header = ()=>{
    const {setRecipes} = useAuth();

    return(
        <header className="header">
            <h1 className="title">DH CookingTimes</h1>
            {/*Search Bar in Center (Child Component*/}
            <SearchBar className="searchBar" onResults={setRecipes}/>
            {/*User Info + Sign out in Top Right*/}
            <Auth/>
        </header>

    )
}

export default Header;