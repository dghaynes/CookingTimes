import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import Header from "./components/header.jsx";

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const RECIPE_DETAIL_URL = "https://api.spoonacular.com/recipes"

const RecipeDetail = () => {

    const {recipeId} = useParams();  //extract reciped Id from URL
    const navigate = useNavigate();
    const [recipeDetail, setRecipeDetail] = useState(null);

    useEffect( () =>{
        fetchRecipeDetails();
    }, [recipeId]);

    const fetchRecipeDetails = async ()=> {

        console.log("in fetch recipe details:", recipeId);
        try{
            const response = await fetch(`${RECIPE_DETAIL_URL}/${recipeId}/information?apiKey=${API_KEY}`)
            const data = await response.json();
            setRecipeDetail(data);
        }catch(error){
            console.Error("Error fetching recipe details:", error);
        }
    };

    if(!recipeDetail) return <p>Loading...</p>;

    return(

        <>
            <Header/>
            <hr></hr>
            <div className="recipe-detail-container">

                <div>
                </div>
                {/*image in upper left*/}
                <img src={recipeDetail.image} className="recipe-image" alt={"listing image"}/>

                <h2 className="recipe-title">{recipeDetail.title}</h2>

                <div className="recipe-ingredients">
                    <h3>Ingredients:</h3>
                    <ul>
                        {recipeDetail.extendedIngredients.map((ingredient) =>
                            <li key={ingredient.id}>{ingredient.original}</li>
                        )}
                    </ul>
                </div>
                <div className="recipe-instructions">
                    <h3>Instructions:</h3>
                    <p>{recipeDetail.instructions}</p>
                </div>
            </div>
            <button onClick={() => navigate(-1)}> Back</button>
        </>
    );

}

export default RecipeDetail;