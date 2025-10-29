import axios from "axios";
import { useState, useEffect } from "react";

export default function Recette() {
  const [recette, setRecette] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((res) => {
        setRecette(res.data.meals[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (!recette) return <p>Erreur lors de la récupération de la recette.</p>;

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial" }}>
      <h2>{recette.strMeal}</h2>
      <img
        src={recette.strMealThumb}
        alt={recette.strMeal}
        width="300"
        style={{ borderRadius: "10px" }}
      />
      <p style={{ maxWidth: "500px", margin: "20px auto" }}>
        {recette.strInstructions.split("\n").slice(0, 3).join(" ")}...
      </p>
    </div>
  );
}
