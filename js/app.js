const checkIfEmptyValue = (obj) => {
  let isEmpty = false;
  for (const prop in obj) {
    if (obj[prop] == "") {
      isEmpty = true;
    }
  }
  return isEmpty;
};

const showSuccessMessage = (message) => {
  swal({
    text: message,
    icon: "success",
  });
};

const showErrorMessage = (message) => {
  swal({
    text: message,
    icon: "error",
  });
};

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

    submitStudent() {
      if (!checkIfEmptyValue(this.newStudent)) {
        if (
          !checkIfStudentExist(this.newStudent.name, this.newStudent.prenom)
        ) {
          addStudent(this.newStudent);
          this.newStudent = {
            Name: "",
            FirstName: "",
            DateNaissance: "",
            NiveauScolaire: "",
          };
          showSuccessMessage("Student Successfully added!");
        } else {
          showErrorMessage("Student recorded already!");
        }
      } else {
        showErrorMessage("Ooops!...Fill the form please!");
      }
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
