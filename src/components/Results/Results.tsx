import playIcon from "../../assets/images/icon-play.svg";
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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
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
              <h1>{(item as { word: string; phonetic: string }).word}</h1>
              <p>
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
                <ul>
                  {(
                    meaning as { definitions: Array<{ definition: string }> }
                  ).definitions.map((definition, index) => (
                    <li key={index}>{definition.definition}</li>
                  ))}
                </ul>
                <p>
                  Synonyms:{" "}
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
          <p>
            {" "}
            Source:{" "}
            {(item as { sourceUrls: string[] }).sourceUrls.map((url, index) => (
              <span key={index}>{url} </span>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Results;
