let fs = require("fs");

let addData = (destination,donnes) => {
  let chaine = "let db1 = [";
  for(i=0;i<donnes.length;i++){
    let bis = "";
    donnes[i].forEach(element => {
      let type = typeof element
      if (type=="string") {
        bis += `"${element}",`;
      } else if(type=="number"){
        bis += `${element},`;
      }
    });
    chaine += `\n   [${bis}],`;
  }
  chaine += "\n];\n\nmodule.exports = {\n   db1\n};";
  var stream = fs.createWriteStream(destination);
  stream.once('open', function() {
    stream.write(chaine);
    stream.end();
  });
}

let setDataRow = (fichier,destination,valeurs) => {
  let data = require(fichier);
  let donnes = data.db1;
  let values = "";
  valeurs.forEach(element => {
    let type = typeof element
    if (type=="string") {
      values += `"${element}",`;
    } else if(type=="number"){
      values += `${element},`;
    }
  });

  let chaine = "let db1 = [";
  for(i=0;i<donnes.length;i++){
    let bis = "";
    donnes[i].forEach(element => {
      let type = typeof element
      if (type=="string") {
        bis += `"${element}",`;
      } else if(type=="number"){
        bis += `${element},`;
      }
    });
    chaine += `\n   [${bis}],`
  }
  chaine += `\n   [${values}],`;
  chaine += "\n];\n\nmodule.exports = {\n   db1\n};";
  var stream = fs.createWriteStream(destination);
  stream.once('open', function() {
    stream.write(chaine);
    stream.end();
  });
}

let updateDataRow = (fichier,destination,nom,i1,valeur,i2) => {
  let data = require(fichier);
  let donnes = data.db1;
  for (i=0;i<donnes.length;i++) {
    if (donnes[i][i1]==nom) {
      donnes[i][i2] = valeur;
      break
    }
  }

  addData(destination,donnes);
}

let updateAllDataRow = (fichier,destination,nom,i1,valeur) => {
  let data = require(fichier);
  let donnes = data.db1;
  for (i=0;i<donnes.length;i++) {
    if (donnes[i][i1]==nom) {
      donnes[i] = valeur;
      break
    }
  }

  addData(destination,donnes);
}

let getDataRow = (fichier,id,i1,i2) => {
  let data = require(fichier);
  let donnes = data.db1;
  for (i=0;i<donnes.length;i++) {
    if (donnes[i][i1]==id) {
      return donnes[i][i2];
    }
  }
}

let getAllDataRow = (fichier,id,i1) => {
  let data = require(fichier);
  let donnes = data.db1;
  for (i=0;i<donnes.length;i++) {
    if (donnes[i][i1]==id) {
      return donnes[i]
    }
  }
}

let deleteDataRow = (fichier,destination,id,i1) => {
  let data = require(fichier);
  let donnes = data.db1;
  let tab = donnes.filter(ligne => ligne[i1] != id);

  addData(destination,tab);
}

module.exports = {
  setDataRow,
  updateDataRow,
  getDataRow,
  deleteDataRow,
  addData,
  getAllDataRow,
  updateAllDataRow,
}