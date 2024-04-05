const descrizioni = document.querySelectorAll("#descrizione");
    const articoli = document.querySelectorAll("article");
    const descrizioniTagliate = [];
    const descrizioniOriginali = [];
    var newDescrizione;

    for (const paragrafo of descrizioni) {
      descrizioniOriginali.push(paragrafo.textContent);
    }

    for (const paragrafo of descrizioni) {
      const newDescrizione = paragrafo.textContent.slice(0, 80).concat("...");
      paragrafo.textContent = newDescrizione;
    }

    for (const paragrafo of descrizioni) {
      descrizioniTagliate.push(paragrafo.textContent);
    }

    // Aggiungi event listener agli articoli
    for (const article of articoli) {
      article.addEventListener("mouseenter", () => {
        const paragrafo = article.querySelector("#descrizione"); // Trova il id di quel paragrafo giusto
        indiceParagrafo = descrizioniTagliate.indexOf(paragrafo.textContent);
        paragrafo.textContent = descrizioniOriginali[indiceParagrafo];
      });

      article.addEventListener("mouseleave", () => {
        const paragrafo = article.querySelector("#descrizione");
        indiceParagrafo = descrizioniOriginali.indexOf(paragrafo.textContent);
        paragrafo.textContent = descrizioniTagliate[indiceParagrafo];
      });
    }