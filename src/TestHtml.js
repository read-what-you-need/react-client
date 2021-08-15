import React, { useEffect, useState } from "react";
import "./TestHtml.css";

const TestHtml = ({ props }) => {
  const _id = props.match.params._id;
  const endpoint = process.env.REACT_APP_REDIS_API_ENDPOINT;

  const [name, setName] = useState("loading...");
  const [lines, setLines] = useState(["loading"]);
  const [topWords, setTopWords] = useState(["loading"]);
  const [questions, setQuestions] = useState(["loading.."]);
  const [resultsRequired, setResultsRequired] = useState(5);

  const [payload, setPayload] = useState({
    uuid: _id,
    query: "",
    maxResults: resultsRequired,
    accuracyGreaterThan: 0.2,
  });

  useEffect(() => {
    getFileName(_id);

    getTopWords(_id);

    getImpQuestions(_id);
  }, []);

  // useEffect listening on json payload changes
  useEffect(() => {
    fetch(endpoint + "getLines", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => setLines(data));
  }, [payload]);

  const getFileName = (_id) => {
    fetch(endpoint + "/getFileDetails/" + _id)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setName(data.name);
        return data.name;
      })
      .catch((error) => {
        console.log("error fetching name from id");
      });
  };

  const getTopWords = (_id) => {
    fetch(endpoint + "/top/words/" + _id)
      .then((response) => response.json())
      .then((data) => {
        setTopWords(Object.keys(data).slice(0, 5));
        return data;
      })
      .catch((error) => {
        console.log("error fetching top words");
      });
  };

  const getImpQuestions = (_id) => {
    fetch(endpoint + "/getImpQuestions/" + _id, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  };

  const handleInputChange = (event) => {
    setPayload({
      uuid: _id,
      query: event.target.value,
      maxResults: resultsRequired,
      accuracyGreaterThan: 0.2,
    });
  };

  return (
    <div style={{ marginLeft: 100 }}>
      <p>file: {name}</p>

      <input
        className="input-box-search-primary"
        type="search"
        name="search1"
        id=""
        onChange={handleInputChange}
      ></input>

      <div className="important-questions">
        <br />
        most important questions:
        <br />
        {questions.map((question, idx) => (
          <a
            className="link-wrap"
            href="#/"
            key={idx}
            onClick={() => {
              setPayload({
                uuid: _id,
                query: question,
                maxResults: resultsRequired,
                accuracyGreaterThan: 0.2,
              });
            }}
          >
            {question}<br />
          </a>
        ))}
      </div>

      <div>
        <br />
        most freq word from file:
        {topWords.map((words, idx) => (
          <a className="link-wrap" href="#" key={idx}>
            {" "}
            {words.toLowerCase()}:{" "}
          </a>
        ))}
      </div>

      <div className="box">
        <br />
        Important lines:
        <br />
        {lines.map((Lines, idx) => (
          <li>
            <a onClick={() => {
              setPayload({...payload, query: Lines["line"]})
            }} className="link-wrap" href="#" key={idx}>
              {Lines["line"]}
            </a>
          </li>
        ))}
        <button onClick={() => {
          setResultsRequired(resultsRequired+5)
          setPayload({...payload, maxResults: resultsRequired+5})
        }}>load more !</button>
      </div>
    </div>
  );
};

export default TestHtml;
