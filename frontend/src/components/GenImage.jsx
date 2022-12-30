import { useState } from "react";
import ErrorMessage from "./ErrorMessage";

const GenImage = () => {
    const [prompt, setPrompt] = useState("");
    const [seed, setSeed] = useState(null);
    const [guidanceScale, setGuidanceScale] = useState(7.5);
    const [numInfSteps, setNumInfSteps] = useState(10);
    const [errorMessage, setErrorMessage] = useState("");
    const [img, setImg] = useState();

    const cleanFormData = () => {
        setPrompt("");
        setSeed(null);
        setGuidanceScale(7.5);
        setNumInfSteps(50);
    }

    // create a function that handles creating the lead
    const handleGenerateImage = async (e) => {

        const requestOptions = {
            method: "GET", 
            headers: {"Content-Type": "application/json"}, 
            
        };
        // body: JSON.stringify(`prompt=${prompt}&num_inference_steps=${numInfSteps}&guidance_scale=${guidanceScale}&seed=`)
        const response = await fetch(`/api/generate/?prompt=${prompt}&num_inference_steps=${numInfSteps}&guidance_scale=${guidanceScale}`, requestOptions);
        
        if (!response.ok){
            setErrorMessage("Ooops! Something went wrong generating the image");
        } else {
            const imageBlob = await response.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setImg(imageObjectURL);
            cleanFormData();
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleGenerateImage();
    }

    return (
        <>
        <div className="columns">
            <div className="column">
                <form className="box" onSubmit={handleSubmit}>
                    <h1 className="title has-text-centered">Generate Image with Stable Diffuser</h1>
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
            <div column>
                <img src={img} alt="genimage" />
            </div>
        </div>
        </>
        
    )


}

export default GenImage
