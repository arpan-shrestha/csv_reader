from passlib.context import CryptContext
from jose import jwt
import os
from dotenv import load_dotenv
load_dotenv()

SECRET = os.getenv("SECRET_KEY")
ALGO = os.getenv("ALGORITHM")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password):
    return pwd_context.hash(password)

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

def create_access_token(data:dict):
    return jwt.encode(data, SECRET, algorithm=ALGO)


