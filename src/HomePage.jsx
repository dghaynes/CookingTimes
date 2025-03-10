import Header from "./components/header.jsx";
import RecipeList from "./components/RecipieList.jsx";


const Home =() => {

    return (
        <>
            <div>
                <div id="header">
                    <Header/>
                    <hr></hr>
                </div>
                <div className="Content">
                    {/*Card Section*/}
                    <RecipeList/>
                </div>
                <div>
                    {/*Footer*/}
                </div>
            </div>



        </>
    );
}


export default Home;