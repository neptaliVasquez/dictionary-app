import playIcon from "../../assets/images/icon-play.svg";
import source from "../../assets/images/icon-new-window.svg";
import "./Result.css";

interface ResultsProps {
  data: Array<object> | null;
  isLoading: boolean;
  error: Error | null;
}

const Results = ({ data, isLoading, error }: ResultsProps) => {
  const handleClickSound = (phonetics: Array<{ audio: string }>) => {
    if (!phonetics || phonetics.length === 0) {
      alert("No audio available");
      return;
    }
    const url = phonetics.find((item) => item.audio)?.audio;
    if (!url) {
      alert("No audio available");
      return;
    }
    const audio = new Audio(url);
    audio.play();
  };

  if (isLoading) {
    return <p className="processing intermittent-text">Loading... </p>;
  }

  if (error) {
    return <p className="processing error">{error.message}</p>;
  }

  if (!data || data.length === 0) {
    return null; // or render a message indicating no results
  }

  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <div className="result-word">
            <div>
              <h2 className="title">
                {(item as { word: string; phonetic: string }).word}
              </h2>
              <p className="phonetic">
                {
                  (
                    item as {
                      phonetic: string;
                      phonetics: Array<{ audio: string }>;
                    }
                  ).phonetic
                }
              </p>
            </div>
            <div>
              <img
                className="play-icon"
                src={playIcon}
                alt="play"
                onClick={() =>
                  handleClickSound(
                    (item as { phonetics: Array<{ audio: string }> }).phonetics
                  )
                }
              />
            </div>
          </div>

          {(item as { meanings: Array<object> }).meanings.map(
            (meaning, index) => (
              <div key={index} className="result-meaning">
                <div className="definition-title">
                  <p>{(meaning as { partOfSpeech: string }).partOfSpeech}</p>
                  <span className="line-definition"></span>
                </div>
                <p className="synonyms_title">Meaning</p>
                <ul>
                  {(
                    meaning as { definitions: Array<{ definition: string }> }
                  ).definitions.map((definition, index) => (
                    <li key={index}>{definition.definition}</li>
                  ))}
                </ul>
                <p className="synonyms_box">
                  <span className="synonyms_title">Synonyms:</span>{" "}
                  {(meaning as { synonyms: string[] }).synonyms.map(
                    (s, index) => (
                      <span key={index} className="synonym">
                        {s}
                      </span>
                    )
                  )}
                </p>
              </div>
            )
          )}
          <hr />
          <p>
            {" "}
            <span className="synonyms_title">Source:</span>{" "}
            {(item as { sourceUrls: string[] }).sourceUrls.map((url, index) => (
              <span key={index} className="source">
                {url}
                <a href={url} target="_blank">
                  <img className="new-window" src={source} alt="source" />
                </a>
              </span>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Results;
