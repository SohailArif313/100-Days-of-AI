print("MIGRATION FILE STARTED")

import json

from database import SessionLocal, PatientDB


def migrate_data():
    # JSON file read karo
    with open("patients.json", "r") as f:
        data = json.load(f)

    # Database session open karo
    db = SessionLocal()

    try:
        for patient_id, patient_data in data.items():

            patient = PatientDB(
                id=patient_id,
                name=patient_data["name"],
                city=patient_data["city"],
                age=patient_data["age"],
                gender=patient_data["gender"],
                height=patient_data["height"],
                weight=patient_data["weight"]
            )

            db.add(patient)

        # Database mein changes save karo
        db.commit()

        print("Patients data migrated successfully!")

    except Exception as e:
        db.rollback()
        print("Migration failed:", e)

    finally:
        db.close()


if __name__ == "__main__":
    migrate_data()