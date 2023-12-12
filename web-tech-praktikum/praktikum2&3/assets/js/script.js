const getViewportWidth = () => window.innerWidth || document.documentElement.clientWidth;

 console.log(`Die Viewport-Breite beträgt: ${getViewportWidth()} Pixel.`);

class Lehrperson {
    constructor(id,nachname){
        this.id=id,
        this.nachname=nachname
    }
}
class Termin{
    constructor(beginn,dauer,wochentag,raum){
        this.beginn=beginn,
        this.dauer=dauer,
        this.wochentag=wochentag,
        this.raum=raum
    }
}

class Kurs {
    constructor(modulid, name,typ,studiengang,semester, lehrperson,termin){
        if(this.istValiderTyp(typ)){
        this.modulid=modulid,
        this.name=name,
        this.typ=typ,
        this.studiengang=studiengang,
        this.semester=semester,
        this.lehrperson=lehrperson,
        this.termin=termin,
        this.id = `${this.modulid}-${termin.wochentag}-${termin.beginn}-${termin.raum}`;
        }else {
            let fehlerMeldung ="Der Typ ist falsch";
            throw new Error(fehlerMeldung);
        }
    }
    istValiderTyp(typ) {
        return ["S", "V", "Ü", "P", "ÜPP", "SV", "T"].includes(typ);
    }
};

class Studiengang {
    constructor(id,name){
        this.id=id,
        this.name=name,
        this.kurse = []
    }
    addKurs(kurs){
        this.kurse.push(kurs);
    }
    getKursById(id){
        for(let element of this.kurse){
            if(element.id===id){
                return element;
            }
        }
        return "Kurs nicht gefunden, du bist ein Versager"
    }
};

class Semesterplan {
    constructor(id,name,semester,studiengang) {
        this.id=id,
        this.name=name,
        this.semester=semester,
        this.studiengang=studiengang ,
        this.kurse =[];  
    }
    addKurse(kurse){
        this.kurse = kurse;
    }
    getAnzahlKurse(){
        if(this.kurse.length!=0){
            return this.kurse.length;
        }
        return "Es wurden noch keine Kurse hinzugefügt"
    }
    getAnzahlStunden(){
        let ergebnis=0;
        for(let element of this.kurse){
            ergebnis+= element.termin.dauer;
        }
        return `Alle Stunden zusammengezählt: ${ergebnis}`;

    }
} 

let jojo= new Lehrperson(10,"joergens");
let tete= new Termin(900,120,"montag","AE.01");

let studiengang1 = new Studiengang("WIPB","Wirtschaftsinformatik");
let studiengang2 = new Studiengang("PI","Praktische Informatik")



let Kurs1 = new Kurs(1,"webtech","V",studiengang1, 3,jojo,tete);
let kurs2 = new Kurs(2,"mathe","V",studiengang2,3, jojo,tete);
let kurs3 = new Kurs(3,"physik","V",studiengang2,3,jojo,tete);

studiengang1.addKurs(Kurs1);

let Semesterplan1= new Semesterplan(30,"meiner",3,"praktisch");
Semesterplan1.addKurse([Kurs1,kurs2,kurs3]);

console.log(Semesterplan1.getAnzahlStunden());
console.log(Kurs1.id);
console.log(studiengang1.getKursById("1-montag-900-AE.01"));