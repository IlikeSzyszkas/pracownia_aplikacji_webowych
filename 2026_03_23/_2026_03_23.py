class Course:
    def __init__(self, name: str):
        self.name = name

    def __str__(self) -> str:
        return self.name


class Student:
    def __init__(self, id: int, firstName: str, lastName: str, age: int):
        self.id = id
        self.firstName = firstName
        self.lastName = lastName
        self.age = age
        self.courses: list[Course] = []

    def addCourse(self, course: Course):
        self.courses.append(course)

    def __str__(self) -> str:
        kursy = ", ".join(str(c) for c in self.courses)
        return f"{self.firstName} {self.lastName} ({self.age} lat): {kursy}"

    def saveFile(self):
        filename = f"{self.firstName.lower()}_{self.lastName.lower()}.txt"
        with open("studenci/"+filename, "w", encoding="utf-8") as f:
            f.write("Kursy:\n")
            for i, course in enumerate(self.courses):
                przecinek = "," if i < len(self.courses) - 1 else ""
                f.write(f"- {course.name}{przecinek}\n")


students: dict[int, Student] = {}

with open("students.txt", "r", encoding="utf-8") as f:
    for line in f:
        id, firstName, lastName, age = line.strip().split(",")
        students[int(id)] = Student(int(id), firstName, lastName, int(age))

with open("courses.txt", "r", encoding="utf-8") as f:
    for line in f:
        studentId, courseName = line.strip().split(",")
        course = Course(courseName)
        students[int(studentId)].addCourse(course)

for student in students.values():
    print(student)
    student.saveFile()