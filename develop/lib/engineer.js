// targeting employee file
const Employee  = require ('./employee')

// class engineer gets properties and methods from employee file
class Engineer extends Employee {
    constructor (name, id, email, github) {
    //same properties
        super(name, id, email)
    //new github properties
        this.github = github
    }
//new method and a new return
    getGithub() {
        return this.github;
    }
}

module.exports = Engineer
