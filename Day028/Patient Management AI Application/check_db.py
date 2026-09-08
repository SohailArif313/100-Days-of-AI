from database import SessionLocal, PatientDB


db = SessionLocal()

try:
    patients = db.query(PatientDB).all()

    print("Total patients:", len(patients))

    for patient in patients:
        print(
            patient.id,
            patient.name,
            patient.age,
            patient.city
        )

finally:
    db.close()