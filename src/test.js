function addStatic(target) {
  target.add = (prev, next) => prev + next;
}

@addStatic
class Test {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

