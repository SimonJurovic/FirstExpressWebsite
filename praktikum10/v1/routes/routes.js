const express = require("express");
const persistence = require("../models/persistence");
const Kurs = require("../models/kurs");
const Lehrperson = require("../models/lehrperson");
const Termin = require("../models/termin");

// [TODO]
// Weitere benoetigte Module einbinden

const router = express.Router();

persistence.erstelleSemesterplan("name", "Semester 23/24", 2004, "studiengang", "ID1", [new Kurs("moduleId", "Kursname","V", "t", 3,"Gruppenbuchstabe", new Lehrperson("lecturerId", "test"), new Termin("9:00",90,"Montag", "t"))]);
persistence.erstelleSemesterplan("name2", "Semester 23/24", 2004, "studiengang", "ID2", [new Kurs("moduleId", "Kursname","V", "t", 3,"Gruppenbuchstabe", new Lehrperson("lecturerId", "test"), new Termin("9:00",90,"Dienstag", "t"))]);
persistence.erstelleSemesterplan("name3", "Semester 23/24", 2004, "studiengang", "ID3", [new Kurs("moduleId", "Kursname","V", "t", 3,"Gruppenbuchstabe", new Lehrperson("lecturerId", "test"), new Termin("9:00",90,"Mittwoch", "t"))]);

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
  if(semesterplan===undefined){
      res.redirect("/error");
  }

  res.render("plan" ,{semesterplan}); 

});

router.get("/kurs", (req, res, next) => {
  // [TODO]
  // Implementieren: Detailseite zum Kurs mit der gegebenen
  // ID anzeigen (ID als Anfrage/Query-Parameter gegeben)
  const studiengangId = req.query.sid;
  const kursId = req.query.kid;

  let kurs;
  for(let elements of persistence.lehrangebot){
    if(elements.id === studiengangId){
      for(let element of elements){
        if(element.id === kursId){
          kurs = element;
        }
      }
    }
  }
  if(kurs ===undefined){
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

  let studiengangId = req.query.studiengang;
  console.log(studiengangId);
  let studiengang = persistence.lehrangebot.find((element) => element.sname === studiengangId);
 
  res.render("plan-neu-schritt2", {studiengang});
});

router.post("/neu", (req, res) => {
  // [TODO]
  // Schritt 2 wurde durchgefuehrt: Neuen Semesterplan aus
  // den eingebenen Daten erstellt und ueber das Persistenz-
  // Modul sichern. Danach auf die Seite "Liste der Semesterplaene"
  // umleiten.
  console.log(req.body);
  const{name, semester, jahr,studiengangid,kurseIds} = req.body;
  let studiengang;
  for(let elements of persistence.lehrangebot){
    if(elements.id === studiengangid){
      studiengang = elements;
    }
  }
  let kurse2 = []
  /* for(let elements of persistence.lehrangebot.kurse){
    if(elements.id === kurseIds){
      kurse2.push(elements);
    }
  }  */
  console.log(persistence.lehrangebot.studiengang.kurse);
  const newSemesterplan = persistence.erstelleSemesterplan(name,semester,jahr,studiengang,studiengangid,kures2)
});

router.get("/", (req, res) => {
  res.redirect("/index");
});

router.use((req, res) => {
  res.status(404).render('error.ejs', { message: 'Page not found' });
});
router.use("/error",(req, res) => {
  res.status(404).render('error.ejs', { message: 'Page not found' });
});

module.exports = router;
