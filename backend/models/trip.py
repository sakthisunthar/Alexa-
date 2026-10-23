from pydantic import BaseModel, Field
from typing import Optional


class TripRequest(BaseModel):
    destination: str = Field(..., min_length=1, max_length=200)
    startDate: str = Field(..., pattern=r"^\d{4}-\d{2}-\d{2}$")
    endDate: str = Field(..., pattern=r"^\d{4}-\d{2}-\d{2}$")
    travelers: int = Field(default=2, ge=1, le=20)
    budget: str = Field(..., min_length=1)
    currency: str = Field(default="USD", max_length=3)
    travelStyle: str = Field(default="moderate")
    interests: list[str] = Field(default_factory=list)
    accommodation: str = Field(default="hotel")
    transportation: str = Field(default="mixed")


class Activity(BaseModel):
    time: str
    name: str
    description: str
    location: str
    duration: str
    estimatedCost: float = 0
    category: str = "sightseeing"


class DaySchedule(BaseModel):
    dayNumber: int
    date: str
    title: str
    activities: list[Activity]


class BudgetBreakdown(BaseModel):
    accommodation: float = 0
    food: float = 0
    transportation: float = 0
    activities: float = 0
    other: float = 0


class BudgetSummary(BaseModel):
    total: float
    currency: str
    breakdown: BudgetBreakdown
    totalEstimated: float
    remaining: float


class TripResponse(BaseModel):
    id: str
    destination: str
    startDate: str
    endDate: str
    travelers: int
    travelStyle: str
    interests: list[str]
    days: list[DaySchedule]
    budget: BudgetSummary
    notes: list[str] = Field(default_factory=list)
    dataSource: str = "sample"
