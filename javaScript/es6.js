let colors = ["blue", "red", "yellow", "blue", "red", "yellow"];

let [first, ... others] = colors;
console.log(first);

let person = {
    name: "Alpha",
    age: 20
}

let {name} = person;

console.log(others)