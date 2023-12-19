/* AUFBAU VORLAGE 
<section id = dynamicSection >
<h2>WS23/24</h2>
    <ul>
        <li><a href="plan.html">WI-Plan (4 Kurse, 7 Stunden)</a></li>
        <li><a href="plan.html">WI-Plan (5 Kurse, 10 Stunden)</a></li>
        <li><a href="plan.html">WI-Plan (10 Kurse, 8 Stunden)</a></li>
        <li><a href="plan.html">WI-Plan (5 Kurse, 20 Stunden)</a></li>
    </ul>
</section> */

let array = [Semesterplan1, Semesterplan2, Semesterplan3];

let ddbtn = document.getElementById("DropdownPlaene");
/* 
let h2 = document.createElement("h2");
h2.textContent = Semesterplan1.semester;

let ul = document.createElement("ul");
let li = document.createElement("li");
li.innerHTML = `<a href="plan.html"> ${
  Semesterplan1.name
} (${Semesterplan1.getAnzahlKurse()} Kurse, ${Semesterplan1.getAnzahlStunden()} Stunden) `;
ul.append(li);
document.getElementById("dynamicSection").append(ul);
console.log(array); */

const gruppiereNach = (array, eigenschaft) =>
  array.reduce((ergebnis, element) => {
    if (!ergebnis[element[eigenschaft]]) {
      ergebnis[element[eigenschaft]] = [];
    }
    ergebnis[element[eigenschaft]].push(element);
    return ergebnis;
  }, {});

/* let gruppierteGruppe = gruppiereNach(array, "semester");
console.log(gruppierteGruppe); */

ddbtn.addEventListener("change", function () {
  if (ddbtn.value === "semester") {
    nachSemesternSortieren();
  } else {
    console.log("studiengang");
  }
});

let nachSemesternSortieren = function () {
  let gruppierteGruppe = gruppiereNach(array, "semester");
  var ul = document.createElement("ul");
  for (let gruppe in gruppierteGruppe) {
    let h2 = document.createElement("h2");
    h2.textContent = gruppe;
    document.getElementById("dynamicSection").append(h2);
    for (let plaene of gruppierteGruppe[gruppe]) {
      let li = document.createElement("li");
      li.innerHTML = `<a href="plan.html"> ${
        plaene.name
      } (${plaene.getAnzahlKurse()} Kurse, ${plaene.getAnzahlStunden()} Stunden) `;
      ul.append(li);
      document.getElementById("dynamicSection").append(ul);
    }
  }
};
