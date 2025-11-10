from pydantic import BaseModel
class CreateUser(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    token: str
    