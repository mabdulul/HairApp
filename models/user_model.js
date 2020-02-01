const db = require("./conn");
const bcrypt = require("bcryptjs");

class User {
	constructor(firstname, lastname, email, password) {
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.password = password;
	}
	checkPassword(hashedPassword) {
		console.log("the unhased is being run");
		return bcrypt.compareSync(this.password, hashedPassword);
	}

	async login() {
		try {
			const response = await db.one(
				`select personid, firstname, lastname, password from users where  email = $1;`,
				[this.email]
			);
			console.log(response);
			const isValid = this.checkPassword(response.password);

			if (!!isValid) {
				const { personid, firstname, lastname } = response;
				return { isValid, personid, firstname, lastname };
			} else {
				return { isValid };
			}
		} catch (err) {
			return err.message;
		}
	}
	async signUp() {
		try {
			const response = await db.one(
				`INSERT INTO USERS (firstname, lastname, email, password) VALUES ($1 , $2, $3, $4) RETURNING PersonID;`,

				[this.firstname, this.lastname, this.email, this.password]
			);
			return response;
		} catch (err) {
			return err.message;
		}
	}
	async aftersignUp() {
		try {
			const response = await db.one(
				`select personid from users where  email = $1;`,
				[this.email]
			);
			return response;
		} catch (err) {
			err.message;
		}
	}
}

module.exports = User;
