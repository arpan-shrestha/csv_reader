from sqlalchemy.orm import Session
from fastapi import UploadFile, HTTPException
from app.models.csv_file import CSVFile
import os
import pandas as pd
from fastapi.encoders import jsonable_encoder

def save_csv(db: Session, file:UploadFile, user_id: int):
    if file.content_type != "text/csv":
        raise HTTPException(status_code=400, detail="Invalid file type")
    print(file)
    os.makedirs("app/statics/csv", exist_ok=True)
    filepath = f"app/statics/csv/{file.filename}"
    with open(filepath, "wb") as f:
        f.write(file.file.read())
    csv_record = CSVFile(
        filename=file.filename,
        path=filepath,
        uploaded_by=user_id
    )
    db.add(csv_record)
    db.commit()
    return csv_record

def list_csv(db: Session):
    return db.query(CSVFile).all()

def read_csv(db: Session, csv_id: int):
    csv_record = db.query(CSVFile).filter_by(id=csv_id).first()
    if not csv_record:
        raise HTTPException(status_code=404, detail="CSV not found")
    df = pd.read_csv(csv_record.path)
    data = df.where(pd.notnull(df), None).to_dict(orient="records")
    return jsonable_encoder(data) 


def delete_csv(db:Session, csv_id:int):
    file_record = db.query(CSVFile).filter_by(id=csv_id).first()
    if not file_record:
        raise HTTPException(status_code=404, detail="CSV not found")
    file_path = file_record.path
    if os.path.exists(file_path):
        os.remove(file_path)
    db.delete(file_record)
    db.commit()

    return{"message":"csv deleted successfully"}

