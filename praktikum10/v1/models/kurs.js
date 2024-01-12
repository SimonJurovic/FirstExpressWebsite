

class Kurs {
    constructor(modulId, name, typ, studiengang, semester, gruppenbuchstabe, lehrperson, termin) {
      if (this.istValiderTyp(typ)) {
          (this.modulId = modulId),
          (this.name = name),
          (this.typ = typ),
          (this.studiengang = studiengang),
          (this.semester = semester),
          (this.lehrperson = lehrperson),
          (this.termin = termin),
          (this.gruppenbuchstabe= gruppenbuchstabe),
          (this.id = `${this.modulId}-${termin.wochentag}-${termin.beginn}-${termin.raum}`);
      } else {

        let fehlerMeldung = "Der Typ ist falsch";
        throw new Error(fehlerMeldung + "der Typ war" +typ);
      }
    }
    istValiderTyp(typ) {
      return ["S", "V", "Ü", "P", "ÜPP", "SV", "T", "Org"].includes(typ);
    }
    toString() {
      return `${this.modulId, this.name}(${this.semester}. Semesterhälfte) [${this.studiengang}] (${this.typ}, ${this.lehrperson.nachname})`;
    }
}

module.exports = Kurs;