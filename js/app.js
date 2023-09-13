const App = {
  data() {
    return {
      showHome: false,
      showCreateForm: false,
      showStudentsList: false,
      newStudent: {
        Name: "",
        FirstName: "",
        DateNaissance: "",
        NiveauScolaire: "",
      },
    };
  },

  mounted() {
    this.changeNavigationState("form");
  },

  methods: {
    goToHome() {
      this.changeNavigationState("home");
    },
    goToCreateForm() {
      this.changeNavigationState("form");
    },

    goToStudentsList() {
      this.changeNavigationState("list");
    },

    addStudent() {
      console.log(this.newStudent);
    },

    changeNavigationState(route) {
      this.showCreateForm = false;
      this.showHome = false;
      this.showStudentsList = false;

      switch (route) {
        case "home":
          this.showHome = true;
          break;
        case "form":
          this.showCreateForm = true;
          break;
        case "list":
          this.showStudentsList = true;
          break;

        default:
          this.showHome = true;
          break;
      }
    },
  },
};

Vue.createApp(App).mount("#app");
