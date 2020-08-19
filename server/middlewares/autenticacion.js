const jwt = require("jsonwebtoken");
///////////////////////////////////
//          Verificar Token
///////////////////////////////////
let verificaToken = (req, res, next) => {
	// Recupera los datos enviados desde el header de la request
	let token = req.get("token");

	//decoded es el payload o data del objeto dentro del token
	jwt.verify(token, process.env.SEED, (err, decoded) => {
		if (err) {
			return res.status(401).json({
				ok: false,
				error: {
					message: "Token no válido"
				}
			});
		}
		req.usuario = decoded.usuario;
		next(); // el middleware verificaToken avisa que se continúe (validación correcta)
	});
};

///////////////////////////////////
//          Verificar ADMIN_ROLE
///////////////////////////////////
let verificaAdminRole = (req, res, next) => {
	let usuario = req.usuario;
	if (usuario.role === "ADMIN_ROLE") {
		next();
	} else {
		return res.json({
			error: {
				ok: false,
				message: "El usuario no es administrador"
			}
		});
	}
};

module.exports = {
	verificaToken,
	verificaAdminRole
};
