class Practice {
  constructor(name) {
    this.name = name;
  }

  get fullname() {
    return `fullname-${this.name}`
  }

  getName() {
    return this.fullname;
  }
}

class Test extends Practice {
  constructor(props) {
    super(props)
    console.log(this);
  }
}

const a = new Test('a');
