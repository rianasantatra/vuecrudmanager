const checkIfEmptyValue = (obj) => {
  const fieldsToCheck = [
    "Name",
    "FirstName",
    "DateNaissance",
    "NiveauScolaire",
  ];
  return fieldsToCheck.some((prop) => {
    const value = obj[prop];
    return value === "" || value === null || value === undefined;
  });
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
        id: null,
      },
      students: [],
      searchQuery: "",
      isEditing: false,
    };
  },

  mounted() {
    this.goToStudentsList();
    this.loadStudents();
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
      this.loadStudents();
    },

    loadStudents() {
      this.students = getLocalDB();
    },

    submitStudent() {
      if (!checkIfEmptyValue(this.newStudent)) {
        if (this.isEditing) {
          console.log("Updating with:", this.newStudent); // Débogage
          updateStudent(this.newStudent);
          showSuccessMessage("Student successfully updated!");
        } else {
          if (
            !checkIfStudentExist(
              this.newStudent.Name,
              this.newStudent.FirstName
            )
          ) {
            console.log("Adding with:", this.newStudent); // Débogage
            addStudent(this.newStudent);
            showSuccessMessage("Student successfully added!");
          } else {
            showErrorMessage("Student already exists!");
            return;
          }
        }
        this.resetForm();
        this.goToStudentsList();
      } else {
        showErrorMessage("Please fill all fields!");
      }
    },

    editStudent(student) {
      console.log("Editing student:", student); // Débogage
      this.newStudent = { ...student }; // Clone complet
      this.isEditing = true;
      this.goToCreateForm();
    },

    removeStudent(student) {
      swal({
        title: "Are you sure?",
        text: "This student will be deleted!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          deleteStudent(student);
          this.loadStudents();
          showSuccessMessage("Student deleted!");
        }
      });
    },

    searchStudents() {
      if (this.searchQuery.trim() === "") {
        this.loadStudents();
      } else {
        this.students = searchByName(this.searchQuery);
      }
    },

    resetForm() {
      this.newStudent = {
        Name: "",
        FirstName: "",
        DateNaissance: "",
        NiveauScolaire: "",
        id: null,
      };
      this.isEditing = false;
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
