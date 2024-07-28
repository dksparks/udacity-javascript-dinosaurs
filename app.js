// Dino constructor
function Dino(rawDinoFromJson) {
  // Iterate through properties of raw dino info
  // and assign them to our Dino object
  for (const prop in rawDinoFromJson) {
    this[prop] = rawDinoFromJson[prop];
  }
}

// Here we create a private helper function for
// numeric comparisons. To do this, we can add the
// Dino/Human comparison functions to Dino.prototype
// within an IIFE.
(function () {
  function compareNumeric(dino, human, prop) {
    const hNum = human[prop];
    const dNum = dino[prop];
    const humanLarger = hNum > dNum;
    const smaller = Math.min(hNum, dNum);
    const larger = Math.max(hNum, dNum);
    const factor = Math.round(larger / smaller);
    const phrase = hNum === dNum
      ? "is exactly as large as"
      : factor === 1
      ? "is slightly larger than"
      : `is about ${factor} times as large as`;
    const [name0, name1] = humanLarger
      ? [human.name, dino.name]
      : [dino.name, human.name];
    return `By ${prop}, ${name0} ${phrase} ${name1}.`;
  }
  Dino.prototype.compareWeight = function (human) {
    return compareNumeric(this, human, "weight");
  };
  Dino.prototype.compareHeight = function (human) {
    return compareNumeric(this, human, "height");
  };
})();
Dino.prototype.compareDiet = function (human) {
  if (this.diet === human.diet) {
    return `${this.name} and ${human.name} ` +
      `are both ${this.diet}s.`;
  } else {
    return `${this.name}'s diet is ${this.diet}, ` +
      `but ${human.name}'s diet is ${human.diet}.`;
  }
};

const d = new Dino({
  name: "Velociraptor",
  weight: 300,
  height: 72,
  diet: "carnivore",
});
const h = {
  name: "Some person",
  weight: 400,
  height: 72,
  diet: "omnivore",
};

// Human constructor
function Human(name, height, weight, diet) {
  this.name = name;
  this.height = height;
  this.weight = weight;
  this.diet = diet;
}

// Create Dino Constructor

// Create Dino Objects

// Create Human Object

// Use IIFE to get human data from form

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen

// On button click, prepare and display infographic

// Attach the event listener inside an IIFE, just so
// we can name some things for convenience without
// cluttering the global namespace
document.getElementById("btn").onclick = function () {

  // Create human and remove form from DOM
  function value(field) {
    return document.getElementById(field).value;
  }
  const human = new Human(
    value("name"),
    +value("feet") * 12 + +value("inches"),
    +value("weight"),
    value("diet").toLowerCase(),
  );
  document.getElementById('dino-compare').remove();

};
