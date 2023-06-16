const App = {
  data() {
    return {
      showHome: false,
      showCreateForm: false,
      showStudentsList: false,
    };
  },

  mounted() {
    this.changeNavigationState("home");
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
    changeNavigationState(destination) {
      this.showCreateForm = false;
      this.showHome = false;
      this.showStudentsList = false;

      switch (destination) {
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
      }
    },
  },
};

Vue.createApp(App).mount("#app");
