import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [momsGirlNames, setMomsGirlNames] = useState(
    localStorage.getItem("momsGirlNames")?.split(",") || []
  );
  const [dadsGirlNames, setDadsGirlNames] = useState(
    localStorage.getItem("dadsGirlNames")?.split(",") || []
  );
  const [momsBoyNames, setMomsBoyNames] = useState(
    localStorage.getItem("momsBoyNames")?.split(",") || []
  );
  const [dadsBoyNames, setDadsBoyNames] = useState(
    localStorage.getItem("dadsBoyNames")?.split(",") || []
  );
  const [girlMatches, setGirlMatches] = useState(
    localStorage.getItem("girlMatches")?.split(",") || []
  );
  const [boyMatches, setBoyMatches] = useState(
    localStorage.getItem("boyMatches")?.split(",") || []
  );

  const handleMom = (e, gender) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const name = form.get("name");

    if (gender === "girl") {
      setMomsGirlNames([...momsGirlNames, name]);
    } else {
      setMomsBoyNames([...momsBoyNames, name]);
    }

    e.target.reset();
  };

  const handleDad = (e, gender) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const name = form.get("name");

    if (!name) return;

    if (gender === "girl") {
      setDadsGirlNames([...dadsGirlNames, name]);
    } else {
      setDadsBoyNames([...dadsBoyNames, name]);
    }

    e.target.reset();
  };

  const findMatches = () => {
    const boyMatches = momsBoyNames.filter(
      (name) => dadsBoyNames.indexOf(name) !== -1
    );
    const girlMatches = momsGirlNames.filter(
      (name) => dadsGirlNames.indexOf(name) !== -1
    );

    setBoyMatches(boyMatches.length ? boyMatches : []);
    setGirlMatches(girlMatches.length ? girlMatches : []);
  };

  useEffect(() => {
    localStorage.setItem("momsGirlNames", momsGirlNames);
    localStorage.setItem("momsBoyNames", momsBoyNames);
    localStorage.setItem("dadsGirlNames", dadsGirlNames);
    localStorage.setItem("dadsBoyNames", dadsBoyNames);

    localStorage.setItem("boyMatches", boyMatches);
    localStorage.setItem("girlMatches", girlMatches);

    findMatches();
  }, [momsBoyNames, momsGirlNames, dadsBoyNames, dadsGirlNames]);

  return (
    <div className="App">
      <main>
        <div className="gender-section">
          <h1>GIRL</h1>
          <h2>mom's picks</h2>
          <ul>
            {momsGirlNames.map((name) => (
              <li
                className={girlMatches.indexOf(name) !== -1 ? "match" : "nope"}
                key={33 * Math.random() * Date.now()}
              >
                {name}
              </li>
            ))}
          </ul>
          <form onSubmit={(e) => handleMom(e, "girl")}>
            <input type="text" name="name" />
            <button type="submit">✚</button>
          </form>
          <h2>dad's picks</h2>
          <ul>
            {dadsGirlNames.map((name) => (
              <li
                className={girlMatches.indexOf(name) !== -1 ? "match" : "nope"}
                key={33 * Math.random() * Date.now()}
              >
                {name}
              </li>
            ))}
          </ul>
          <form onSubmit={(e) => handleDad(e, "girl")}>
            <input type="text" name="name" />
            <button type="submit">✚</button>
          </form>
        </div>

        <div>
          <h1>BOY</h1>
          <h2>mom's picks</h2>
          <ul>
            {momsBoyNames.map((name) => (
              <li
                className={boyMatches.indexOf(name) !== -1 ? "match" : "nope"}
                key={33 * Math.random() * Date.now()}
              >
                {name}
              </li>
            ))}
          </ul>
          <form onSubmit={(e) => handleMom(e, "boy")}>
            <input type="text" name="name" />
            <button type="submit">✚</button>
          </form>
          <h2>dad's picks</h2>
          <ul>
            {dadsBoyNames.map((name) => (
              <li
                className={boyMatches.indexOf(name) !== -1 ? "match" : "nope"}
                key={33 * Math.random() * Date.now()}
              >
                {name}
              </li>
            ))}
          </ul>
          <form onSubmit={(e) => handleDad(e, "boy")}>
            <input type="text" name="name" />
            <button type="submit">✚</button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;
