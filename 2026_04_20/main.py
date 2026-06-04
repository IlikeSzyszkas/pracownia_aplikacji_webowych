import datetime
import json
import os
from typing import List

from models.Teacher import Teacher
from models.Subject import Subject
from models.Student import Student
from models.Grades import Grades
from year_grade import year_grade

FILE = os.path.dirname(os.path.abspath(__file__))

teachers: List[Teacher] = []
with open(os.path.join(FILE, "teachers.txt"), encoding="utf-8") as f:
    for line in f:
        line = line.strip()
        if not line:
            continue
        parts = line.split()
        teacher_id, name, surname = int(parts[0]), parts[1], parts[2]
        teachers.append(Teacher(teacher_id, name, surname))

subjects: List[Subject] = []
with open(os.path.join(FILE, "subjects.txt"), encoding="utf-8") as f:
    for line in f:
        line = line.strip()
        if not line:
            continue
        parts = line.split()
        subject_id, subject_name, teacher_id = int(parts[0]), parts[1], int(parts[2])
        matched_teacher = next((t for t in teachers if t._id == teacher_id), None)
        if matched_teacher is None:
            continue
        subjects.append(Subject(subject_id, subject_name, matched_teacher))

students: List[Student] = []
with open(os.path.join(FILE, "students.txt"), encoding="utf-8") as f:
    for line in f:
        line = line.strip()
        if not line:
            continue
        parts = line.split()
        student_id, first_name, last_name, birthdate_str = int(parts[0]), parts[1], parts[2], parts[3]
        birth_date = datetime.datetime.strptime(birthdate_str, '%Y-%m-%d').date()
        students.append(Student(student_id, first_name, last_name, birth_date))

grades: List[Grades] = []
with open(os.path.join(FILE, "grades.txt"), encoding="utf-8") as f:
    for line in f:
        line = line.strip()
        if not line:
            continue
        parts = line.split()
        student_id, subject_id = int(parts[0]), int(parts[1])
        grade_values = [int(g) for g in parts[2].split(",")]

        matched_student = next((s for s in students if s._id == student_id), None)
        matched_subject = next((s for s in subjects if s._id == subject_id), None)
        if matched_student is None or matched_subject is None:
            continue

        g = Grades(matched_student, matched_subject)
        for gv in grade_values:
            g.add_grade(gv)
        grades.append(g)

print("Oceny i średnie poszczególnych uczniów")

students_json = []
for student in students:
    print(f"{student}:")
    student_data = {}
    student_grades = [g for g in grades if g.student._id == student._id]
    for sg in student_grades:
        avg = round(sg.get_average(), 2)
        yg = year_grade(avg)
        grades_str = ", ".join(str(g) for g in sg.get_grades())
        print(f"  {sg.subject.name}:")
        print(f"    Oceny: {grades_str}")
        print(f"    Średnia: {avg}")
        print(f"    Ocena końcowa: {yg}")
        student_data[sg.subject.name] = {
            "Oceny": grades_str,
            "Srednia": avg,
            "Ocena roczna": yg
        }
    students_json.append({str(student): student_data})
    print()

with open(os.path.join(FILE, "students.json"), "w", encoding="utf-8") as f:
    json.dump(students_json, f, indent=4, ensure_ascii=False)

print("=" * 50)
print()

subjects_json = []
for subject in subjects:
    subject_grades_all = [g for g in grades if g.subject._id == subject._id]
    all_grade_values: List[int] = []
    for sg in subject_grades_all:
        all_grade_values.extend(sg.get_grades())

    all_grades_str = ", ".join(str(g) for g in all_grade_values)
    avg = round(sum(all_grade_values) / len(all_grade_values), 2) if all_grade_values else 0.0

    print(f"{subject.name}:")
    print(f"  Nauczyciel: {subject.teacher}")
    print(f"  Oceny: {all_grades_str}")
    print(f"  Średnia: {avg}")
    print()

    subjects_json.append({
        subject.name: {
            "Nauczyciel": str(subject.teacher),
            "Oceny": all_grade_values,
            "Srednia": avg
        }
    })

with open(os.path.join(FILE, "subjects.json"), "w", encoding="utf-8") as f:
    json.dump(subjects_json, f, indent=4, ensure_ascii=False)
