from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services.auth_service import signup_user, login_user, delete_user, list_user
from pydantic import BaseModel
from app.dependencies.roles import admin_required

router = APIRouter()

class CreateUser(BaseModel):
    username: str
    password: str

@router.post("/signup")
def signup(data: CreateUser, db: Session= Depends(get_db)):
    user = signup_user(db, data.username, data.password)
    return {"message": f"User {user.username} Created"}

@router.post("/login")
def login(data: CreateUser, db: Session= Depends(get_db)):
    token = login_user(db, data.username, data.password)
    return {"access_token": token}

@router.get("/users", dependencies=[Depends(admin_required)])
def user_list(db: Session= Depends(get_db)):
    users = list_user(db)
    return users

@router.delete("/user/{username}", dependencies=[Depends(admin_required)])
def delete(username:str, db: Session= Depends(get_db)):
    result = delete_user(db, username)
    return result
