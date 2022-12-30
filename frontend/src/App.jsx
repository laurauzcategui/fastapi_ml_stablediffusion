import { useState, useEffect } from "react";
import GenImage from "./components/GenImage";

const App = () => {

  // create message
  const [message, setMessage] = useState("");

  const getWelcomeMessage = async() => {
    const requestOptions = {
      method: "GET", 
      headers: {
        "Content-Type": "application/json", 

      },
    };
    const response = await fetch("/api", requestOptions);
    const data = await response.json();

    if (!response.ok){
      console.log("something messed up");
    } else{
      setMessage(data.message);
    }
  };

  useEffect(() => {
    getWelcomeMessage();
  }, []);

  return (
    <>
    <h1 className="title">{message}</h1>
    <div className="columns">
      <GenImage />
    </div>
    </>
    
  );

}

export default App;
