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
          src="https://miro.medium.com/v2/resize:fit:1400/0*7ifvY4u8nYnZtCp4"
          />
        </div>
        <i class="fe-arrow-down"></i>
      </section>
      <section id="about">
      <h2>Cos'é Javascript Signals?</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicin elit. Quisquam,
        voluptate. Quisquam, voluptate. Lorem ipsum dolor sit amet,
        consectetur adipisicin elit. Quisquam, voluptate. Quisquam, voluptate.
        Lorem ipsum dolor sit amet, consectetur adipisicin elit. Quisquam,
        voluptate. Quisquam, voluptate.
      </p>
      </section>
      <section id="works">
        <h2>Come funziona?</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicin elit. Quisquam,
          voluptate. Quisquam, voluptate. Lorem ipsum dolor sit amet,
          consectetur adipisicin elit. Quisquam, voluptate. Quisquam, voluptate.
          Lorem ipsum dolor sit amet, consectetur adipisicin elit. Quisquam,
          voluptate. Quisquam, voluptate.
        </p>
      </section>
      <section id="why">
        <h2>Perché é utile?</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicin elit. Quisquam,
          voluptate. Quisquam, voluptate. Lorem ipsum dolor sit amet,
          consectetur adipisicin elit. Quisquam, voluptate. Quisquam, voluptate.
          Lorem ipsum dolor sit amet, consectetur adipisicin elit. Quisquam,
          voluptate. Quisquam, voluptate.
        </p>
      </section>
      <section id="examples">
        <h2>Qualche esempio?</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicin elit. Quisquam,
          voluptate. Quisquam, voluptate. Lorem ipsum dolor sit amet,
          consectetur adipisicin elit. Quisquam, voluptate. Quisquam, voluptate.
          Lorem ipsum dolor sit amet, consectetur adipisicin elit. Quisquam,
          voluptate. Quisquam, voluptate.
        </p>
      </section>
  </section>
    `,
};