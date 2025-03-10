import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx"
import {useEffect} from "react";

const RecipeBox = () => {

    const{recipeBoxList, deleteRecipeFromBox, fetchRecipes, user} = useAuth();
    const navigate = useNavigate();

    //Fetch user's recipes when component loads

    useEffect(() => {
        console.log("test3:",user);
        if (user) {
            fetchRecipes();
        }

    }, [user, fetchRecipes]);



    return (
        <div className="-recipe-list-container">
            <h1 className="recipe-list-title">RecipeBox</h1>
            <div className="recipe-grid">
                {(user && recipeBoxList.length > 0) ? (recipeBoxList.map((recipe) => (
                        <div key={recipe.id} className="recipe-card" onClick={() => navigate(`/details/${recipe.id}`)}>
                            <div className="imageContainer">
                                <img src={recipe.image} alt={"listing image"}/>
                            </div>
                            <h4><b>{recipe.title}</b></h4>
                            <p><strong></strong></p>
                            <button className="Button" onClick={(e) =>{ e.stopPropagation(); deleteRecipeFromBox(recipe.title)}}>Remove from RecipeBox</button>
                        </div>))
                ) : (
                    <p> No Recipes in Box. Make sure you are logged in!</p>

                )}
            </div>
            <button className="Button" onClick={() =>navigate("/")}> Back to Search</button>
        </div>
    )

}

export default RecipeBox;