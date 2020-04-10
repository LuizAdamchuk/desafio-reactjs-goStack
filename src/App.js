import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api
      .get("repositories")
      .then((response) => {
        setRepositories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  async function handleAddRepository() {
    try {
      const response = await api.post("repositories", {
        title: "Desafio React.js",
        url: "https://github.com/LuizAdamchuk/desafio-reactjs-goStack.git",
        techs: ["Node.js", "React", "React Native"],
      });

      setRepositories(...repositories, response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);

      setRepositories(
        repositories.filter((repository) => repository.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        <li>
          Repositório 1
          <button onClick={() => handleRemoveRepository(1)}>Remover</button>
        </li>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
