const models = require('../models');

const Cat = models.Cat.CatModel;
const Dog = models.Dog.DogModel;

const defaultData = {
  name: 'unknown',
  bedsOwned: 0,
};

const defaultData2 = {
  name: 'unknown',
  breed: 'unknown',
  age: 0,
};

let lastAdded = new Cat(defaultData);
let lastAdded2 = new Dog(defaultData2);

const hostIndex = (req, res) => {
  res.render('index', {
    currentName: lastAdded.name,
    currentName2: lastAdded2.name,
    title: 'Home',
    pageName: 'Home Page',
  });
};

const readAllCats = (req, res, callback) => {
  Cat.find(callback).lean();
};

const readAllDogs = (req, res, callback2) => {
  Dog.find(callback2).lean();
};

const readCat = (req, res) => {
  const name1 = req.query.name;

  const callback = (err, doc) => {
    if (err) {
      return res.status(500).json({ err });
    }

    return res.json(doc);
  };

  Cat.findByName(name1, callback);
};

const readDog = (req, res) => {
  const name2 = req.query.name;

  const callback2 = (err, doc) => {
    if (err) {
      return res.status(500).json({ err });
    }

    return res.json(doc);
  };
  Dog.findByDogName(name2, callback2);
};

const hostPage1 = (req, res) => {
  const callback = (err, docs) => {
    if (err) {
      return res.status(500).json({ err });
    }

    return res.render('page1', { cats: docs });
  };

  readAllCats(req, res, callback);
};

const hostPage3 = (req, res) => {
  const callback2 = (err, docs) => {
    if (err) {
      return res.status(500).json({ err });
    }

    return res.render('page3', { dogs: docs });
  };

  readAllDogs(req, res, callback2);
};

const hostPage2 = (req, res) => {
  res.render('page2');
};

const getName = (req, res) => {
  res.json({ name: lastAdded.name });
};

const setName = (req, res) => {
  if (!req.body.firstname || !req.body.lastname || !req.body.beds) {
    return res.status(400).json({ error: 'firstname, lastname and beds are all required' });
  }

  const name = `${req.body.firstname} ${req.body.lastname}`;

  const catData = {
    name,
    bedsOwned: req.body.beds,
  };

  const newCat = new Cat(catData);

  const savePromise = newCat.save();

  savePromise.then(() => {
    lastAdded = newCat;

    res.json({ name: lastAdded.name, beds: lastAdded.bedsOwned });
  });

  savePromise.catch((err) => res.status(500).json({ err }));

  return res;
};

const searchName = (req, res) => {
  if (!req.query.name) {
    return res.status(400).json({ error: 'Name is required to perform a search' });
  }

  return Cat.findByName(req.query.name, (err, doc) => {
    if (err) {
      return res.status(500).json({ err });
    }

    if (!doc) {
      return res.json({ error: 'No cats found' });
    }
    return res.json({ name: doc.name, beds: doc.bedsOwned });
  });
};
/// //////////////////////////////////////////////////////
const hostPage4 = (req, res) => {
  res.render('page4');
};

const getName2 = (req, res) => {
  res.json({ name2: lastAdded2.name });
};

const setName2 = (req, res) => {
  if (!req.body.firstname || !req.body.lastname || !req.body.age) {
    return res.status(400).json({ error: 'firstname, lastname and age are all required' });
  }

  const name = `${req.body.firstname} ${req.body.lastname}`;

  const dogData = {
    name,
    age: req.body.age,
  };

  const newDog = new Dog(dogData);

  const savePromise2 = newDog.save();

  savePromise2.then(() => {
    lastAdded2 = newDog;

    res.json({ name: lastAdded2.name, age: lastAdded2.age });
  });

  savePromise2.catch((err) => res.status(500).json({ err }));

  return res;
};

const searchDogName = (req, res) => {
  if (!req.query.name) {
    return res.status(400).json({ error: 'Name is required to perform a search' });
  }

  return Dog.findByDogName(req.query.name, (err, doc) => {
    if (err) {
      return res.status(500).json({ err });
    }

    if (!doc) {
      return res.json({ error: 'No dogs found' });
    }

    return res.json({ name: doc.name, age: doc.age });
  });
};

const updateLast = (req, res) => {
  lastAdded.bedsOwned++;
  lastAdded2.age++;

  const savePromise = lastAdded.save();
  const savePromise2 = lastAdded2.save();

  savePromise.then(() => res.json({ name: lastAdded.name, beds: lastAdded.bedsOwned }));
  savePromise2.then(() => res.json({ name: lastAdded2.name, age: lastAdded2.age }));

  savePromise.catch((err) => res.status(500).json({ err }));
  savePromise2.catch((err) => res.status(500).json({ err }));
};

const notFound = (req, res) => {
  res.status(404).render('notFound', {
    page: req.url,
  });
};

module.exports = {
  index: hostIndex,
  page1: hostPage1,
  page2: hostPage2,
  page3: hostPage3,
  page4: hostPage4,
  readCat,
  readDog,
  getName,
  getName2,
  setName,
  setName2,
  updateLast,
  searchName,
  searchDogName,
  notFound,
};
