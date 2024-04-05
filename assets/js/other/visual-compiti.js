const descrizioni = document.querySelectorAll("#descrizione");
const articoli = document.querySelectorAll("article");
const descrizioniTagliate = [];
const descrizioniOriginali = [];

for (const paragrafo of descrizioni) {
  const currentText = paragrafo.textContent;
  descrizioniOriginali.push(currentText);
  
  if(currentText.length > 80){
    const slicedText = currentText.slice(0, 80).concat("...");
    paragrafo.textContent = slicedText;
    descrizioniTagliate.push(slicedText);
    continue;
  } else {
    descrizioniTagliate.push(currentText);
  }
}

for (const articolo of articoli) {
  articolo.addEventListener("click", () => {
    const paragrafo = articolo.querySelector("#descrizione"); // Trova il id di quel paragrafo giusto

    if (
      paragrafo.textContent ===
      descrizioniTagliate[descrizioniTagliate.indexOf(paragrafo.textContent)]
    ) {
      indiceParagrafo = descrizioniTagliate.indexOf(paragrafo.textContent);
      paragrafo.textContent = descrizioniOriginali[indiceParagrafo];
      articolo.setAttribute("tagliato");
    } else {
      const indiceParagrafo = descrizioniOriginali.indexOf(
        paragrafo.textContent
      );
      paragrafo.textContent = descrizioniTagliate[indiceParagrafo];
      articolo.removeAttribute("tagliato");
    }
  });
}
