const mySecret = process.env['MONGO_URI']
const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });

let personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model("Person", personSchema);

let createAndSavePerson = function(done) {
  let janeFonda = new Person({ name: "Hodor", age: 24, favoriteFoods: ["burger", "steak"] });

  janeFonda.save(function(err, data) {
    if (err) return console.error(err);
    console.log(data)
    done(null, data)
  });
};

const createManyPeople = function(arrayOfPeople, done) {
  Person.create(arrayOfPeople, function(err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function(err, personFound) {
    if (err) return console.log(err);
    console.log(personFound);
    done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function(err, data) {
    if (err) return console.log(err);
    console.log(data);
    done(null, data);
  })
};


const findPersonById = (personId, done) => {
  Person.findOne({ _id: personId }, function(err, data) {
    if (err) return console.log(err);
    console.log(data);
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findOne({ _id: personId }, function(err, person) {
    if (err) return console.log(err);

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson);
    })

  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, updatedDoc) => {
    if (err) return console.log(err);
    done(null, updatedDoc);

  })

};

const removeById = (personId, done) => {
  Person.findByIdAndRemove( {_id:personId}, (err, person) =>{
    if (err) return console.log(err);
    done(null, person)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, person) => {
    if(err) return console.log(err);
    done(null, person)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort({name: 1}).limit(2).select({age: 0}).exec( (err, person) => {
    if(err) return console.log(err);
    done(null, person);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
