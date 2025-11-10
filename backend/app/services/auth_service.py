from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.user import User
from app.core.security import hash_password, verify_password, create_access_token

def signup_user(db: Session, username: str, password: str):
    if db.query(User).filter_by(username=username).first():
        raise HTTPException(status_code=400, detail="User already exists")
    user = User(
        username=username,
        password_hash=hash_password(password),
        role="user"
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def login_user(db: Session, username: str, password: str):
    user = db.query(User).filter_by(username=username).first()
    if not user or not verify_password(password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid Credentials")
    
    token = create_access_token({"id":user.id,"username":user.username,"role":user.role})
    return {"access_token":token}


def get_user_from_token(db: Session, token: str):
    from jose import jwt 
    from app.core.security import SECRET
    try:
        data = jwt.decode(token, SECRET)
        return db.query(User).filter_by(id=data["id"]).first()
    except:
        raise HTTPException(status_code=401, detail="Invalid Token")
    
def delete_user(db: Session, username:str):
    user = db.query(User).filter_by(username=username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"message": f"User {username} deleted"}

def list_user(db: Session):
    return db.query(User).all()