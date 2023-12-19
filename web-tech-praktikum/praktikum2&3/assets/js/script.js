const getViewportWidth = () =>
  window.innerWidth || document.documentElement.clientWidth;

console.log(`Die Viewport-Breite beträgt: ${getViewportWidth()} Pixel.`);

let counter = 0;
class Lehrperson {
  constructor(id, nachname) {
    (this.id = id), (this.nachname = nachname);
  }
}
class Termin {
  constructor(beginn, dauer, wochentag, raum) {
    (this.beginn = beginn),
      (this.dauer = dauer),
      (this.wochentag = wochentag),
      (this.raum = raum);
  }
}

class Kurs {
  constructor(modulid, name, typ, studiengang, semester, lehrperson, termin) {
    if (this.istValiderTyp(typ)) {
      (this.modulid = modulid),
        (this.name = name),
        (this.typ = typ),
        (this.studiengang = studiengang),
        (this.semester = semester),
        (this.lehrperson = lehrperson),
        (this.termin = termin),
        (this.id = `${this.modulid}-${termin.wochentag}-${termin.beginn}-${termin.raum}`);
    } else {
      let fehlerMeldung = "Der Typ ist falsch";
      throw new Error(fehlerMeldung);
    }
  }
  istValiderTyp(typ) {
    return ["S", "V", "Ü", "P", "ÜPP", "SV", "T"].includes(typ);
  }
}

class Studiengang {
  constructor(id, name) {
    (this.id = id), (this.name = name), (this.kurse = []);
  }
  addKurs(kurs) {
    this.kurse.push(kurs);
    this.kurse.sort((a, b) => (a.modulid < b.modulid ? -1 : 1));
  }
  getKursById(id) {
    for (let element of this.kurse) {
      if (element.id === id) {
        return element;
      }
    }
    return "Kurs nicht gefunden, du bist ein Versager";
  }
  toString() {
    let ergebnis = `${this.name} (${this.id}):\n`;
    for (let element of this.kurse) {
      ergebnis += `\t ${element.modulid}: ${element.name}\n`;
    }
    return ergebnis;
  }
}

class Semesterplan {
  constructor(name, semester, studiengang) {
    (this.id = counter++),
      (this.name = name),
      (this.semester = semester),
      (this.studiengang = studiengang),
      (this.kurse = []);
  }
  addKurse(kurse) {
    this.kurse = this.kurse.concat(kurse);
    this.kurse.sort((a, b) => (a.modulid < b.modulid ? -1 : 1));
  }
  getAnzahlKurse() {
    if (this.kurse.length != 0) {
      return this.kurse.length;
    }
    return "Es wurden noch keine Kurse hinzugefügt";
  }
  getAnzahlStunden() {
    let ergebnis = 0;
    for (let element of this.kurse) {
      ergebnis += element.termin.dauer;
    }
    return ergebnis;
  }
  toString() {
    let ergebnis = `${this.name} (${this.semester}):\n`;
    for (let element of this.kurse) {
      ergebnis += `\t ${element.modulid}: ${element.name} \n`;
    }
    return ergebnis;
  }
}

let jojo = new Lehrperson(10, "joergens");
let tete = new Termin(900, 120, "montag", "AE.01");

let studiengang1 = new Studiengang("WIPB", "Wirtschaftsinformatik");
let studiengang2 = new Studiengang("PI", "Praktische Informatik");

let kurs1 = new Kurs(1, "webtech", "V", studiengang1, 3, jojo, tete);
let kurs2 = new Kurs(2, "mathe", "V", studiengang2, 3, jojo, tete);
let kurs3 = new Kurs(3, "physik", "V", studiengang2, 3, jojo, tete);

studiengang1.addKurs(kurs3);
studiengang1.addKurs(kurs2);
studiengang1.addKurs(kurs1);

let Semesterplan1 = new Semesterplan("Mein Plan", "WS23/24", "praktisch");
let Semesterplan2 = new Semesterplan("Mein Plan2", "SO 24", "theoretisch");
let Semesterplan3 = new Semesterplan("Mein Plan3", "WS24/25", "praktisch");
Semesterplan1.addKurse([kurs3, kurs1, kurs2]);
Semesterplan2.addKurse([kurs3, kurs1, kurs2]);
Semesterplan3.addKurse([kurs3, kurs1, kurs2]);

console.log(Semesterplan1.getAnzahlStunden());
console.log(Semesterplan1.toString());
console.log(studiengang1.toString());
//console.log(studiengang1.getKursById("1-montag-900-AE.01"));
