const express = require('express')
const { v4: uuidv4 } = require('uuid');
const app = express()
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000', // Allow only this origin
}))

let {open} = require('sqlite')
let sqlite3 = require('sqlite3')
const path = require('path');
const { request } = require('http');
app.use(express.json())
const dbpath = path.join(__dirname, 'todo.db')
let db = null
const intiallizedb = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    })
    app.listen(5000)
  } catch (e) {
    console.log(`Error: ${e.message}`)
    process.exit(1)
  }
}
intiallizedb()

app.get("/todos",async (request,response) => {
    const data="select * from todo;";
    const r=await db.all(data);
    response.send(r);
})

app.delete("/todos/:id", async (request,response) => {
    const {id}=request.params
    const delque=`delete from todo where id="${id}";`;
    await db.run(delque);
})

app.post("/todos",async (request,response) => {
    const {name}=request.body;
    if(!name){
      response.send("hgv")
    }
    const idd=uuidv4()
    const qq=`insert into todo(id,name) values("${idd}",'${name}');`;
    await db.run(qq);
})


module.exports=app