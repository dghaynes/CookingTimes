import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import RecipeBox from "./components/RecipeBox.jsx"
import LoginPage from "./LoginPage.jsx"
import Home from "./HomePage.jsx"
import RecipeDetail from "./RecipeDetail.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";


function App() {
  return (
    <>
        <AuthProvider>
            <BrowserRouter><Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/recipebox' element={<RecipeBox/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/details/:recipeId' element={<RecipeDetail/>}/>
            </Routes></BrowserRouter>
        </AuthProvider>

    </>
  );
}

export default App;
