from pydantic import BaseModel, Field, computed_field
from typing import Annotated, Literal, Optional, Dict, Any, List


class Patient(BaseModel):
    id: Annotated[
        str,
        Field(
            ...,
            description="ID of the patient",
            examples=["P001"]
        )
    ]

    name: Annotated[
        str,
        Field(
            ...,
            description="Patient Name",
            examples=["Sohail"]
        )
    ]

    city: Annotated[
        str,
        Field(
            ...,
            description="City where patient living",
            examples=["Lahore"]
        )
    ]

    age: Annotated[
        int,
        Field(
            ...,
            ge=0,
            le=120,
            description="Age of the Student",
            examples=[34]
        )
    ]

    gender: Annotated[
        Literal["male", "female", "others"],
        Field(
            ...,
            description="Gender of the patient"
        )
    ]

    height: Annotated[
        float,
        Field(
            ...,
            gt=0,
            description="Height of the Patient in meters"
        )
    ]

    weight: Annotated[
        float,
        Field(
            ...,
            gt=0,
            description="Weight of the patient in kgs"
        )
    ]

    @computed_field
    @property
    def bmi(self) -> float:
        return round(self.weight / (self.height ** 2), 2)

    @computed_field
    @property
    def verdict(self) -> str:
        if self.bmi < 18.5:
            return "Underweight"
        elif self.bmi <= 24.9:
            return "Healthy weight"
        elif self.bmi <= 29.9:
            return "Overweight"
        else:
            return "Obese"


class PaginatedPatients(BaseModel):
    items: List[Patient]
    total: int
    page: int
    page_size: int
    total_pages: int


class PatientUpdate(BaseModel):
    name: Annotated[Optional[str], Field(default=None)]
    city: Annotated[Optional[str], Field(default=None)]
    age: Annotated[Optional[int], Field(default=None, ge=0, le=120)]
    gender: Annotated[Optional[Literal["male", "female", "others"]], Field(default=None)]
    height: Annotated[Optional[float], Field(default=None, gt=0)]
    weight: Annotated[Optional[float], Field(default=None, gt=0)]


class MessageResponse(BaseModel):
    message: str


class AskRequest(BaseModel):
    question: str = Field(
        ...,
        min_length=1,
        max_length=300,
        description="Ask a Patient ID, Patient Name, or a general question"
    )


class AskResponse(BaseModel):
    # "patient"  -> single patient match (dict in `patient`)
    # "patients" -> multiple patients matched by name (list in `patients`)
    # "text"     -> normal AI answer (string in `answer`)
    # "error"    -> not found / rate limited / etc (string in `message`)
    type: str
    patient: Optional[Dict[str, Any]] = None
    patients: Optional[List[Dict[str, Any]]] = None
    label: Optional[str] = None  # short description of a filter/search result, e.g. "3 patients match: Obese"
    message: Optional[str] = None
    answer: Optional[str] = None