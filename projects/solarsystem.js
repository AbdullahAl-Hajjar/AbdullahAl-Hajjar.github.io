let sun;
let gravity;


function setup() {

  createCanvas(windowWidth -500, windowHeight -200, WEBGL);
  gravity = 4 * PI * PI;
  sun = new Planet(30, 0, loadImage("projects/planets/sun.jpg"), null);
  mercury = new Planet(2, 50, loadImage("projects/planets/mercury.jpg"), sun);
  venus = new Planet(3, 100, loadImage("projects/planets/venus.jpg"), sun);
  earth = new Planet(4, 150, loadImage("projects/planets/earth.jpg"), sun);
  moon = new Planet(1, 15, loadImage("projects/planets/moon.jpg"), earth);
  mars = new Planet(3, 200, loadImage("projects/planets/mars.jpg"), sun);
  jupiter = new Planet(10, 250, loadImage("projects/planets/jupiter.jpg"), sun);
  saturn = new Planet(8, 280, loadImage("projects/planets/saturn.jpg"), sun);
  uranus = new Planet(6, 300, loadImage("projects/planets/uranus.jpg"), sun);
  neptune = new Planet(5, 310, loadImage("projects/planets/neptune.jpg"), sun);
  pluto = new Planet(3, 320, loadImage("projects/planets/pluto.jpg"), sun);



}

function draw() {

  background(0);
  orbitControl();
  rotateX(PI / 2 + 100);
  sun.rotation();
  sun.display();

}

function Planet(radius, distance, texture, orbit) {
  this.radius = radius;
  this.distance = distance;
  this.orbitalLength = distance * 2 * PI;
  this.angle = random(2 * PI);
  this.texture = texture;
  this.sun = sun;
  this.planet = [];
  this.orbit = orbit;
  if (orbit) {
    orbit.planet.push(this);
  }
}

Planet.prototype.rotation = function() {
  if (this.orbitalLength > 0) {
    let shortestDistance = sqrt(pow(this.distance, 2) + pow(this.distance, 2));
    let netForce = (gravity * sun.radius * this.radius) / (pow(shortestDistance, 2));

    let force = netForce * (this.distance / shortestDistance);

    let acceleration = force / (this.radius);

    let velocity = this.distance + (frameCount * acceleration);

    let revolution = this.distance + (0.1 * velocity);

    this.angle = revolution;
  }
  for (let planet of this.planet) {
    planet.rotation();


  }

}


Planet.prototype.display = function() {
  push(); {
    strokeWeight(0);
    noFill();
    scale(100);
    scale(0.01);
    rotate(-this.angle);
    translate(this.distance, 0);
    ambientLight(255);
    ambientMaterial(255);
    texture(this.texture);
    sphere(this.radius);
    for (let planet of this.planet) {
      planet.display();
    }
  }
  pop();

}