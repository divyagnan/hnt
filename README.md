# 🦁 hnt [![Build Status](https://travis-ci.org/divyagnan/hnt.svg?branch=master)](https://travis-ci.org/divyagnan/hnt) [![Coverage Status](https://coveralls.io/repos/github/divyagnan/hnt/badge.svg?branch=master)](https://coveralls.io/github/divyagnan/hnt?branch=master)
> Small library to safely access (hunt for 😀) deeply nested array values

## Install
```bash
npm install hnt
```
To save `hnt` to you dependencies pass the `--save` flag.

## Example Usage
```js
// import hnt
import hnt from 'hnt'
// our deeply nested array
let arr = [{ people: [{ name: "divy" }] }]
// if the value exists then hnt will return that value
hnt(arr, '[0].people[0].name', '--') // returns 'divy'
// otherwise the fallback value will be returned
hnt(arr, '[1].persons[0].age', '--') // returns '--'
// this will also not error and instead will return the specified fallback value
hnt(arr, '[231].persons[312].otherValue', 'woops') // returns 'woops'
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
// logs 'Math Class'
```
But for the access path string you shouldn't include the base (the starting array), since that is already passed in as an argument to `hnt`. So the proper access path for the nested array we looked at would be the following:
```js
let accessPath = '[0].classes[0].name'  
```
Some more examples:
```js
let anotherNestedArray = [[{ classes: [{ name: "English class" }] }]]
let accessPath = '[0][0].classes[0].name'
```
```js
let reallyNestedArray = [[[[[[[[
    { reallyNested: "value" }
]]]]]]]]
let accessPath = '[0][0][0][0][0][0][0][0].reallyNested'
```
```js
let nestedArray = [
  [{ visitied: { cities: ["Jacksonville", "London", "Hyderabad"] } }]
]
// path to return the cities array
let citiesPath = '[0][0].visitied.cities'
// path to return 'Jacksonville'
let jacksonvillePath = '[0][0].visitied.cities[0]'
```

### `fallback`: The value you want to return if the value you want does not exist or is undefined

You can define any value that you want as a fallback. If the path that you supplied returns undefined at any point then the fallback value will be returned fron `hnt`

examples:
```js
// the fallback can be a string
let validFallback = '*'
// a number
let anotherValidFallback = 1
// an array
let yetAnotherValidFallback = [{ name: 'divy' }]
// the fallback can be any value!
```

## Contribute
 PRs and issues are gladly welcomed!

 ## License
 MIT © Divyagnan Kandala
