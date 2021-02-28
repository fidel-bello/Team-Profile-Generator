// targeting Employee page
const Employee = require('./employee')

// intern class extends employee properties
class Intern extends Employee {
    constructor (name, id, email, school){
        super(name, id, email)
    // new properties
        this.school = school;
    }
    // new methods
    getSchool(){
        return this.school;
    }
}

module.exports = Intern;
