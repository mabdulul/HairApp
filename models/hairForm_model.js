const db = require("./conn");

class HairForm {
	constructor(
		user_id,
		hairtype,
		hair_structure,
		length_hair,
		virgin_hair,
		boxdye_salon,
		haircolor,
		hairroutine,
		datecolor
	) {
		this.user_id = user_id;
		this.hairtype = hairtype;
		this.length_hair = length_hair;
		this.boxdye_salon = boxdye_salon;
		this.hair_structure = hair_structure;
		this.virgin_hair = virgin_hair;
		this.haircolor = haircolor;
		this.hairroutine = hairroutine;
		this.datecolor = datecolor;
	}
	static async PullingHairQuizData(user_id) {
		try {
			const response = await db.one(
				`SELECT
				hairtype,
				length_hair,
				boxdye_salon,
				hair_structure,
				virgin_hair,
				haircolor,
				hairroutine,
				datecolor
				
			from
				hairquiz
			where
				user_id = ${user_id};`
			);
			return response;
		} catch (error) {
			return error.message;
		}
	}
	async InsertHairType() {
		try {
			const response = await db.one(
				`INSERT INTO hairquiz(hairtype , user_id)
                  VALUES
                  ('${this.hairtype}', ${this.user_id} );`
			);
			return response;
		} catch (error) {
			return error.message;
		}
	}
	async InsertHairStructure() {
		try {
			const response = await db.one(
				`UPDATE hairquiz
                SET hair_structure = '${this.hair_structure}'
                WHERE user_id=${this.user_id};`
			);
			return response;
		} catch (error) {
			return error.message;
		}
	}
	async InsertHairLength() {
		try {
			const response = await db.one(
				`UPDATE hairquiz
                SET length_hair = '${this.length_hair}'
                WHERE user_id=${this.user_id};`
			);
			return response;
		} catch (error) {
			return error.message;
		}
	}
	async Insertvirgin_hair() {
		try {
			const response = await db.one(
				`UPDATE hairquiz
				SET virgin_hair= '${this.virgin_hair}'
				WHERE user_id=${this.user_id};`
			);
			return response;
		} catch (error) {
			return error.message;
		}
	}
	async InsertHairdye() {
		try {
			const response = await db.one(
				`UPDATE hairquiz
				 SET 
				 virgin_hair= '${this.virgin_hair}',
				 boxdye_salon = '${this.boxdye_salon}',
				 haircolor = array ['${this.haircolor}'],
				 datecolor = '${this.datecolor}'
	            WHERE  user_id=${this.user_id};`
			);
			console.log(response);
			return response;
		} catch (error) {
			return error.message;
		}
	}
	async Inserthairroutine() {
		try {
			const response = await db.one(
				`UPDATE hairquiz
				 SET 
				 hairroutine = '${this.hairroutine}'
	            WHERE user_id=${this.user_id};`
			);
			return response;
		} catch (error) {
			return error.message;
		}
	}
}

module.exports = HairForm;
