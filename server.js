const express = require('express');
const cors = require('cors');
const app = express();
let path = require('path')
require('dotenv').config();
const PORT = 3000;
const Client = require('pg').Client;
let cliente = new Client({
	user: 'postgres',
	host: 'localhost',
	database: 'postgres',
	port: 5432,
	password: 'postgres', 
	});

cliente.connect();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded())
app.use(express.static(__dirname /*, {index: 'public/login.html'}) */)) 
 
app.get('/', (req, res) => {
	res.sendFile('index.html' , { root: path.join(__dirname, '/') })
});

app.post('/login', (req,res) => {

})

app.get('/insertVinho.html', (req, res) => { 
	res.sendFile('pages/insertClient.html', { root: path.join(__dirname, '/')})   
})

app.get('/vinhos', (req, res) => {
	let results = [];
	cliente.query('select * from vinhos', (err, resp) => {
		resp.rows.forEach((row) => {
			results.push(row);
		});
		res.json(results);
	});
});

app.post('/inserir', (req, res) => {
	console.log(req.body)  
	cliente.query(
		`insert into vinhos values(default,'${req.body.name}','${req.body.descricao}','${req.body.ano}', '${req.body.preco}');`,
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.redirect('/'); 
			}
		}
	);
});

app.listen(PORT, () => {
	console.log(`Running in http://localhost:${PORT}`);
});
