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
    ricorda(index) {
      var editNome = document.getElementById("editNome");
      var editCognome = document.getElementById("editCognome");
      var editEmail = document.getElementById("editEmail");
      var editTelefono = document.getElementById("editTelefono");

      editNome.value = this.dati[index].nome;
      editCognome.value = this.dati[index].cognome;
      editEmail.value = this.dati[index].email;
      editTelefono.value = this.dati[index].telefono;
    },

    modifica(index) {
      var editNome = document.getElementById("editNome");
      var editCognome = document.getElementById("editCognome");
      var editEmail = document.getElementById("editEmail");
      var editTelefono = document.getElementById("editTelefono");

      console.log("A" + this.dati);
      console.log("B"+ index);
      console.log("c" + this.dati[index]);
      this.dati.splice(index, 1 ,{
        nome: editNome.value,
        cognome: editCognome.value,
        email: editEmail.value,
        telefono: editTelefono.value,
      });

      this.aggiornaLocalStorage();
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
  <section id="dataTable">
  <section id="editData" aria-expanded="false">
        <form @submit.prevent="modifica">
          <section>
              <i class="fe-x"></i>
              <button @click="modifica(index)" type="submit">
                <i class="fe-save"></i>
              </button>                
          </section>
          <article>
          <h3>Nome:</h3>
          <input id="editNome" placeholder="modifica nome" required />
          <h3>Cognome:</h3>
          <input id="editCognome" placeholder="modifica cognome" required />
          <h3>Email:</h3>
          <input id="editEmail" placeholder="modifica email" required />
          <h3>Telefono:</h3>
          <input id="editTelefono" placeholder="modifica telefono" required />
          </article>
          </form>   
      </section>
        <section id="addData" aria-expanded="false">
          <form @submit.prevent="aggiungi">
            <section>
                <i class="fe-x" id="add"></i>
                <button type="submit">
                  <i class="fe-save">Save</i>
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
            <p id="done">Aggiunto!</p> 
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
          <button @click="ricorda(index)">
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
      <i class="fe-plus" id="add"></i>
    </button>
 </section>
    `,
};
