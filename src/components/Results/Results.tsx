import playIcon from "../../assets/images/icon-play.svg";
import "./Result.css";

const Results = ({ data, isLoading, error }) => {
  const handleClickSound = (phonetics) => {
    const url = phonetics.reduce((acc, item) => {
      if (item.audio) {
        return item.audio;
      }
      return acc;
    }, "");
    if (!url) return alert("No audio available");
    const audio = new Audio(url);
    audio.play();
  };

  return (
    <>
      <div>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error.message}</p>}
        {data &&
          data.map((item, index) => {
            return (
              <div>
                <div key={index} className="result-word">
                  <div>
                    <h1>{item.word}</h1>
                    <p>{item.phonetic}</p>
                  </div>
                  <div>
                    <img
                      src={playIcon}
                      alt="play"
                      onClick={() => handleClickSound(item.phonetics)}
                    />
                  </div>
                </div>
                {item.meanings.map((meaning, index) => {
                  return (
                    <div key={index} className="result-meaning">
                      <div className="definition-title">
                        <p>{meaning.partOfSpeech}</p>
                        <span className="line-definition"></span>
                      </div>
                      {meaning.definitions.map((definition, index) => {
                        return (
                          <ul key={index}>
                            <li>{definition.definition}</li>
                          </ul>
                        );
                      })}
                      <p>
                        Synonyms:{" "}
                        {meaning.synonyms.map((s) => (
                          <span className="synonym">{s}</span>
                        ))}
                      </p>
                    </div>
                  );
                })}
                <p> Source: {item.sourceUrls.map((url) => `${url} `)}</p>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Results;
