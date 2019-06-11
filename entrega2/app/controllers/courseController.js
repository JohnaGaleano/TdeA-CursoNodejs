const fs = require('fs');


// Retorna todos los cursos en el archivo JSON

const allCourses = () => {
  try {
    return require('../../data/courses.json');
  } catch (error) {
    return [];
  }
};

//Retorna las personas registradas del archivo JSON

const people = () => {
  try {
    return require('../../data/registered.json');
  } catch (error) {
    return [];
  }
};

//Retorna las personas registradas en los cursos del archivo JSON

const coursesPerPerson = () => {
  try {
    return require('../../data/courses-per-person.json');
  } catch (error) {
    return [];
  }
};

//Retorna los cursos del archivo JSON

const getCoursesAvailable = () => {
  const coursesList = allCourses();
  return coursesList.filter(available => available.state === 'disponible');
};

// Funcion para guardar un curso

const saveCourse = (courses) => {
  const data = JSON.stringify(courses);
  fs.writeFile('data/courses.json', data, (err) => {
    if (err) throw (err);
    console.log('Curso guardado correctamente');
  });
};

// Funcion para guardar una persona

const savePerson = (persons) => {
  const data = JSON.stringify(persons);
  fs.writeFile('data/registered.json', data, (err) => {
    if (err) throw (err);
    console.log('Aspirante registrado correctamente');
  });
};

// Funcion para guardar una persona por curso

const saveCoursesPerPerson = (info) => {
  const data = JSON.stringify(info);
  fs.writeFile('data/courses-per-person.json', data, (err) => {
    if (err) throw (err);
    console.log('curso registrado para el estudiante');
  });
};

// Funcion para mostrar todos los cursos

exports.index = (req, res) => {
  const coursesList = allCourses();
  res.render('courses', { courses: coursesList });
};

// Funcion para mostrar un curso

exports.show = (req, res) => {
  const coursesList = allCourses();
  const show = coursesList.find(search => search.id === req.params.id);
  res.render('show-course', { course: show });
};

// FUncion para crear un curso 

exports.create = (req, res) => {
  res.render('create-course');
};

// Guardar un curso 

exports.store = (req, res) => {
  const coursesList = allCourses();

  const course = {
    id: req.body.id,
    name: req.body.name,
    modality: req.body.modality,
    workload: req.body.workload,
    description: req.body.description,
    state: 'disponible',
    cost: req.body.cost,
  };

  const duplicate = coursesList.find(search => search.id === course.id);

  if (!duplicate) {
    coursesList.push(course);
    saveCourse(coursesList);
    res.render('courses', { courses: allCourses(), success: 'Curso registrado correctamente' });
  } else {
    res.render('create-course', { info: 'Ya existe otro curso con este id' });
  }
};

// Ingresar un curso

exports.enterCourse = (req, res) => {
  const coursesList = allCourses();
  const show = coursesList.find(search => search.id === req.params.id);
  res.render('enter-course', { course: show });
};

// Registrar un curso

exports.registryCourse = (req, res) => {
  const coursePerson = coursesPerPerson();
  let registeredPeople = people();

  const registryUser = {
    identity: req.body.identity,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };

  const coursesPerson = {
    user_id: req.body.identity,
    course_id: req.body.course_id,
  };

  const checkExistPerson = registeredPeople.find(search => search.identity
    === registryUser.identity);
  const checkDuplicate = coursePerson.filter(search => search.user_id === registryUser.identity
    && search.course_id === coursesPerson.course_id);

  if ((checkDuplicate.length >= 1) && checkExistPerson) {
    res.render('courses-available', { courses: getCoursesAvailable(), info: 'ya estas inscrito en este curso' });
  } else if (checkDuplicate.length === 0 && !checkExistPerson) {
    registeredPeople.push(registryUser);
    coursePerson.push(coursesPerson);
    savePerson(registeredPeople);
    saveCoursesPerPerson(coursePerson);
    res.render('courses-available', { courses: getCoursesAvailable(), success: 'curso registrado correctamente' });
  } else if (checkDuplicate.length === 0 && checkExistPerson) {
    const newData = registeredPeople.filter(search => search.identity !== registryUser.identity);
    newData.push(registryUser);
    coursePerson.push(coursesPerson);
    registeredPeople = newData;
    savePerson(registeredPeople);
    saveCoursesPerPerson(coursePerson);
    res.render('courses-available', { courses: getCoursesAvailable(), success: 'curso registrado correctamente' });
  }
};

// Mostrar los cursos habilitados

exports.coursesAvailable = (req, res) => {
  res.render('courses-available', { courses: getCoursesAvailable() });
};

// Mostrar los registrados

exports.seeRegistered = (req, res) => {
  const coursesList = allCourses();
  const registeredPeople = people();
  const coursePerson = coursesPerPerson();

  const registeredCourse = [];

  const show = coursesList.find(search => search.id === req.params.id);
  const insideCourse = coursePerson.filter(search => search.course_id === req.params.id);

  insideCourse.forEach((person) => {
    const createPerson = registeredPeople.find(search => search.identity === person.user_id);
    createPerson.course_id = req.params.id;
    registeredCourse.push(createPerson);
  });

  res.render('see-registered', { course: show, people: registeredCourse });
};

// Actualizar estado del curso

exports.updateCourseStatus = (req, res) => {
  const coursesList = allCourses();

  const found = coursesList.find(search => search.id === req.params.id);
  if (found.state = 'cerrado') {
    found.state = 'disponible'
  } else found.state = 'cerrado'

  saveCourse(coursesList);
  res.redirect('/courses');
};

// Remover del curso

exports.removeFromCourse = (req, res) => {
  let coursePerson = coursesPerPerson();

  const newData = coursePerson.filter(search => !(
    search.course_id === req.params.course_id && search.user_id === req.params.student_id));
  coursePerson = newData;

  saveCoursesPerPerson(coursePerson);
  res.redirect('/courses');
};
