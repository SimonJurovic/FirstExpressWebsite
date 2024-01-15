const fetcher = require("../models/scheduleFetcher");
const Kurs = require("../models/kurs");
const Lehrperson = require("../models/lehrperson");
const Semesterplan = require("../models/semesterplan");
const Studiengang = require("../models/studiengang");
const Termin = require("../models/termin");

const lehrangebot = [];
const semseterplaene = [];

/**
 * Initialisiert die Daten der Anwendung, also die verfuegbaren Studiengaenge mit den
 * zugehoerigen Kursen. Die Daten werden zunaechst asynchron über das scheduleFetcher-Modul
 * abgerufen (Nutzung der Promise-API mit "then"). Danach werden die erhaltenen Daten
 * mittels map-Funktion in die Datenstrukturen unserer Anwendung konvertiert. Schliesslich
 * wird jeder erhaltene Datensatz im lehrangebot-Array hinzugefuegt.
 */

const initialisiereLehrangebot = () => {
  fetcher.fetchScheduleData().then((daten) => {
    daten
      .map(
        (stdg) =>
          new Studiengang(
            stdg.sname,
            stdg.name,
            stdg.courses.map(
              (kurs) =>
                new Kurs(
                  kurs.courseId,
                  kurs.name,
                  kurs.courseType,
                  kurs.courseOfStudy,
                  kurs.termId,
                  kurs.studentSet,
                  new Lehrperson(kurs.lecturerId, kurs.lecturerSurname),
                  new Termin(
                    kurs.timeSlotBegin,
                    kurs.timeSlotDuration,
                    kurs.weekday,
                    kurs.roomId
                  )
                )
            )
          )
      )
      .forEach((datensatz) => lehrangebot.push(datensatz));
    console.log("Basisdaten initialisiert.");
  });
};

const erstelleSemesterplan = (name, semester, jahr,studiengang ,studiengangId, kurse) =>{
  let semesterplan = new Semesterplan(name, semester,jahr,studiengang, studiengangId,kurse);
  semseterplaene.push(semesterplan);
};

const ermittleSemesterplanZuId =(id) =>{
  for(let elements of semseterplaene){
    if(elements.studiengangId === id){
      return elements;
    }
  }
  return undefined;
};

const holePlaeneGruppiertNachSemester = () => {
  return gruppiereNach(semseterplaene, "semester");
};

const holePlaeneGruppiertNachStudiengang = () => {
  console.log((semseterplaene));
  return gruppiereNach(semseterplaene, "studiengangname");
};

const gruppiereNach = (array, eigenschaft) =>
  array.reduce((ergebnis, element) => {
    if (!ergebnis[element[eigenschaft]]) {
      ergebnis[element[eigenschaft]] = [];
    }
    ergebnis[element[eigenschaft]].push(element);
    return ergebnis;
  }, {});

// [TODO]
// Weitere Funktionen aus der Aufgabenstellung implementieren

let ermittleStudiengangZuId = function(id) {
  for(let elements of lehrangebot) {
    if(elements.id === id)
      return elements;
  }
}

let ermittleKursZuStudiengangUndId = function(studiengangId, kursId) {
  for(let elements of lehrangebot) {
    if(elements.id === studiengangId && elements.kurs.id ===kursId) {
      return elements;
    }
  }
}

let holeAlleStudiengaenge = function() {
  let studiengaenge =[];
  for(let elements of lehrangebot) {
    studiengaenge.push(elements);
  }
  return studiengaenge;
}
// [TODO]
// Schnittstelle des Moduls definieren: Lehrangebot-Array und Funktionen
// von aussen zugreifbar machen

module.exports = {
  lehrangebot:lehrangebot,
  semseterplaene: semseterplaene,
  ermittleStudiengangZuId:ermittleStudiengangZuId,
  ermittleKursZuStudiengangUndId:ermittleKursZuStudiengangUndId,
  holeAlleStudiengaenge:holeAlleStudiengaenge,
  initialisiereLehrangebot:initialisiereLehrangebot,
  holePlaeneGruppiertNachSemester:holePlaeneGruppiertNachSemester,
  holePlaeneGruppiertNachStudiengang:holePlaeneGruppiertNachStudiengang,
  erstelleSemesterplan: erstelleSemesterplan
}
