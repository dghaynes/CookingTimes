import {useState} from "react";
import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

function SearchBar(){
    const [input, setInput] = useState("");
    const {setSearchTerm} = useAuth(); //Access Context
    const navigate=useNavigate();

    //const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY; //Store in .env
   // const API_URL = 'https://api.spoonacular.com/recipes/complexSearch';

    const handleKeyDown = async (event) => {
        if (event.key === "Enter") {
            setSearchTerm(input); //update search term
            navigate('/');
        }


    };

    return (

            <input className = "search-bar"
                   type="text"
                   placeholder="Search for a recipe..."
                   value={input}
                   onChange={(event) => setInput(event.target.value)}
                   onKeyDown={handleKeyDown}
            />

    )
}



export default SearchBar;