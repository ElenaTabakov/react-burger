import React, { useEffect, useState } from "react";
import AppStyle from "./App.module.css";
import AppHeader from "../header/AppHeader";
import "../../global/global.css";
import Layout from "../layout/Layout";
import BurgerContent from "../burger-content/BurgerContent";



function App() {
  const [dataIngredients, setDataIngredients] = useState([]);

  const BASE_URL = 'https://norma.nomoreparties.space/api/ingredients'

  const  fetchIngredients = async () =>{   
    try{
      const res = await fetch(BASE_URL)
      
      if (!res.ok) {
        throw new Error('Somthing wrong') 
      }
      
      const ingredients = await res.json()
      console.log(ingredients, 'data')
     
       setDataIngredients(ingredients.data)
      return ingredients
    }
    catch(error){
        console.error('Ошибка при выполнении запроса:');
    }
  }

  useEffect( () => {
      fetchIngredients()
  },[])

  

  return (
    <>
      <AppHeader />
      <main>
        <Layout className={AppStyle.container}>
          <BurgerContent title={'Соберите бургер'} ingredients={dataIngredients}/>
        </Layout>
      </main>
    </>
  );
}

export default App;
