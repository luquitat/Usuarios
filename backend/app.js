const express = require('express');
const app = express();

const cors = require('cors')

app.use(express.json());
app.use(cors())

const usuarios = [
	{id:1, name:'Lucas', lastname:'Micheli', age: 28, birthDate:'03/01/1994', joke:'UDP is better in the COVID era since it avoids unnecessary handshakes.'},
	{id:2, name:'Ramiro', lastname:'Reynoso', age: 40, birthDate:'02/06/1882', joke:'I have a fish that can breakdance! Only for 20 seconds though, and only once.'},
	{id:3, name:'Juan', lastname:'Barsola', age: 24, birthDate:'10/03/1998', joke:'I visited my friend at his new house. He told me to make myself at home. So I threw him out. I hate having visitors.'}
];



app.get('/api/usuarios', (req, res) => {
	console.log(`Buscando todos los usuarios`)
	res.send(usuarios);
});

app.get('/api/usuario/:id', (req, res) => {
	console.log(`Buscando el usuario con id ${req.params.id}`)
	let usuario = usuarios.find(u => u.id === parseInt(req.params.id))
	if (!usuario) {
		console.log(`El usuario con id ${req.params.id} no fue encontrado`)
		res.status(404).send('El usuario no fue encontrado')
	}
	console.log(`El usuario buscado es ${usuario.name}`)
	res.send(usuario);
});

app.post('/api/usuarios', (req, res) => {
	let id = usuarios.length + 1
	const usuario = {
		id: id,
		name: req.body.name,
		lastname: req.body.lastname,
		age: req.body.age,
		birthDate: req.body.birthDate,
		joke: req.body.joke
	}
	usuarios.push(usuario);
	console.log(`Se creó el usuario ${usuario.name}`)
	res.send(usuario)
});

app.post('/api/usuario/:id', (req, res) => {

	let usuario = usuarios.find(u => u.id === parseInt(req.params.id))
	console.log(`Editando el usuario ${usuario.name}`)
	if (!usuario) res.status(404).send('El usuario no fue encontrado')
		
	usuario.name = req.body.name;
	usuario.lastname = req.body.lastname;
	usuario.age = req.body.age;
	usuario.birthDate = req.body.birthDate;
	usuario.joke = req.body.joke;

	res.send(usuario);
});

app.delete('/api/usuarios/:id', (req, res) => {
	let usuario = usuarios.find(u => u.id === parseInt(req.params.id))
	if (!usuario) {
		res.status(404).send('El usuario no fue encontrado');
		return;
	}
	const index = usuarios.indexOf(usuario);
	usuarios.splice(index, 1)
	
	res.send(usuario);
});


const port = process.env.PORT 

app.listen(port, ()=>{
	console.log(`escuchando en el puerto ${port}`);
})