var Employee = function(name, position, salary) {
  this.name = name;
  this.position = position;
  this.salary = salary;
}

Employee.prototype.salaryIncrease = function(value) {
  this.salary += value;
};

Employee.prototype.changePosition = function(newRole) {
  this.position = newRole;
}

var firstEmployee = new Employee('John Doe', 'Manager', 120000);
