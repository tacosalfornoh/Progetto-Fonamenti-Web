export default {
    name: 'Esempi Codici',

    setup() {        
        const title = 'Esempi Codici'
        return {title}
    },
    template: `
    <section id="approfondimento">
        <h1>{{ title }}</h1>
    <section id="examples">
        <section id="vanilla_code">
            <legend>VanillaJS Contatore</legend>
            <code>let counter = 0;<br>
            const setCounter = (value) => {<br>
              counter = value;<br>
              render();<br>
            };<br>
            <br>
            const isEven = () => (counter & 1) == 0;<br>
            const parity = () => isEven() ? "even" : "odd";<br>
            const render = () => element.innerText = parity();<br>
            <br>
            <span>// Simulate external updates to counter...</span><br>
            setInterval(() => setCounter(counter + 1), 1000);</code>
            <ul>
                <h2>Difetti:</h2>
                <h3>Accoppiamento stretto:</h3>
                <li>
                    Il contatore è strettamente legato al sistema di rendering,
                    causando rendering non necessari quando solo la parità cambia.</li>
                <h3>Dipendenze implicite:</h3>
                <li>
                    Funzioni come render devono conoscere e iscriversi a counter
                    anche se dipendono solo da parity.</li>
                <h3>Aggiornamenti limitati:</h3>
                <li>
                    Funzioni come render devono conoscere e iscriversi a counter
                    anche se dipendono solo da parity.</li>
                <h3>Complessitá Aumentata:</h3>
                <li>
                    L'introduzione di pub/sub aumenta la complessità del codice
                    e introduce potenziali problemi di gestione degli abbonamenti e
                    perdite di memoria.</li>
            </ul>
            <p>Anche l'aggiunta di pub/sub a <b>isEven</b> e <b>parity</b> risolve solo parzialmente
            i problemi, aumentando ulteriormente la complessità del codice e introducendo
            nuovi potenziali problemi. In sintesi, l'approccio attuale non è scalabile e
            richiede una revisione per gestire efficacemente lo stato e le dipendenze
            nell'applicazione.</p>
        </section>
        <section id="signals_code">
            <legend>Signals Contatore</legend>
            <code>const counter = new Signal.State(0);<br>
            const isEven = new Signal.Computed(() => (counter.get() & 1) == 0);<br>
            const parity = new Signal.Computed(() => isEven.get() ? "even" : "odd");<br>
            <br>
            <span>// A library or framework defines effects based on other Signal primitives</span><br>
            declare function effect(cb: () => void): (() => void);<br>
            <br>
            effect(() => element.innerText = parity.get());<br>
            <br>
            <span>// Simulate external updates to counter...</span><br>
            setInterval(() => counter.set(counter.get() + 1), 1000);<br>
            </code>
            <ul>
                <h2>Vantaggi:</h2>
                <h3>Eliminazione del Rumore:</h3>
                <li>
                    Semplificano la gestione della variabile counter e delle sue dipendenze.</li>
                <h3>API unificata:</h3>
                <li>
                    Forniscono un'interfaccia coerente per gestire valori,
                    calcoli ed effetti collaterali.</li>
                <h3>Nessun problema di Dipendenza:</h3>
                <li>
                    Eliminano i problemi di riferimenti circolari e dipendenze invertite.</li>
                <h3>Gestione automatica:</h3>
                <li>
                    Non richiedono iscrizioni manuali o contabilità aggiuntiva.</li>
                <h3>Controllo della Tempistica:</h3>
                <li>
                    Consentono di gestire la pianificazione degli effetti collaterali.</li>
                <p>Oltre ai vantaggi evidenti, i segnali offrono anche funzionalità più avanzate:</p>
                <h3>Monitoraggio automatico delle dipendenze:</h3>
                <li>
                    I segnali calcolati tengono traccia automaticamente delle loro dipendenze,
                    semplificando la gestione delle relazioni tra i dati.</li>
                <h3>Valutazione pigra:</h3>
                <li>
                    I calcoli vengono eseguiti solo quando necessario, migliorando l'efficienza.</li>
                <h3>Memorizzazione:</h3>
                <li>
                I valori calcolati vengono memorizzati nella cache,
                evitando ricalcoli non necessari e ottimizzando ulteriormente le prestazioni.</li>
            </ul>
    </section>
    </section>
    `,
};  