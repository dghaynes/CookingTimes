import {createContext, useState, useEffect, useContext} from "react";
import {auth, signOut, signInWithPopup, provider, onAuthStateChanged, db} from "./firebase.js";
import { collection, addDoc,getDocs, deleteDoc,doc, query, where} from "firebase/firestore";
import PropTypes from "prop-types";

//create Context
const AuthContext = createContext();

export const AuthProvider = ({children}) =>{

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [recipes, setRecipes] = useState([]);
    const [recipeBoxList, setRecipeBox] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);


    //Check user authentication state
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe;


    }, []);

    //Sign in with Google
    const signInWithGoogle = async ()=> {
        try{
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
        }catch(error){
            console.error("Error signing in:", error);
        }
    };

    //Log out
    const logout = async ()=>{
        try{
            await signOut(auth);
            setUser(null);
            console.log(user);
        }catch(error){
            console.error("Logout Error:", error);
        }
    };


    // Function to add a recipe to Recipebox aka Firestore
    const addToBox = async (recipe) => {
        if(!user) {
            alert("You must be signed in to add a recipe!");
            return;
        }

        try {
            //query firestore to see if recipe exists first
            const recipesRef = collection(db, "recipes");
            const q = query(recipesRef, where("id", "==", recipe.id));
            const querySnapshot = await getDocs(q);

            if(!querySnapshot.empty){
                console.log("recipe already exists in firestore");
                return;
            }

            //if not duplicate save in Firetore
            const docRef = await addDoc(collection(db, "recipes"), {
                ...recipe,
                userId: user.displayName,
                createdAt: new Date(),
            });
            console.log("Recipe added with ID:", docRef.id);
             await fetchRecipes(); // refresh list after adding
        }catch(error){
            console.error("Error adding recipe:", error);
            console.log(recipe);
        }
    };

    //Function to fetch all recipes for the users RecipeBox aka Firestore
    const fetchRecipes = async () => {

        if(!user) return;   //ensure a user is logged in before fetching

        try{
            const q = query(collection(db, "recipes"), where("userId", "==", user.displayName));
            const querySnapshot = await getDocs(q);
            const recipeList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setRecipeBox(recipeList);
            console.log("updated RecipeBox")

        }catch(error){
            console.error("Error fetching recipes:", error);
        }
    };

    //Function to remove recipe from RecipeBox aka Firestore
    const deleteRecipeFromBox = async (title) => {

        try{

            const recipesRef = collection(db, "recipes");

            // Query to find document in the collection
            const q = query(recipesRef, where("title", "==", title));

            //Fetch documents matching the query
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty){
                console.log("No Recipe found with that title");
                return;
            }

            //Loop through the documents
            querySnapshot.forEach(async (docSnapShot) => {
                const docRef = doc(db,"recipes", docSnapShot.id);
                //Delete the document
                await deleteDoc(docRef);
                console.log(`Recipe with title ${title} has been removed from your box`);
            });

            await fetchRecipes();
        }catch(error){
            console.error("Error deleting recipe:", error);
        }
    };


    return (
      <AuthContext.Provider value={{user, loading, signInWithGoogle, logout, recipes, setRecipes, recipeBoxList, setRecipeBox, fetchRecipes, addToBox, deleteRecipeFromBox, searchTerm, setSearchTerm, page, setPage}}>
          {children}
      </AuthContext.Provider>
    );
};

AuthProvider.propTypes ={
    children: PropTypes.node.isRequired,
};

//custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);