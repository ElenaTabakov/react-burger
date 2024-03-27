import React, { useEffect, useState } from "react";
import AppStyle from "./App.module.css";
import AppHeader from "../header/AppHeader";
import "../../global/global.css";
import Layout from "../layout/Layout";
import BurgerContent from "../burger-content/BurgerContent";

function App() {
  const [dataIngredients, setDataIngredients] = useState([]);

  const BASE_URL = "https://norma.nomoreparties.space/api/ingredients";

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const res = await fetch(BASE_URL);

        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        // console.log(res, "res");
        const ingredients = await res.json();
        // console.log(ingredients, "ingredients");
        const data = ingredients.data;

        // console.log(data, "before data");

        setDataIngredients(data);
      } catch (error) {
        console.error("Error while fetching data:", error);
      }
    };

    fetchIngredients();
  }, []);

  return (
    <>
      <AppHeader />
      <main>
        <Layout className={AppStyle.container}>
          <BurgerContent
            title={"Соберите бургер"}
            ingredients={dataIngredients}
          />
        </Layout>
      </main>
    </>
  );
}

export default App;
