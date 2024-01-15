class Semesterplan {
    constructor(name, semester, jahr, studiengang, studiengangId, kurse) {
        (this.name = name),
        (this.semester = semester),
        (this.jahr = jahr),
        (this.studiengang = studiengang),
        (this.studiengangId = studiengangId),
        (this.kurse = kurse);
        (this.studiengangname = studiengang.name)
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

module.exports = Semesterplan;