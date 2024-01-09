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

module.exports = {
    Studiengang: Studiengang
}