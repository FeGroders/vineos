const express = require('express');
const cors = require('cors');
const app = express();
let path = require('path');
const multer = require('multer');
require('dotenv').config();
var buffer = require('buffer').Buffer;
const upload = multer({ dest: 'public/images/' });
const PORT = 3000;

const Client = require('pg').Client;
let cliente = new Client({
	user: process.env.DB_USERNAME,
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
	port: process.env.DB_PORT,
	password: process.env.DB_PASSWORD, 

	ssl: {
        rejectUnauthorized: false,
    }
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
	cliente.query(
		`select * from usuarios where email = '${req.body.email}' and senha = '${req.body.password}' and admin = true;`,
		(err, result) => {
			if (err) {
				res.status(500).send(err.message);
			} else {
				if (result.rows.length > 0) {
					res.sendFile('./pages/admin.html', { root: path.join(__dirname, '/') });
				} else {
					res.status(404).sendFile('./pages/login.html', { root: path.join(__dirname, '/') });
				}
			}
		}
	);
})

app.get('/vinhos', (req, res) => {
	let results = [];
	cliente.query('select * from vinhos where disponivel = true', (err, resp) => {
		resp.rows.forEach((element) => {
			let imagem = element.imagem;
			let imagemBuffer = buffer.from(imagem, 'base64').toString('ascii');

			results.push({
				id: element.id,
				nome: element.nome,
				descricao: element.descricao,
				ano: element.ano,
				preco: element.preco,
				imagem: imagemBuffer,
			});
		});
		res.json(results);
	});
});

app.post('/insertVinho', upload.single('imagem'), (req, res) => {
	console.log('buffer', req.file.buffer);
	// console.log('conv', buffer.from(req.file.path).toString('base64'))
	cliente.query(
		`insert into vinhos values(default,'${req.body.nome}','${req.body.descricao}','${req.body.ano}', '${req.body.preco}', '${buffer.from(req.file.path).toString('base64')}', '${req.body.disponivel}');`,
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
