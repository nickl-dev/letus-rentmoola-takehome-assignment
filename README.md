## Letus/Rentmoola Takehome Assignment

<img 
  src="https://s3-eu-west-1.amazonaws.com/tpd/logos/5fc8ff888f14430001f4b141/0x0.png"
  alt="Letus/Rentmoola Logo"
  width="300px"
/>

### Q1. Create a To-Do list with the following features:
1. Ability to create, update, and delete a task.
2. Ability to mark a task as done.

<strong>Restrictions:</strong>
1. Don’t use any design libraries.
2. Don’t use any inbuild functions of JS Array (such as filter, sort, etc.).
3. Only use vanilla JS or React JS.

<strong>Good to have:</strong>
1. Pagination, 5 tasks a page.
2. Covered with test cases.

<strong>Things we are looking for:</strong>
1. Good architecture
2. State management
3. UI/UX

<strong>Note: Please provide references for any code taken from the internet.</strong>


### Q2. Given:
```
function func(cont, cMatch) {
    for (var i = 0; i < cont.length; ++i) {
      if (cMatch(cont[i], i)) {
        cont.splice(i, 1);
      }
    }
  }
```
What is “func” trying to accomplish? Are there any problems with the function?


### Q3. Is there anything wrong with the code snipped below?
```
var ARR = ['hello', 'my', 'name', 'is', 'test'];

try {
  for (var i = 0; i <= ARR.length; ++i) {
    (function () {
      setTimeout(function () {
        if (!ARR[i]) throw Error('Empty word!');
        console.log(ARR[i]);
      }, i * 10);
    })();
  }
} catch (e) {
  console.log('Error: ' + e);
}