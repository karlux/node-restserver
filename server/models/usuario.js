const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let rolesValidos = {
	values: ["ADMIN_ROLE", "USER_ROLE"],
	message: "{VALUE} no es un rol válido"
};

let usuarioSchema = new Schema({
	nombre: {
		type: String,
		required: [true, "El nombre es requerido"]
	},
	email: {
		unique: true,
		type: String,
		required: [true, "El email es requerido"]
	},
	password: {
		type: String,
		required: [true, "El password es requerido"]
	},
	img: {
		type: String,
		required: false
	},
	role: {
		type: String,
		default: "USER_ROLE",
		enum: rolesValidos
	},
	estado: {
		type: Boolean,
		default: true
	},
	google: {
		type: Boolean,
		default: false
	}
});

// Sirve para no devolver el campo password en la respuesta JSON
usuarioSchema.methods.toJSON = function () {
	user = this; // El usuario actual
	userObject = user.toObject(); // lo transformo a objeto para usar sus métodos
	delete userObject.password; // le borro la propiedad password
	return userObject;
};

usuarioSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único" });

module.exports = mongoose.model("Usuario", usuarioSchema);
