// targeting employee file
const Employee = require('./employee')

// manger class
class Manager extends Employee {
//properties
    constructor (name, id, email, officeNumber) {
    // same properties with Employee
        super(name, id, email);
    // new manager properties
        this.officeNumber = officeNumber;
        

    }
// methods
    getRole(){
        return 'Manager';
    }
    getOfficeNumber(){
        return this.officeNumber;
    }
}

module.exports = Manager