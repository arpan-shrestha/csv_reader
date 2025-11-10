from pydantic import BaseModel

class CSVData(BaseModel):
    id: int
    filename: str
    upload_time: str

    