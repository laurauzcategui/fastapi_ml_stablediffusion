import { useState, useEffect } from "react";
import GenImage from "./components/GenImage";
import Header from "./components/Header";

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
    
    <div className="columns">
      <div className="column">
        <Header title={message}/>
        <GenImage />
      </div>
      
    </div>
    </>
    
  );

}

export default App;
