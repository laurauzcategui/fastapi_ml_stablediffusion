import pydantic as _pydantic
from typing import Optional

class _PromptBase(_pydantic.BaseModel):
    seed: Optional[int] = 42
    num_inference_steps: int = 10
    guidance_scale: float = 7.5


class ImageCreate(_PromptBase):
    prompt: str