<?php include 'include/header.php'; ?>
    <main>
      <div class="stripes"></div>
      <section id="voti">
        <section id="box-voti">
          <article class="box">
            <p class="materia">Matematica</p>
            <p class="voto">6</p>
          </article>
          <article class="box">
            <p class="materia">Informatica</p>
            <p class="voto">8.25</p>
          </article>
          <article class="box">
            <p class="materia">Italiano</p>
            <p class="voto">9</p>
          </article>
          <article class="box">
            <p class="materia">Storia</p>
            <p class="voto">9</p>
          </article>
          <article class="box">
            <p class="materia">Filosofia</p>
            <p class="voto">9</p>
          </article>
          <article class="box">
            <p class="materia">Scienze</p>
            <p class="voto">7.5</p>
          </article>
          <article class="box">
            <p class="materia">Fisica</p>
            <p class="voto">6.9</p>
          </article>
          <article class="box">
            <p class="materia">Arte</p>
            <p class="voto">9.2</p>
          </article>
          <article class="box">
            <p class="materia">Inglese</p>
            <p class="voto">8.2</p>
          </article>
          <article class="box">
            <p class="materia">Motoria</p>
            <p class="voto">9.5</p>
          </article>
        </section>
        <aside class="box">
          <article>
            <div>
              <p class="mark">8</p>
            </div>
            <div class="commento">
            <p>tipo: interrogazione</p>
            <p class="descrizione">descrizione: l'alunno era preparato sugli argomenti richiesti.</p>
          </div>
          </article>
          <article>
            <div>
              <p class="mark">6</p>
            </div>
            <div class="commento">
            <p>tipo: interrogazione</p>
            <p class="descrizione">descrizione: l'alunno era preparato sugli argomenti richiesti, con alcune lacune su bim bum bam.</p>
          </div>
          </article>
          <article>
            <div>
              <p class="mark">10</p>
            </div>
            <div class="commento">
            <p>tipo: interrogazione</p>
            <p class="descrizione">descrizione: l'alunno era preparato sugli argomenti richiesti, con alcune lacune su bim bum bam.</p>
          </div>
          </article>
          <article>
            <div>
              <p class="mark">7</p>
            </div>
            <div class="commento">
            <p>tipo: interrogazione</p>
            <p class="descrizione">descrizione: l'alunno era preparato sugli argomenti richiesti, con alcune lacune su bim bum bam.</p>
          </div>
          </article>
        </aside>
      </section>
    </main>
    <footer>
      <p>Designed by Alessandro Bruno & Alessandra Di Bella</p>
    </footer>
  </body>
  <script>
    const img = document.querySelector('#user-logo');
    const navBar = document.querySelector('#navigation-bar');

    img.addEventListener('click', () => {
      if (navBar.hasAttribute('visibile')) {
        navBar.removeAttribute('visibile');
      } else {
        navBar.setAttribute('visibile', '');
      }
    });

    document.addEventListener('click', (event) => {
    // Controlla se il clic è avvenuto all'interno dell'immagine o della navbar
    if (!event.target.closest('#user-logo') && !event.target.closest('#navigation-bar')) {
      navBar.removeAttribute('visibile');
    }
  });

  </script>
</html>


navBar.removeAttribute('visibile');