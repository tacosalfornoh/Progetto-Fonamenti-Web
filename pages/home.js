export default {
  name: "/",

  setup() {
    const title = "Home page";
    return { title };
  },

  template: `
    <section id="home">
      <section id="welcome">
        <div class="welcome-items">
          <h1>Javascript <hr>Signals</h1>
          <img
          alt="JavaScript Signals logo"
          src="https://miro.medium.com/v2/resize:fit:1400/0*7ifvY4u8nYnZtCp4"
          />
        </div>
        <i class="fe-arrow-down"></i>
      </section>
      <section id="introduzione">
      <h2>Introduzione</h2>
      <p>
      JavaScript Signals, una proposta avanzata da un gruppo di sviluppatori e membri del comitato TC39,
      è una prototipazione attualmente in fase di sperimentazione che punta ad integrare i “Signals” all’interno di JavaScript puro.
      L'obiettivo è fornire un'infrastruttura per la gestione dello stato dell'applicazione in modo che non debbano preoccuparsene gli sviluppatori.
      Nel contesto della programmazione reattiva i Signals svolgono un ruolo fondamentale,
      eliminando la necessità di gestire manualmente gli aggiornamenti dell'interfaccia utente in risposta ai cambiamenti dello stato.
      Questo approccio semplifica notevolmente la creazione di applicazioni dinamiche e reattive.
      <br><br>Ad oggi i Signals non fanno ancora parte del linguaggio JavaScript puro, ma sono già implementati in diverse librerie e framework,
      tra cui SolidJS, Svelte, Angular,... Il fatto che ogni implementazione di segnale abbia il proprio sistema di tracciamento automatico, però,
      rende difficile la condivisione di modelli e librerie tra framework diversi. Bisogna quindi separare completamente il modello reattivo dell’applicazione dalla vista di rendering,
      in modo da rendere più semplice l’adozione di nuovi framework, librerie o strumenti per la visualizzazione (rendering) dell’interfaccia utente senza dover
      modificare la logica sottostante che gestisce i dati (modello reattivo).
      </p>
      </section>
      <section id="cosa_sono">
        <h2>Cosa sono i Signals?</h2>
        <p>
        Un Signal è essenzialmente un contenitore di un valore che può cambiare nel tempo.
        La sua peculiarità risiede nella capacità di tracciare automaticamente le dipendenze e notificare i cambiamenti a tutti i "consumatori" che utilizzano quel valore.
        Questo significa che quando il valore di un Signal viene modificato, tutte le parti del codice che dipendono da esso vengono aggiornate automaticamente,
        senza bisogno di interventi manuali da parte dello sviluppatore.
        </p>
      </section>
      <section id="differenze">
        <h2>Differenze tra Signals e Variabili</h2>
        <p>
        La differenza fondamentale tra Signals e variabili tradizionali risiede nella loro reattività.
        Le variabili sono statiche: quando il loro valore cambia, spetta allo sviluppatore aggiornare manualmente tutte le parti del codice che ne dipendono.
        I Signals, invece, sono dinamici e si occupano autonomamente di notificare i cambiamenti ai loro consumatori,
        garantendo che solo le parti necessarie vengano aggiornate quando il valore cambia. Le variabili invece non tengono traccia di quali parti del codice dipendono dal loro valore,
        quindi l'aggiornamento manuale, in applicazioni di grandi dimensioni, può essere complesso e soggetto ad errori.
        </p>
      </section>
      <section id="vantaggi">
        <h2>Vantaggi</h2>
        <ul>
        <h3><b>Reattivitá Semplificata:</b></h3>
        <li>
          <p>
            Con i Signals, non è più necessario scrivere manualmente il codice per aggiornare l'interfaccia utente o altre parti dell'applicazione quando i dati cambiano.
            Questo rende il codice più pulito, più facile da leggere e meno soggetto a errori.
          </p>
        </li>
        <h3><b>Prestazioni Ottimizzate:</b></h3>
        <li>
          <p>
          I Signals sono progettati per essere efficienti. Quando un segnale cambia,
            solo le parti del codice che dipendono direttamente da quel segnale vengono ricalcolate.
            Questo evita aggiornamenti non necessari e migliora le prestazioni complessive dell'applicazione.
          </p>
        </li>
        <h3><b>Debug Facilitato:</b></h3>
        <li>
          <p>
          Poiché i Signals rendono esplicite le dipendenze tra i dati e le parti dell'applicazione che li utilizzano,
          diventa più facile rintracciare e correggere eventuali problemi.
          </p>
        </li>
        </ul>
      </section>
  </section>
    `,
};
