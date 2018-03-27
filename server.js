// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 7, task: 'Laundry', description: 'Wash clothes' },
  { _id: 27, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 44, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
});

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos
   */

   res.json({data: todos});

});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
   // req.body will get the input todo
   // var newtodo = req.body;
   // var todoId = req.body;
   var todoTask = req.body.task;
   var todoDesc = req.body.description;
   var lastObj = todos[todos.length - 1];
   var nextId = lastObj._id + 1;

   var newObject = {_id: nextId, task: todoTask, description: todoDesc};

   todos.push(newObject);
   res.json(newObject);


});

// let add = (anArray, objectToAdd /* {name: 'Sam'} */) => {
//   // get next id by getting last object's id and adding 1
//   var lastObj = anArray[anArray.length - 1];
//   var nextId = lastObj.id + 1;
//
//   var objectToAddWithId = {
//     id: nextId,
//     name: objectToAdd.name // 'Sam'
//   }
//
//   anArray.push(objectToAddWithId)// {id: 3, name: 'Sam'}
//
//   return anArray;
// }

app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
   var todoIds = req.params.id;
   var singleTodo = todos.find(function(todo) {
     return todo._id == todoIds;
   })
   res.json(singleTodo);
});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */

   // find id that's input /api/todos/:id
   // update req.body object with tast or description or both if it's in req.body

  var todosUpdate = todos.forEach(function(todo) {
     var todoId = req.params.id;
     if (todo._id == todoId) {
       todo.task = req.body.task;
       todo.description = req.body.description;
       res.json(todo);
       // return todo;
     }
   })


});

// let updateById = (anArray, idToUpdate, objectUpdates) => {
//   anArray.forEach(function(eachPerson) {
//     if (eachPerson.id === idToUpdate) {
//       eachPerson.name = objectUpdates.name;
//       return eachPerson;
//     }
//   });

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with success.
   */
    var todoId = req.params.id;
    todos = todos.filter(function(eachObj) {
       return todoId != eachObj._id;
     })
res.json(todos);
});

// let removeById = (anArray, idToDelete) => {
//   var remainingObjects = anArray.filter(function(eachObj) {
//     // return every object where id is not idToDelete
//     return eachObj.id !== idToDelete;
//   });
//   return remainingObjects;
// }

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
