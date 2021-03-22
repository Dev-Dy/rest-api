const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json())

const courses = [
    {
        'id' : 1,
        'name' : 'Python'
    },
    {
        'id' : 2,
        'name' : 'JavaScript'
    },
    {
        'id' : 3,
        'name' : 'Java'
    }
]
app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(s => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('Not found')
    res.send(course);
})

app.post('/api/courses', (req,res) =>{
    //validation of api
    const result = validateCourse(req.body)
    const { error } = validateCourse(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id : courses.length + 1,
        name : req.body.name
    };

    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    //look up the course
    //if not found, error = 400
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(400).send('Not found')
    //validate
    const result = validateCourse(req.body);
    //if invalid, return 400 - Bad request
    if (result.error) return res.status(400).send(result.error.details[0].message);
    
    course.name = req.body.name;
    res.send(course)
});

app.get('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(400).send('Not found')
    //Delete
    const index = courses.indexOf(course)
    courses.splice(index, 1);
    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name : Joi.string().min(3).required()
    };
    
    return Joi.validate(req.body, schema);
}

// Adding Port
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on ${port}`))