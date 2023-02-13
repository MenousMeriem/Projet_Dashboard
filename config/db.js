
var mysql = require('mysql2');
const crypto = require('node:crypto')

var con = mysql.createConnection({
  host: "localhost",
  user: "meriem",
  password: "meriem123",
  database :"Patient"  
}).promise();

// Gestion des patients 
exports.ajouterPatient = async (nom,prenom,sexe,age,DateNais, cb)=> {
    const sql = `INSERT INTO TablePatient (Code, Nom, Prenom,Sexe, Age, DateNais) VALUES ('${crypto.randomUUID()}', '${nom}','${prenom}','${sexe}','${age}','${DateNais}')`;  
    await con.execute(sql)
} 

exports.afficherPatient = async () => {
  const sql = `SELECT * FROM TablePatient`;
  const resultl= await con.execute(sql)
  return  resultl
}

exports.modifierPatient = async (Nom, Prenom, Sexe, Age,DateNais) => {
  const sql = `UPDATE TablePatient SET Nom = ?, Prenom = ?, Sexe = ? , Age = ?,DateNais = ? ,WHERE (Code = Code)`;
  await con.execute(sql,[Nom, Prenom, Sexe, Age,DateNais])
}


exports.supprimerPatient = async (Code) => {
  const sql = "DELETE FROM TablePatient WHERE Code = ?";
  await con.execute(sql ,[Code])
}





// Gestion des rendez vous 

  exports.afficherRDV = async () => {
      const sql = `select tablerdv.*,Nom,Prenom from tablerdv left join tablepatient on tablerdv.id_patient=tablepatient.Code`;  
      const result = await con.execute(sql)
      return result 
 } 

  exports.ajouterRDV =  (daterdv,id_patient,heurerdv,descrdv)=> {
      const sql = `INSERT INTO TableRDV (CodeRDV,id_patient, DateRDV, HeureRDV ,DescRDV) VALUES ('${crypto.randomUUID()}','${id_patient}', '${daterdv}','${heurerdv}','${descrdv}')`;  
      const result =  con.execute(sql)
      return result
  } 
  
  exports.getPatientForRdv = () => {
      const query = "select Code,Nom,Prenom from tablepatient"
      const result = con.execute(query)
      return result
  }

  // exports.modifierRDV = async (CodeRDV) => {
  //     const sql = `UPDATE TableRDV SET DateRDV = ?, HeureRDV = ?, DescRDV = ?, WHERE ( Code = "${CodeRDV} )`;
  //     await con.execute(sql)
  //   }


    exports.supprimerRDV = async (CodeRDV) => {
      const sql = "DELETE FROM TableRDV WHERE CodeRDV = ?";
      await con.execute(sql, [CodeRDV])
    }

    exports.countpations = async () => {
      const sql = "select count(*) from TablePatient";
      const [s,_] = await con.execute(sql)
      return s; 
    }
    exports.countrdv = async () => {
      const sql = "select count(*) from TableRDV";
      const [s,_] = await con.execute(sql)
      return s; 
    }
   