from app.core.database import SessionLocal
from app.core.security import hash_password
from app.models.user import User
from dotenv import load_dotenv
import os
load_dotenv()

# Create Admin on Startup
def create_admin():
    ADMIN_USER= os.environ.get("ADMIN_USER")
    ADMIN_PASS= os.environ.get("ADMIN_PASS")[:72]
    if not ADMIN_USER or not ADMIN_PASS:
        print("Creditional not provided")
        return
    db=SessionLocal()

    try:
        if not db.query(User).filter_by(username=ADMIN_USER).first():
            admin = User(username=ADMIN_USER, password_hash=hash_password(ADMIN_PASS), role="admin")
            db.add(admin)
            db.commit()
            print("Admin User Created")
    finally:
        db.close()