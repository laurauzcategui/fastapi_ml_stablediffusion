from pathlib import Path 
import schemas as _schemas

import torch 
from diffusers import StableDiffusionPipeline
from PIL.Image import Image
import os
from dotenv import load_dotenv

load_dotenv()

# Get the token from HuggingFace 
"""
Note: make sure .env exist and contains your token
"""
HF_TOKEN = os.getenv('HF_TOKEN')

# Create the pipe 
pipe = StableDiffusionPipeline.from_pretrained(
    "CompVis/stable-diffusion-v1-4", 
    revision="fp16", 
    torch_dtype=torch.float16,
    use_auth_token=HF_TOKEN
    )

if torch.backends.mps.is_available():
    device = "mps"
else: 
    device = "cuda" if torch.cuda.is_available() else "cpu"

pipe.to(device)


async def generate_image(imgPrompt: _schemas.ImageCreate) -> Image: 
    generator = None if imgPrompt.seed is None else torch.Generator().manual_seed(int(imgPrompt.seed))

    image: Image = pipe(imgPrompt.prompt,
                        guidance_scale=imgPrompt.guidance_scale, 
                        num_inference_steps=imgPrompt.num_inference_steps, 
                        generator = generator, 
                    ).images[0]
    
    return image

def obtain_image(
    prompt: str, 
    *, 
    seed: int | None, 
    num_inference_steps: int = 50, 
    guidance_scale: float = 7.5, 
) -> Image: 
    generator = None if seed is None else torch.Generator().manual_seed(int(seed))  
    print(f"Using device:{pipe.device}")
    image: Image = pipe(
        prompt,
        guidance_scale=guidance_scale, 
        num_inference_steps=num_inference_steps, 
        generator = generator, 
    ).images[0]

    return image

#image = obtain_image(prompt=prompt, num_inference_steps=5, seed=1024)
