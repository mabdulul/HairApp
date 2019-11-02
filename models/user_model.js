const db = require("./conn");
const bcryptjs = require('bcryptjs');

class User{
   
    constructor(firstname, lastname, email, password){

      this.firstname = firstname;
      this.lastname = lastname;
      this.email = email;
      this.password = password;
      

    }

    async login(){

        try{
            const response = await db.on(
                `select id firstname, lastname, password from users where = $1;`,[this.email]
            )
            console.log(response);
        }
        catch(err){
            return err.message; 
        }
    
    }
    async signUp(){
        try{
            const response = await db.one(
                `INSERT INTO USERS (firstname, lastname, email, password) VALUES ($1 , $2, $3, $4) RETURNING PersonID;`,

                [
                    this.firstname,
                    this.lastname,
                    this.email,
                    this.password
                ]
            )
            console.log(response);
        }
        catch(err){
            return err.message
        }
    }
}

module.exports = User; 