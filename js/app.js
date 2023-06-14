const App = {
  data() {
    return {
      showHome: false,
      showCreateForm: false,
      showStudentsList: false,
    };
  },

  methods: {
    goToHome() {
      this.showHome = true;
    },
    goToCreateForm() {
      this.showCreateForm = true;
    },
    goToStudentsList() {
      this.showStudentsList = true;
    },
  },
};

Vue.createApp(App).mount("#app");
