import { useState, useEffect } from "react";
import axios from "axios";

export default function DevineDrapeau() {
  const [flag, setFlag] = useState({ nom: "", img: "" });
  const [inp, setInp] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);

  const getRandomFlag = () => {
    axios.get("https://restcountries.com/v3.1/all?fields=name,flags")
      .then((response) => {
        const data = response.data;
        const rand = Math.floor(Math.random() * data.length);
        const randCountry = data[rand];
        setFlag({
          img: randCountry.flags.png,
          nom: randCountry.name.common
        });
        setInp("");
        setMessage("");
      })
      .catch((error) => console.log(error));
  };

  const verif = () => {
    if (inp.trim().toLowerCase() === flag.nom.toLowerCase()) {
      setMessage("✅ Bravo !");
      setScore(score + 1);
    } else {
      setMessage(`❌ Non, c'était ${flag.nom}`);
    }
  };

  useEffect(() => {
    getRandomFlag();
  }, []);

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial" }}>
      <h2>Devine le Drapeau</h2>
      <img src={flag.img} alt="flag" width="200" style={{ marginBottom: "10px" }} />
      <div>
        <input
          type="text"
          value={inp}
          onChange={(e) => setInp(e.target.value)}
          placeholder="Écris le nom du pays"
        />
        <button onClick={verif} style={{ marginLeft: "10px" }}>Vérifier</button>
      </div>
      <div style={{ marginTop: "10px", fontWeight: "bold" }}>{message}</div>
      <button onClick={getRandomFlag} style={{ marginTop: "10px" }}>Suivant 🎲</button>
      <div style={{ marginTop: "10px" }}>Score : {score}</div>
    </div>
  );
}
