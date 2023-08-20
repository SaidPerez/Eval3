const fs= require('fs');

const guardarBD = (data) => {
    const archivo = "./db/data.json";
    fs.writeFileSync(archivo, JSON.stringify(data));
}

const leerDB = () => {
    //verificamos si existe el archivo
    if(!fs.existsSync(archivo)){
        return null;
    }
    const info = fs.readFileSync(archivo, {enconding:'utf-8'});
    const data = JSON.parse(info);
    console.log(data);
    return data;
}

module.exports={
    guardarBD,
    leerDB
}