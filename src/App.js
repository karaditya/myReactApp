import React, { useState, useEffect, useCallback, Fragment } from "react";
import Cards from "./Cards";
import { EuiComboBox } from "@elastic/eui";
import { EuiCard, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import "./index.css";
import "@elastic/eui/dist/eui_theme_dark.css";

function App() {
  const allOptions = [];
  // Fetch Municiplaity Data from Api and set into the search options
  fetch("https://www.el-tiempo.net/api/json/v2/provincias/08/municipios")
    .then((res) => res.json())
    .then((data) => {
      const indices = [];
      for (let i = 0; i < data.municipios.length; i++) {
        indices.push(i);
      }
      indices.map((index) =>
        allOptions.push({
          label: data.municipios[index].NOMBRE,
          codi: data.municipios[index].CODIGOINE.substring(0, 5),
        })
      );
    });
  // console.log(allOptions);

  const [selectedOptions, setSelected] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  let searchTimeout;
  const onChange = (selectedOptions) => {
    setSelected(selectedOptions);
  };
  // console.log(selectedOptions);

  const onSearchChange = useCallback((searchValue) => {
    setLoading(true);
    setOptions([]);

    clearTimeout(searchTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    searchTimeout = setTimeout(() => {
      // Simulate a remotely-executed search.
      setLoading(false);
      setOptions(
        allOptions.filter((option) =>
          option.label.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }, 1200);
  }, []);

  const onCreateOption = (searchValue, flattenedOptions = []) => {
    const normalizedSearchValue = searchValue.trim().toLowerCase();

    if (!normalizedSearchValue) {
      return;
    }

    const newOption = {
      label: searchValue,
    };

    // Create the option if it doesn't exist.
    if (
      flattenedOptions.findIndex(
        (option) => option.value.trim().toLowerCase() === normalizedSearchValue
      ) === -1
    ) {
      // Simulate creating this option on the server.
      allOptions.push(newOption);
      setOptions([...options, newOption]);
    }

    // Select the option.
    setSelected([...selectedOptions, newOption]);
  };

  useEffect(() => {
    // Simulate initial load.
    onSearchChange("");
  }, [onSearchChange]);
  // Define the async selector in a variable
  const comboBox = (
    <EuiComboBox
      placeholder="Search Any Municipality"
      options={options}
      selectedOptions={selectedOptions}
      isLoading={isLoading}
      onChange={onChange}
      onSearchChange={onSearchChange}
      onCreateOption={onCreateOption}
    />
  );
  // Fetch Meteorological data from API
  const url = "https://www.el-tiempo.net/api/json/v2/provincias/08/municipios/";
  const [cards, setCards] = useState([]);
  useEffect(() => {
    selectedOptions.map((option) => {
      fetch(url + option.codi)
        .then((res) => res.json())
        .then(
          (data) => setCards([...cards, data])
          // (data) => setCards([...cards, data])
          /* dispCard.push({
            id: option.codi,
            name: option.label,
            state: data.stateSky,
            temp: data.temperaturas,
            humid: data.humedad, 
          })*/
        );
    });
  }, [selectedOptions]);
  //console.log(cards);

  // Assemble all components
  return (
    <main>
      <header>
        <h1>
          Municipio
          <br />
          De Barcelona
        </h1>
      </header>
      <div style={{ padding: "0px 0px 40px 300px" }}>{comboBox}</div>
      <Cards cards={cards} />
    </main>
  );
}

export default App;
