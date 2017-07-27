# 🦁 hnt 
[![Build Status](https://travis-ci.org/divyagnan/hnt.svg?branch=master)](https://travis-ci.org/divyagnan/hnt) [![Coverage Status](https://coveralls.io/repos/github/divyagnan/hnt/badge.svg?branch=master)](https://coveralls.io/github/divyagnan/hnt?branch=master) [![npm version](https://badge.fury.io/js/hnt.svg)](https://badge.fury.io/js/hnt) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com) [![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

> Small library to safely access (hunt for 😉) deeply nested array values

## Install
```bash
npm install hnt
```
To save `hnt` to you dependencies pass the `--save` flag.

## Motivation
Let's say we call an api and are given the following array as a response and we need to get the name of a student. That is pretty straightforward right?

```js
let array = [
  { teachers: [{ name: "Jane Doe" }] },
  { students: [{ name: "divy", grades: [100, 99, 100] }] }
]

// let's access the name property on the first student
console.log(array[1].students[0].name)
// logs "divy"
```
But what happens if one time the service returns an array with some property missing or the structure changes or there is a typo in the property names?
```js
let array = [
  { teachers: [{ name: "Jane Doe" }] },
  { mentors: [{ name: "John Doe" }] }
];

// let's access the name property on the first student
// wait! that doesn't exist! what will happen?
console.log(array[1].students[0].name)
// TypeError: undefined is not an object (evaluating 'array[1].students[0]')
```
We try to access something that we think exists but end up with a nasty type error! To mitigate this we might do something like the following - to make sure that everything we think exists actually exists before we access it
```js
console.log(
  array[1] &&
    array[1].students &&
    array[1].students[0] &&
    array[1].students[0].name
);
// undefined
```
undefined isn't the value that we want but at least we don't get an error. However doing this every time that you need to access something in a (deeply) nested array is *very* tedious and verbose. This is what `hnt` solves.

```js
// same array as before
let array = [
  { teachers: [{ name: "Jane Doe" }] },
  { mentors: [{ name: "John Doe" }] }
];

// import hnt for use
import hnt from "hnt"

// call the hnt function to access nested properties in the array
hnt(array, "[1].students[0].name", "Name not Found!")
// "Name not Found!"
// one function call allows us to safely access the nested property and allows us to specify a fallback value if the value we are originally requesting is undefined
```
`hnt` greatly simplifies the task of safely accessing (deeply) nested array values.

## Example Usage
```js
// import hnt
import hnt from 'hnt'
// our deeply nested array
let arr = [{ people: [{ name: "divy" }] }]
// if the value exists then hnt will return that value
hnt(arr, "[0].people[0].name", "--") // returns "divy"
// otherwise the fallback value will be returned
hnt(arr, "[1].persons[0].age", "--") // returns "--"
// this will also not error and instead will return the specified fallback value
hnt(arr, "[231].persons[312].otherValue", "woops") // returns "woops"
```
## API
#### `hnt(array: any[], accessPath: string, fallback: any)`

`hnt` is a function which requires 3 values (array, accessPath, and fallback):
### `array`: The array that you want to access

You can pass an valid array into `hnt` to access

examples:
```js
// you can pass shallow arrays
let shallowArray = [1, 2, 3, 4, 5]
// or deeply nested complex arrays
let deepArray = [[[[[[[{ some: "value" }]]]]]]]
let nestedArray = [{ classes: [{ name: "Math class" }] }]
```

### `accessPath`: The path to the value that you want from the array

The path that you want the value to should be passed in as a **string**. The path should also be relative to the array that you passed in as the first argument to `hnt`.

The access path string is *relative* in the sense that you don't include the base (the array you pass in as the first argument to `hnt`).

So to *normally* access the name property in the following array:
```js
let nestedArray = [{ classes: [{ name: "Math class" }] }]
```
You would do the following
```js
console.log(nestedArray[0].classes[0].name)
// logs "Math Class"
```
But for the access path string you shouldn't include the base (the starting array), since that is already passed in as an argument to `hnt`. So the proper access path for the nested array we looked at would be the following:
```js
let accessPath = "[0].classes[0].name"
```
Some more examples:
```js
let anotherNestedArray = [[{ classes: [{ name: "English class" }] }]]
let accessPath = "[0][0].classes[0].name"
```
```js
let reallyNestedArray = [[[[[[[[
    { reallyNested: "value" }
]]]]]]]]
let accessPath = "[0][0][0][0][0][0][0][0].reallyNested"
```
```js
let nestedArray = [
  [{ visitied: { cities: ["Jacksonville", "London", "Hyderabad"] } }]
]
// path to return the cities array
let citiesPath = "[0][0].visitied.cities"
// path to return "Jacksonville"
let jacksonvillePath = "[0][0].visitied.cities[0]"
```

### `fallback`: What you want to return in the case that your specified access path for your array does not exist

You can define any value that you want as a fallback. If the path that you supplied returns undefined at any point then the fallback value will be returned fron `hnt`

examples:
```js
// the fallback can be a string
let validFallback = "*"
// a number
let anotherValidFallback = 1
// an array
let yetAnotherValidFallback = [{ name: "divy" }]
// the fallback can be any value!
```

## Contribute
 PRs and issues are gladly welcomed!

 ## License
 MIT © Divyagnan Kandala
