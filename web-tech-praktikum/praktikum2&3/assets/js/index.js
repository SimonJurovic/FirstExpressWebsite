let array = [Semesterplan1, Semesterplan2, Semesterplan3];

let ddbtn = document.getElementById("DropdownPlaene");

const gruppiereNach = (array, eigenschaft) =>
  array.reduce((ergebnis, element) => {
    if (!ergebnis[element[eigenschaft]]) {
      ergebnis[element[eigenschaft]] = [];
    }
    ergebnis[element[eigenschaft]].push(element);
    return ergebnis;
  }, {});

let sortierungAusgeben = function (variable) {
  let gruppierteGruppe = gruppiereNach(array, variable);

  for (let gruppe in gruppierteGruppe) {
    let h2 = document.createElement("h2");
    h2.textContent = gruppe;
    document.getElementById("dynamicSection").append(h2);
    var ul = document.createElement("ul");
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

sortierungAusgeben("semester");

ddbtn.addEventListener("change", function () {
  if (ddbtn.value === "semester") {
    document.getElementById("dynamicSection").innerHTML = "";
    sortierungAusgeben("semester");
  } else {
    document.getElementById("dynamicSection").innerHTML = "";
    sortierungAusgeben("studiengang");
  }
});
