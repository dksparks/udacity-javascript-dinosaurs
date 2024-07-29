// Empty array in which to store Dino objects
const dinos = [];

// Dino constructor
function Dino(rawDino) {
  // Iterate through properties of raw dino info
  // and assign them to our Dino object
  for (const prop in rawDino) {
    this[prop] = rawDino[prop];
  }
}

// Here we create a private helper function for
// numeric comparisons. To do this, we can add the
// Dino/Human comparison functions to Dino.prototype
// within an IIFE.
(function () {
  function compareNumeric(dino, human, prop) {
    // Make a string containing the result of a
    // numeric comparison between dino and human
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
      ? [human.name, dino.species]
      : [dino.species, human.name];
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
    return `${this.species} and ${human.name} ` +
      `are both ${this.diet}s.`;
  } else {
    return `${this.species}'s diet is ${this.diet}, ` +
      `but ${human.name}'s diet is ${human.diet}.`;
  }
};

Dino.prototype.randomInfo = function (human) {
  // Always return the fact for the Pigeon
  if (this.species === "Pigeon") {
    return this.fact;
  }
  // Otherwise choose one of the other six pieces of
  // information at random
  const randInt = Math.floor(Math.random() * 6);
  switch (randInt) {
    case 0:
      return this.compareWeight(human);
    case 1:
      return this.compareHeight(human);
    case 2:
      return this.compareDiet(human);
    case 3:
      return `${this.species} lived in ${this.where}.`;
    case 4:
      return `${this.species} lived in the ${this.when}.`;
    case 5:
      return this.fact;
  }
};

// Human constructor
function Human(name, height, weight, diet) {
  this.name = name;
  this.height = height;
  this.weight = weight;
  this.diet = diet;
}

// Here we create a private helper function for
// making tiles. To do this, we can add tile-making
// methods to Dino.prototype and Human.prototype
// within an IIFE.
(function () {
  function makeTile(head, image, body) {
    // Make a tile DOM element
    const tile = document.createElement("div");
    tile.classList.add("grid-item");
    const h3 = document.createElement("h3");
    h3.innerHTML = head;
    const img = document.createElement("img");
    img.src = `images/${image}.png`;
    const p = document.createElement("p");
    p.innerHTML = body;
    tile.append(h3, img, p);
    return tile;
  }
  Dino.prototype.tile = function (human) {
    return makeTile(
      this.species,
      this.species.toLowerCase(),
      this.randomInfo(human),
    );
  };
  Human.prototype.tile = function () {
    return makeTile(this.name, "human", "");
  };
})();

// Attach the event listener inside an IIFE, just so
// we can name some things for convenience without
// cluttering the global namespace.
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
  document.getElementById("dino-compare").remove();

  // Make tiles
  const tiles = {};
  for (const dino of dinos) {
    tiles[dino.species] = dino.tile(human);
  }
  tiles.Human = human.tile();

  // Add tiles to DOM in correct order
  const tileOrder = [
    "Triceratops",
    "Tyrannosaurus rex",
    "Ankylosaurus",
    "Brachiosaurus",
    "Human",
    "Stegosaurus",
    "Pigeon",
    "Pteranodon",
    "Elasmosaurus",
  ];
  const grid = document.getElementById("grid");
  for (const key of tileOrder) {
    grid.append(tiles[key]);
  }
};

// It is not clear to me whether my project will be
// evaluated by accessing it from a server or by
// viewing index.html locally.
// To avoid problems, I have copied the contents of
// dino.json directly into this file.
// In reality, we would probably want to leave
// dino.json in a separate file and fetch() it here.
(function () {
  const rawDinoData = {
    "Dinos": [
      {
        "species": "Triceratops",
        "weight": 13000,
        "height": 114,
        "diet": "herbivore",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "First discovered in 1889 by Othniel Charles Marsh.",
      },
      {
        "species": "Tyrannosaurus rex",
        "weight": 11905,
        "height": 144,
        "diet": "carnivore",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "The largest known skull measures in at 5 feet long.",
      },
      {
        "species": "Ankylosaurus",
        "weight": 10500,
        "height": 55,
        "diet": "herbivore",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "Ankylosaurus had some of its bones fused together for strength.",
      },
      {
        "species": "Brachiosaurus",
        "weight": 70000,
        "height": "372",
        "diet": "herbivore",
        "where": "North America",
        "when": "Late Jurasic",
        "fact": "An asteroid was named 9954 Brachiosaurus in 1991.",
      },
      {
        "species": "Stegosaurus",
        "weight": 11600,
        "height": 79,
        "diet": "herbivore",
        "where": "North America, Europe, Asia",
        "when": "Late Jurasic to Early Cretaceous",
        "fact":
          "The Stegosaurus had between 17 and 22 separate plates and flat spines.",
      },
      {
        "species": "Elasmosaurus",
        "weight": 16000,
        "height": 59,
        "diet": "carnivore",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "Elasmosaurus was a marine reptile first discovered in Kansas.",
      },
      {
        "species": "Pteranodon",
        "weight": 44,
        "height": 20,
        "diet": "carnivore",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur.",
      },
      {
        "species": "Pigeon",
        "weight": 0.5,
        "height": 9,
        "diet": "herbivore",
        "where": "World Wide",
        "when": "Holocene",
        "fact": "All birds are dinosaurs.",
      },
    ],
  };
  for (const rawDino of rawDinoData["Dinos"]) {
    const dino = new Dino(rawDino);
    dinos.push(dino);
  }
})();
