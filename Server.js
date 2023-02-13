

const express = require("express") 
const server = express()
server.use(express.json())

const {ajouterPatient, afficherPatient, ajouterRDV, getPatientForRdv, afficherRDV, supprimerPatient, supprimerRDV, countrdv,countpations} = require('./config/db')

// server.set("views","Nom du dossier")

server.use(express.urlencoded({extended: false}))
server.use(express.static('public'))
server.set("view engine","ejs")



server.get("/", async (req,res)=> {
    res.status(200).render('')
})

server.get("/graphdata",async (req,res) => {
    const patientCount= await countpations()
    const rdvCount= await countrdv()
    res.status(200).json([patientCount, rdvCount])  
})
// Formulaire patient
server.get("/Formulaire", (req,res)=> {
  res.status(200).render('Formulaire')
//   res.status(201).redirect('/ListePatients')


})

// Afficher la liste des RDV :
server.get("/ListeRDV", async(req,res)=> {
    const [patients,_] = await afficherRDV()
    res.status(200).render('ListeRDV', {patients})
})

// Formulaire RDV :
server.get("/FormulaireRDV", async(req,res)=> {
    const [patients,_] = await getPatientForRdv()
    res.status(200).render('FormulaireRDV', {patients})
})


// Afficher les patients 
server.get("/ListePatients", async (req, res) => {
    const [patient,_] = await afficherPatient()
    res.status(200).render('ListePatients',{patient})
  });



// Ajouter Patient 
server.post("/Formulaire", (req,res)=> {
    const {Nom, Prenom, Sexe,Age,Date} = req.body
    ajouterPatient(Nom,Prenom,Sexe,Age,Date,(err,data) => {
        if(err) {
            res.status(500)
            res.end()
        }
        res.status(201).redirect('/ListePatients')
    })
})



server.get("ModifierP")
// // Modifier Patient
    server.post("/ModifierP", async (req, res) => {       
        const {Nom} = req.body
        modifierPatient(Nom,(err,data) => {            
            if(err) {
                res.status(500)
                res.end()
            }else {
                res.status(201).redirect('/ModifierP')
            }
        })
    })


// Supprimer Patient 
server.delete("/:Code", async (req, res) => {
    console.log(req.params.Code)
  await supprimerPatient(req.params.Code)
  res.status(202).end();
});


// Ajouter RDV
server.post("/FormulaireRDV",async (req,res)=> {
    console.log(req.body)
    const {Patient,DateRDV,DescRDV,HeureRDV} = req.body
    // console.log(Patient, DateRDV,DescRDV, HeureRDV)
    await ajouterRDV(DateRDV,Patient,HeureRDV,DescRDV)
    res.status(201).redirect('/ListeRDV')    
})


// // Modifier 
// server.post("/Modifier", async (req, res) => {
//     const {Nom} = req.body
//     modifierPatient(nom,(err,data) => {
//         if(err) {
//             res.status(500)
//             res.end()
//         }else {
//             req.flash('success', 'patient modifier;  Nom  = ' + req.params.nom)
//             res.status(201).redirect('/ListePatients')
//         }
        
//     })
// })




// // Supprimer RDV
server.delete("/ListeRDV/:CodeRDV", async (req, res) => {
   
    await supprimerRDV(req.params.CodeRDV)
    res.status(202).end()
    // res.status(201).redirect('/ListeRDV')
});

















server.use("/*",(req,res) => {
    res.status(404).send("Not found")
})

  server.listen(5000, () => {
    console.log("server running")
})


