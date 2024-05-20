import component3 from "../components/component3.js";
import component2 from "../components/component2.js";

export default {
  name: "ModificaDati",
  components: { component3, component2 },

  setup() {
    const title = "Tabella:";
    return { title };
  },
  data() {
    return {
      newNome: "",
      newCognome: "",
      newEmail: "",
      newTelefono: "",
      dati: JSON.parse(localStorage.getItem("dati")) || [],
    };
  },
  methods: {
    aggiungi() {
      this.dati.push({
        nome: this.newNome,
        cognome: this.newCognome,
        email: this.newEmail,
        telefono: this.newTelefono,
      });
      this.newNome = "";
      this.newCognome = "";
      this.newEmail = "";
      this.newTelefono = "";
      this.aggiornaLocalStorage();
    },
    modifica(index) {
      let nome = prompt("Modifica il nome:", this.dati[index].nome);
      let cognome = prompt("Modifica il cognome:", this.dati[index].cognome);
      let email = prompt("Modifica l'email:", this.dati[index].email);
      let telefono = prompt("Modifica il telefono:", this.dati[index].telefono);
      if (nome && cognome && email && telefono) {
        this.dati.splice(index, 1, {
          nome: nome,
          cognome: cognome,
          email: email,
          telefono: telefono,
        });
        this.aggiornaLocalStorage();
      }
    },
    elimina(index) {
      this.dati.splice(index, 1);
      this.aggiornaLocalStorage();
    },
    aggiornaLocalStorage() {
      localStorage.setItem("dati", JSON.stringify(this.dati));
    },
  },
  template: `
  <section id="editData">
        <section id="addModal" aria-expanded="false">
          <form @submit.prevent="aggiungi">
            <section>
                <i class="fe-x"></i>
                <button type="submit">
                  <i class="fe-save"></i>
                </button>                
            </section>
            <article>
            <h3>Nome:</h3>
            <input v-model="newNome" placeholder="Inserisci nome" required />
            <h3>Cognome:</h3>
            <input v-model="newCognome" placeholder="Inserisci cognome" required />
            <h3>Email:</h3>
            <input v-model="newEmail" placeholder="Inserisci email" required />
            <h3>Telefono:</h3>
            <input v-model="newTelefono" placeholder="Inserisci telefono" required />
            </article>
            </form>   
  </section>
  <h1> {{ title }} </h1>
    <table>
    <thead>
      <tr>
        <th>Nome</th>
        <th>Cognome</th>
        <th>Email</th>
        <th>Telefono</th>
        <th>Azioni</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(dato, index) in dati" :key="index">
        <td>{{ dato.nome }}</td>
        <td>{{ dato.cognome }}</td>
        <td>{{ dato.email }}</td>
        <td>{{ dato.telefono }}</td>
        <td class="actions">
          <button @click="modifica(index)">
            <i class="fe-edit"></i>
          </button>
          <button @click="elimina(index)">
            <i class="fe-trash-2"></i>
          </button>
        </td>  
      </tr>
    </tbody>
    </table>
    <button class="add-table">
      <i class="fe-plus"></i>
    </button>
 </section>
    `,
};
