const express = require("express");
const persistence = require("../models/persistence");
const Kurs = require("../models/kurs");
const Lehrperson = require("../models/lehrperson");
const Termin = require("../models/termin");

// [TODO]
// Weitere benoetigte Module einbinden

const router = express.Router();

let studiengang;

router.get("/index", (req, res) => {
  const gruppierung = req.query.gruppierung;
  const selectedGruppierung = gruppierung || "semester";
  let gruppierteGruppe;
  if(selectedGruppierung=== "semester"){
    gruppierteGruppe = persistence.holePlaeneGruppiertNachSemester();
  } else if(selectedGruppierung === "studiengang"){
    gruppierteGruppe = persistence.holePlaeneGruppiertNachStudiengang();
  } else {
    res.status(400).send('Invalid gruppierung value');
    return;
  }
  res.render("index", { gruppierteGruppe });
});

router.get("/plan", (req, res, next) => {
  // [TODO]
  // Implementieren: Detailseite zum Semesterplan mit der gegebenen
  // ID anzeigen (ID als Anfrage/Query-Parameter gegeben)
  const semesterplanId = req.query.id;
  let semesterplan;
  for(elements of persistence.semseterplaene){
    if(elements.studiengangId === semesterplanId){
      semesterplan = elements;
    }
  }
  /* if(semesterplan===undefined){
      res.redirect("/error");
  } */
  let studiengangIduebergabe = semesterplan.studiengang.id;
  res.render("plan" ,{semesterplan, studiengangIduebergabe}); 

});

router.get("/kurs", (req, res, next) => {
  // [TODO]
  // Implementieren: Detailseite zum Kurs mit der gegebenen
  // ID anzeigen (ID als Anfrage/Query-Parameter gegeben)
  const studiengangId = req.query.sid;
  const kursId = req.query.kid;
  console.log(studiengangId);
  console.log(kursId);
  let kurs;
  let LEHRANGEBOT = persistence.lehrangebot;
  for(let elements of LEHRANGEBOT){
    if(elements.id === studiengangId){
      for(let element of elements.kurse){
        if(element.id === kursId){
          kurs = element;
          break;
        }
      }
      if(kurs) {
        break;
      }
    }
  }
  if(!kurs){
    res.redirect("/error");
  } 
  res.render("kurs", {kurs});
});

router.get("/neu", (req, res) => {
  // [TODO]
  // Schritt 1 des Formulares zum Erstellen eines neuen
  // Semesterplanes anzeigen
  persistence.initialisiereLehrangebot();
  let lehrangebotkopie = persistence.lehrangebot;
  res.render("plan-neu-schritt1", {lehrangebotkopie})
});

router.post("/waehleStudiengang", (req, res) => {
  // [TODO]
  // Formular zum Erstellen eines neuen Semesterplanes:
  // Den in Schritt 1 gewaehlten Studiengang ermitteln
  // (ID als Anfrage/Query-Parameter gegeben) und passend
  // dazu Schritt 2 anzeigen (z.B. nur die Kurse, die auch
  // zum gewaehlten Studiengang gehoeren)

  let studiengangId = req.body.studiengang;
  studiengang =studiengangId;
  let studiengang2 = persistence.lehrangebot.find((element) => element.id === studiengangId);
  res.render("plan-neu-schritt2", {studiengang2});
});

router.post("/neu", (req, res) => {
  // [TODO]
  // Schritt 2 wurde durchgefuehrt: Neuen Semesterplan aus
  // den eingebenen Daten erstellt und ueber das Persistenz-
  // Modul sichern. Danach auf die Seite "Liste der Semesterplaene"
  // umleiten.

  const{name, semester, jahr,kurseIds} = req.body;
  for(let elements of persistence.lehrangebot){
    if(elements.id === studiengang){
      studiengang = elements;
    }
  }
  let kurse2 = []
  //console.log(studiengang);
  let ausgewaehlterStudiengang = persistence.lehrangebot.find((element) => element.id === studiengang.id);
  //console.log(ausgewaehlterStudiengang.kurse);
  for(let elements of ausgewaehlterStudiengang.kurse){
    if(kurseIds.includes(elements.id)){
      kurse2.push(elements);
    }
  }  
  const newSemesterplan = persistence.erstelleSemesterplan(name,semester,jahr,studiengang,studiengang.id,kurse2)
  res.redirect("/index");

  studiengang = undefined;
});

router.get("/", (req, res) => {
  res.redirect("/index");
});

/* router.use((req, res) => {
  res.status(404).render('error.ejs', { message: 'Page not found' });
});
router.use("/error",(req, res) => {
  res.status(404).render('error.ejs', { message: 'Page not found' });
}); */

module.exports = router;
