import React, { useEffect, useState } from "react";
import "./TestHtml.css";

const TestHtml = ({ props }) => {
  const _id = props.match.params._id;
  const endpoint = process.env.REACT_APP_REDIS_API_ENDPOINT;

  const [name, setName] = useState("loading...");
  const [lines, setLines] = useState(["loading"]);
  const [topWords, setTopWords] = useState(["loading"]);
  const [topWordsCount, setTopWordsCount] = useState(3);
  const [questions, setQuestions] = useState(["loading.."]);
  const [resultsRequired, setResultsRequired] = useState(5);

  const [clikcedLines, setClikcedLines] = useState([]);
  console.log(clikcedLines);

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
        console.log(data);
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
        console.log(data);
        setTopWords(Object.keys(data));
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
    <div class="pure-g">
      <div class="pure-u-1 pure-u-md-4-24  pure-u-xl-7-24"> </div>
      <div class="pure-u-1 pure-u-md-16-24 pure-u-xl-10-24">
        <p>{name}</p>

        <input
          className="input-box-search-primary"
          type="search"
          name="search1"
          id=""
          value={payload.query}
          onChange={handleInputChange}
        ></input>

        <div className="important-questions">
          <br />
          Important questions:
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
              {question}
              <br />
            </a>
          ))}
        </div>

        <div className="freq-words">
          <br />
          Frequent words:
          <br />
          {topWords.slice(0, topWordsCount).map((words, idx) => (
            <a
              onClick={() => {
                setPayload({ ...payload, query: words });
              }}
              className="link-wrap"
              href="#"
              key={idx}
            >
              {" "}
              {words.toLowerCase()}:{" "}
            </a>
          ))}
          <button
            onClick={() => {
              setTopWordsCount(topWordsCount + 3);
            }}
          >
            load more!
          </button>
        </div>

        <div className="important-lines">
          <br />
          Important lines:
          <br />
          {lines.map((Lines, idx) => (
            <div className="lines">
              <a
                onClick={() => {
                  setPayload({ ...payload, query: Lines["line"] });
                  setClikcedLines([...clikcedLines, Lines["line"]]);
                }}
                className="link-wrap"
                href="#"
                key={idx}
              >
                {Lines["line"]}
              </a>
            </div>
          ))}
          <button
            onClick={() => {
              setResultsRequired(resultsRequired + 5);
              setPayload({ ...payload, maxResults: resultsRequired + 5 });
            }}
          >
            load more !
          </button>
        </div>
      </div>
      <div class="pure-u-1 pure-u-md-4-24 pure-u-xl-6-24">
        Clicked lines
        <br />
        {clikcedLines.map((clickedLines) => {
          return (
            <span>
              {clickedLines}
              <br />
              <br/>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default TestHtml;
