from fastapi import APIRouter,Depends, UploadFile, File
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services.csv_service import save_csv, list_csv, read_csv, delete_csv
from app.dependencies.roles import admin_required, user_required

router = APIRouter()

@router.post("/upload")
def upload_csv(file: UploadFile = File(...), db: Session = Depends(get_db), current_user=Depends(admin_required)):
    print(file)
    csv_record = save_csv(db, file, current_user.id)
    return {"message": "CSV uploaded successfully", "filename": csv_record.filename}

@router.get("/files", dependencies=[Depends(user_required)])
def get_csv_files(db:Session = Depends(get_db)):
    csv_file = list_csv(db)
    return csv_file

@router.get("/files/{csv_id}", dependencies=[Depends(user_required)])
def get_csv_data(csv_id: int, db: Session = Depends(get_db)):
    data = read_csv(db, csv_id)
    return data

@router.delete("/files/{csv_id}", dependencies=[Depends(admin_required)])
def delete_csv_file(csv_id:int, db: Session = Depends(get_db)):
    result = delete_csv(db, csv_id)
    return result