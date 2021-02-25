// targeting employee file
const Employee  = require ('./employee')

// class engineer gets properties and methods from employee file
class Engineer extends Employee {
    constructor (id, name, email, github) {
    //same properties
        super(name, id, email)
    //new github properties
        this.github = github
    }
//new method and a new return
    getGithub() {
        return this.github;
    }
    getRole(){
        return 'Engineer';
    }
}

module.exports = Engineer
