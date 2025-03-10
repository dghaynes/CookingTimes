import {useAuth} from "../context/AuthContext.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const RecipeList = () => {

    const [totalResults, setTotalResults] = useState(0);
    const {recipes, addToBox, searchTerm, setRecipes, page, setPage} = useAuth();
    const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY; //Store in .env
    const API_URL = 'https://api.spoonacular.com/recipes/complexSearch';
    const RECIPES_PER_PAGE =10;
    const navigate = useNavigate();

    useEffect(()=> {
        if (searchTerm) {
            fetchRecipes();
        }
    }, [searchTerm, page]); //Fetch Recipes when searchTerm or page Changes

    const fetchRecipes = async () => {
        try {
            const offset = (page -1 ) * RECIPES_PER_PAGE;
            const response = await fetch(`${API_URL}?query=${searchTerm}&apiKey=${API_KEY}&number=${RECIPES_PER_PAGE}&offset=${offset}`);
            if (!response.ok) throw new Error('Failed to fetch data');
            const result = await response.json();

            //add attribute to track if in recipeBox
            const recipes = result.results.map(recipe => ({...recipe, inBox:false}
            ));


            setRecipes(recipes || []);
            setTotalResults(result.totalResults || 0);  //Store total number of results
            console.log(recipes);

        } catch (error) {
            console.error("Api Fetch Error:", error);
        }
    }

    return (

        <div className="recipe-list-container">
            <h2 className="recipe-list-title">Recipe Results for &quot{searchTerm}&quot</h2>

            {/* Recipe Cards in Grid Layout */}
            <div className="recipe-grid">
                {recipes.length > 0 ? (recipes.map((recipe) => (
                        <div key={recipe.id} className="recipe-card" onClick={()=>navigate(`/details/${recipe.id}`)}>
                            <div className="imageContainer">
                                <img src={recipe.image} alt={"listing image"}/>
                            </div>
                            <h4><b>{recipe.title}</b></h4>
                            <p><strong></strong></p>
                            <button className="Button" onClick={
                                (e) => {e.stopPropagation(); addToBox(recipe);}}>Add to RecipeBox</button>
                        </div>))
                ) : (
                    <p> No Recipes found. Try searching again!</p>
                )}
            </div>


            {/*Pagination Controls*/}
            {totalResults > RECIPES_PER_PAGE &&(
                <div className="pagination-container">
                    <button className="Button" onClick={()=> setPage(page - 1)} disabled={page === 1}>Previous</button>
                    <span>Page {page}</span>
                    <button className="Button" onClick={()=> setPage(page + 1)} disabled={page * RECIPES_PER_PAGE >= totalResults}>Next</button>
                </div>
            )}
        </div>
    );
};



export default RecipeList