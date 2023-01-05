import { useState } from "react";
import ErrorMessage from "./ErrorMessage";

const GenImage = () => {
    const [prompt, setPrompt] = useState("");
    const [seed, setSeed] = useState(42);
    const [guidanceScale, setGuidanceScale] = useState(7.5);
    const [numInfSteps, setNumInfSteps] = useState(10);
    const [errorMessage, setErrorMessage] = useState("");
    const [img, setImg] = useState(null);
    const [promptImg, setPromptImg] = useState(null);
    const [loadingImg, setLoadingImg] = useState(false);

    const cleanFormData = () => {
        setPrompt("");
        setSeed(42);
        setGuidanceScale(7.5);
        setNumInfSteps(5);
        setLoadingImg(false);
        setErrorMessage("");
    }

    // create a function that handles creating the lead
    const handleGenerateImage = async (e) => {

        const requestOptions = {
            method: "GET", 
            headers: {"Content-Type": "application/json"}, 
            
        };

        setLoadingImg(true);
        // body: JSON.stringify(`prompt=${prompt}&num_inference_steps=${numInfSteps}&guidance_scale=${guidanceScale}&seed=`)
        const response = await fetch(`/api/generate/?prompt=${prompt}&num_inference_steps=${numInfSteps}&guidance_scale=${guidanceScale}&seed=${seed}`, requestOptions);
        
        if (!response.ok){
            setErrorMessage("Ooops! Something went wrong generating the image");
        } else {
            const imageBlob = await response.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setImg(imageObjectURL);
            setPromptImg(prompt);
            cleanFormData();
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setImg(null);
        setPromptImg(null);
        handleGenerateImage();
    }

    return (
        <>
        <div className="columns is-vcentered">
            <div className="column">
                <form className="box" onSubmit={handleSubmit}>
                    <h1 className="title has-text-centered is-4">Generate Image with Stable Diffuser</h1>
                    <div className="field">
                        <label className="label">Prompt</label>
                        <div className="control">
                            <input 
                                type="text" 
                                placeholder="Enter your prompt to generate the image" 
                                value={prompt} 
                                onChange={(e) =>setPrompt(e.target.value)}
                                className="textarea"
                                required
                            /> 
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Seed</label>
                        <div className="control">
                            <input 
                                type="text" 
                                placeholder="seed" 
                                value={seed} 
                                onChange={(e) =>setSeed(e.target.value)}
                                className="input"
                            /> 
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Guidance Scale</label>
                        <div className="control">
                            <input 
                                type="text" 
                                placeholder="guidancescale" 
                                value={guidanceScale} 
                                onChange={(e) =>setGuidanceScale(e.target.value)}
                                className="input"
                            /> 
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Number of Inference Steps - Bigger is Slower, Better Quality</label>
                        <div className="control">
                            <input 
                                type="text" 
                                placeholder="Bigger is Slower, Better Quality" 
                                value={numInfSteps} 
                                onChange={(e) =>setNumInfSteps(e.target.value)}
                                className="input"
                            /> 
                        </div>
                    </div>            
                        <ErrorMessage message={errorMessage}/>
                    <br /> 
                    <button className="button is-primary" type="submit">Generate Image</button>
                </form>
            </div>
            <div className="column">
            { img ? ( 
            <figure>
                <img src={img} alt="genimage" />
                <figcaption>{promptImg}</figcaption>
            </figure> ) 
                  : <></>
            }
            { loadingImg ? (
                <progress className="progress is-small is-primary" max="100">Loading</progress>
            ) : <></>
            }
            </div>
        </div>
        </>
        
    )


}

export default GenImage
