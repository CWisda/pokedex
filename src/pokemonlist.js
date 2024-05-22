import React, { useState, useEffect } from "react";
import "./styles.css";

const PokemonList = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedWeakness, setSelectedWeakness] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
        );
        const data = await response.json();
        setPokemonData(data.pokemon);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const uniqueTypes = Array.from(
    new Set(pokemonData.flatMap((pokemon) => pokemon.type))
  );
  
  const uniqueWeaknesses = Array.from(
    new Set(pokemonData.flatMap((pokemon) => pokemon.weaknesses))
  );

  const filteredPokemon = pokemonData.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedType ? pokemon.type.includes(selectedType) : true) &&
      (selectedWeakness ? pokemon.weaknesses.includes(selectedWeakness) : true)
  );

  return (
    <div>
      <div className="search-container">
        <h1>Gotta Catch em All! </h1>
        <input
          className="search-input"
          type="text"
          placeholder="Search Pokemon by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="filter-select"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">All Types</option>
          {uniqueTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={selectedWeakness}
          onChange={(e) => setSelectedWeakness(e.target.value)}
          className="filter-select"
        >
          <option value="">All Weaknesses</option>
          {/* Populate options dynamically based on available weaknesses */}
          {uniqueWeaknesses.map((weakness) => (
            <option key={weakness} value={weakness}>
              {weakness}
            </option>
          ))}
        </select>
      </div>
      <div className="pokemon-card-container">
        <ul>
          {filteredPokemon.map((pokemon) => (
            <div key={pokemon.id} className="pokemon-card">
              <img src={pokemon.img} alt={pokemon.name} />
              <strong>{pokemon.name}</strong> - {pokemon.num}
              <br />
              Type: {pokemon.type.join(", ")}
              <br />
              Weaknesses: {pokemon.weaknesses.join(", ")}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonList;
