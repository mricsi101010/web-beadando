// === Alaposztály ===
class Person {
  constructor(name, age) {
      this.name = name;
      this.age = age;
  }

  describe() {
      return `${this.name}, ${this.age} éves`;
  }

  render() {
      const li = document.createElement("li");
      li.textContent = this.describe();
      document.getElementById("peopleList").appendChild(li);
  }
}

// === Leszármazott ===
class Student extends Person {
  constructor(name, age, subject) {
      super(name, age); // meghívja a Person constructorát
      this.subject = subject;
  }

  describe() {
      return `${this.name}, ${this.age} éves, Tantárgy: ${this.subject}`;
  }
}

// === Véletlen név generátor ===
function getRandomName() {
  const names = ["Dorka", "Milán", "Krisztián", "Bence", "Lili", "Anna"];
  return names[Math.floor(Math.random() * names.length)];
}

function getRandomSubject() {
  const subjects = ["Matematika", "Programozás", "Történelem", "Biológia"];
  return subjects[Math.floor(Math.random() * subjects.length)];
}

// === Személy létrehozása ===
function createPerson() {
  const isStudent = Math.random() < 0.5;
  const name = getRandomName();
  const age = Math.floor(Math.random() * 40 + 18); // 18-58 év

  if (isStudent) {  
      const subject = getRandomSubject();
      const student = new Student(name, age, subject);
      student.render();
  } else {
      const person = new Person(name, age);
      person.render();
  }
}
