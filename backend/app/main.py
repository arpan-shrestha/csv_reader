from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import engine, Base
from app.core.bootstrap import create_admin
from app.routes import auth, csv_files
from dotenv import load_dotenv
load_dotenv()

Base.metadata.create_all(bind=engine)
app=FastAPI(title="CSV Viewer")

#------Create admin---------
create_admin()
#---------------------------
app.include_router(auth.router, prefix="/auth")
app.include_router(csv_files.router, prefix="/csv")



app.add_middleware(
    CORSMiddleware, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_origins=["*"],
)
