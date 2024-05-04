//express
const express = require('express');
const app = express();
const PORT = 3001; // puede cambiar
// mis datos

let Quiensoy=[
    { nombre: 'Zacarias Gomez Cristobal', Profesion: 'Tecnico Superior en Sistemas Informaticos'},
] ;
//array 
let librosBiblicos = [
    {id: 1 , nombre: 'Genesis', autor: 'Moises', anioPublicacion: 2020},
    {id: 2 , nombre: 'Juan', autor: 'Moises', anioPublicacion: 2024},
    {id: 3 , nombre: 'Exodo', autor: 'Juan', anioPublicacion: 1990},
    {id: 4 , nombre: 'Levitico', autor: 'Jose', anioPublicacion: 1980},
    {id: 5 , nombre: 'Nehemias', autor: 'Juan', anioPublicacion: 1995},
    {id: 6 , nombre: 'Zacarias', autor: 'Pedro', anioPublicacion: 1950},
    {id: 7 , nombre: 'Exodo', autor: 'pedro', anioPublicacion: 1990},
];
//manejo de JSON
app.use(express.json());

// Endpoint 1  Obtener un endpoint de bienvenida con su nombre y su profesion actual
app.get('/presentacion', (req, res) =>{
res.json(Quiensoy);
});
// endpoint 2 obtener libro por autor
app.get ('/Autor/:autor',(req, res)=> {
    const autorCapturado = req.params.autor;
    console.log(autorCapturado);
    const autorEncontrado = librosBiblicos.filter((libro)=> libro.autor === autorCapturado );
    if(autorEncontrado){
        res.json(autorEncontrado);
    } else {
        res.status(404).json({mensaje : 'Autor no encontrado'});
    }
    });
// endpoint 3 Obtener la cantidad total de libros
app.get('/Cantidad', (req, res) => {
    const CantidadLibros = librosBiblicos.length;
    if (CantidadLibros > 0) {
        res.json({ 'La cantidad total de los libros es' : CantidadLibros });
    } else {
        res.status(404).json({ mensaje: 'No hay libros' });
    }
});

// endpoint 4  Obtener libros por nombre que contenga el texto "Juan"
app.get('/nombre/:nombre', (req, res) => {
    const nombreEncontrado = req.params.nombre;
    const librosFiltrados = librosBiblicos.filter(libro => libro.nombre.includes(nombreEncontrado));
    if (librosFiltrados.length > 0) {
        res.json(librosFiltrados);
    } else {
        res.status(404).json({ mensaje: 'juan como busqueda especifica'});
    }
});

// endpoint 5  Ordenar libros por nombre
app.get('/libros', (req, res) => {
    res.json(librosBiblicos);
});
librosBiblicos.sort((a, b) => {
    const nombreA = a.nombre.toLowerCase();
    const nombreB = b.nombre.toLowerCase();
    
    if (nombreA < nombreB) {
        return -1;
    }
    if (nombreA > nombreB) {
        return 1;
    }
    return 0;
});

console.log(librosBiblicos);

    app.listen(PORT, () => {
        console.log("Servidor corriendo en el puerto http://localhost:" + PORT);
    });