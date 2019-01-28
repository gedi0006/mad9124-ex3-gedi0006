const cars = require('./cars.js')
const express = require('express')
const app = express()

app.use(express.json())

app.get('/api/cars', (req, res) => res.send({
    data: cars
}))


app.get('/api/cars/:carId', (req, res) => {
    const car = cars.find(car => car.id === parseInt(req.params.carId))
    res.send({
        data: car
    })
})

app.post('/api/cars', (req, res) => {
    const {
        make,
        model,
        colour
    } = req.body
    const newCar = {
        id: Date.now(),
        make,
        model,
        colour
    }
    cars.push(newCar)
    res.status(201).send({
        data: newCar
    })
})

app.put('/api/cars/:carId', (req, res) => {
    const carId = parseInt(req.params.carId)
    const index = cars.findIndex(car => car.id === carId)
    if (index < 0) {
        res.status(404).send({
            errors: [
                {
                    status: 'Not found',
                    code: '404',
                    title: 'Resource does not exist',
                    description: `We could not find a car with id: ${carId}`
        }
      ]
        })
    } else {
        const {
            make,
            model,
            colour
        } = req.body
        const updatedCar = {
            carId,
            make,
            model,
            colour
        }
        cars[index] = updatedCar
        res.send({
            data: updatedCar
        })
    }
})

app.delete('/api/cars/:id', (req, res) => {})

const port = process.env.port || 3030

app.listen(port, () => console.log(`server listening on port ${port} ... `))
