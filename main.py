from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.analyze import router as analyze_router
from app.api.tickets import router as tickets_router
from app.services.database_service import create_database

app = FastAPI(
    title="BugPilot AI API",
    version="1.0.0"
)

# Create database and table
create_database()  

# Allow Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(analyze_router, prefix="/api")
app.include_router(tickets_router, prefix="/api")

@app.get("/")
def root():
    return {
        "message": "BugPilot AI Backend Running 🚀"
    }