// employee parent class
class Employee {
//properties
    constructor (name, id, email){
    this.name = name;
    this.id = id;
    this.title = "Employw"
    this.email = email;
    }
//methods
getRole(){
    return this.constructor.name;
}

getName(){
    return this.name;
}
getId(){
    return this.id;
}
getEmail(){
    return this.email;
}
}

module.exports = Employee;