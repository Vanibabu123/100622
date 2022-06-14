import express from "express";
import { getAllUsers, getUserByUsername, createUsers, deleteUserByUsername, updateUserByUsername } from "./helper.js";
const router = express.Router();

function auth(req, res, next) {
    try {
      let token=req.headers.authorization;
      console.log(token)
        jwt.verify(token, process.env.SECRET_KEY);
        next();
      
    } catch (err) {
      res.status(401).send({error:err.message})
    }
  
  }
  
// /users
router.get("/", auth, async function (request, response) {
    //db.users.find({})
    
    // Cursor - pagination
    // toArray - Cursor -> Array
    const users = await getAllUsers();
    response.send(users);
});

router.get("/:username", async function (request, response) {
    console.log(request.params);
    // params - parameters
    const { username } = request.params;
    // db.users.findOne({username: 'vanis@gmail.com'})

    //const movie = movies.find((mv) => mv.id === id);
    //response.send(movie);
    
    const user = await getUserByUsername(username);
        
    user 
     ? response.send(username) 
     : response.status(404).send({ msg: "No such user found" });
});

// express.json() -> converting to JSON
// Inbuilt middleware

router.post("/", async function (request, response) {
    const data = request.body;
    console.log(data);
    // db.users.insertMany(data)
    const result = await createUsers(data);
    response.send(result);
});

router.delete("/:username", async function (request, response) {
    console.log(request.params);
    // params - parameters
    const { username } = request.params;
    // db.movies.deleteOne({id: '102'})
        
    const movie = await deleteMovieById(username);
        
    movie.deletedCount > 0
     ? response.send(user) 
     : response.status(404).send({ msg: "No such user found" });
});

router.put("/:username", async function (request, response) {
    const data = request.body;    
    console.log(data);
    const { username } = request.params;
    // db.movies.updateOne({id: id}, {$set: data})

    const result = await updateUserByUsername(username, data);
    response.send(result);
});

export const usersRouter = router;
