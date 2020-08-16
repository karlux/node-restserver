//==============================
//          Puerto
//==============================
process.env.PORT = process.env.PORT || 3000;

//==============================
//          Entorno
//==============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//==============================
//          BBDD
//==============================
let urlDB;

if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe'
}else{
    urlDB = 'mongodb+srv://karlux:pasajero2020@cluster0.zu0sc.mongodb.net/cafe';
}

process.env.URLDB = urlDB;