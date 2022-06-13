const express = require('express');
const app = express();

const cors = require('cors')

app.use(express.json());
app.use(cors())

const usuarios = [
	{id:1, name:'Lucas', lastname:'Micheli', age: 28, birthDate:'03/01/1994'},
	{id:2, name:'Ramiro', lastname:'Reynoso', age: 40, birthDate:'02/06/1882'},
	{id:3, name:'Juan', lastname:'Barsola', age: 24, birthDate:'10/03/1998'}
];



app.get('/api/usuarios', (req, res) => {
	res.send(usuarios);
});

app.get('/api/usuario/:id', (req, res) => {
	console.log("antes")
	let usuario = usuarios.find(u => u.id === parseInt(req.params.id))
	if (!usuario) res.status(404).send('El usuario no fue encontrado')
	console.log("Despues")

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
	}
	usuarios.push(usuario);
	res.send(usuario)
});

app.put('/api/usuario/:id', (req, res) => {
	let usuario = usuarios.find(u => u.id === parseInt(req.params.id))
	if (!usuario) res.status(404).send('El usuario no fue encontrado')
		
	usuario.name = req.body.name;
	usuario.lastname = req.body.lastname;
	usuario.age = req.body.age;
	usuario.birthDate = req.body.birthDate;
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