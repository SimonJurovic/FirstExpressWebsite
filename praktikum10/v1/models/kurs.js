class Kurs {
    constructor(modulid, name, typ, studiengang, semester, lehrperson, termin, gruppenbuchstabe) {
      if (this.istValiderTyp(typ)) {
        (this.modulid = modulid),
          (this.name = name),
          (this.typ = typ),
          (this.studiengang = studiengang),
          (this.semester = semester),
          (this.lehrperson = lehrperson),
          (this.termin = termin),
          (this.gruppenbuchstabe= gruppenbuchstabe),
          (this.id = `${this.modulid}-${termin.wochentag}-${termin.beginn}-${termin.raum}`);
      } else {
        let fehlerMeldung = "Der Typ ist falsch";
        throw new Error(fehlerMeldung);
      }
    }
    istValiderTyp(typ) {
      return ["S", "V", "Ü", "P", "ÜPP", "SV", "T", "ORG"].includes(typ);
    }
}
module.exports = {
    Kurs: Kurs
}