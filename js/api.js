const studentDB = "studentDB";

function getLocalDB() {
  if (!localStorage.getItem(studentDB)) {
    localStorage.setItem(studentDB, JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem(studentDB));
}

function updateDB(db) {
  localStorage.setItem(studentDB, JSON.stringify(db));
}

/**
 * function add
 */
function addStudent(student) {
  const db = getLocalDB();
  console.log(db);
  student.id = Date.now() + "";
  db.push(student);
  updateDB(db);
}

/**
 * function update
 */
function updateStudent(student) {
  const db = getLocalDB();
  const updatedDB = db.map(function (curStudent) {
    if (curStudent.id == student.id) {
      return {
        Name: student.Name,
        FirstName: student.FirstName,
        DateNaissance: student.DateNaissance,
        NiveauScolaire: student.NiveauScolaire,
        id: student.id,
      };
    }
    return curStudent;
  });

  updateDB(updatedDB);
}

/**
 * function delete
 */
function deleteStudent(student) {
  const db = getLocalDB();
  const updatedDB = db.filter(function (curStudent) {
    return curStudent.id != student.id;
  });
  updateDB(updatedDB);
}

/**
 * function get
 */
function getStudent(id) {
  const db = getLocalDB();
  var filteredDB = db.filter((data) => data.id == id);
  if (filteredDB.length > 0) {
    return filteredDB[0];
  }
  return null;
}

/**
 * function search
 */
function searchByName(name, firstname) {
  const db = getLocalDB();
  const filteredDB = db.filter((data) => {
    return data.name.includes(name) || data.firstname.includes(firstname);
  });
  return filteredDB;
}

/**
 * check if record already exist
 */
function checkIfStudentExist(name, firstname) {
  const db = getLocalDB();
  const filteredDB = db.filter((data) => {
    return data.name == name && data.firstname == firstname;
  });
  return filteredDB.length > 0;
}
