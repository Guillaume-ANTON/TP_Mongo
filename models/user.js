// ANTON Guillaume B3C

const mongo = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'


mongo.connect(url,  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err, client) => {
  if(err) {
    console.error(err)
    return
  }


  const db = client.db('mongodb')
  const restaurants = db.collection('collection_mongo')

  // Retourner un restaurant avec un Id

  getRestaurantWithId = async (userId) => {
    const restoid = await restaurants.findOne({'name': userId})
    console.log(restoid)
  }

  //Retourner 10 restaurants 

  get10Restaurant = async () => {
    const resto10 = await restaurants.find({}).limit(10)
    console.log(resto10)
  }

  // Retourner tout les restaurants

  getAllRestaurant = async () => {
    const restoall = await restaurants.find({})
    console.log(restoall)
  }

  // Suppression restaurants
  
  getRestaurantRemove = async (userId) => {
    const restoRemove = await restaurants.remove({'name': userId})
    console.log(restoRemove)
  }

  // Insertion restaurants

  getInsertRestaurant = async () => {
    const restoInsert = await restaurants.insertOne({
      "address": {
         "building": "12",
         "coord": [ -0.0069, 200.1234 ],
         "street": "Allé de la source",
         "zipcode": "33320"
      },
      "borough": "Taillan Médoc",
      "cuisine": "Hamburger",
      "grades": [
         { "date": { "date": 1393804800000 }, "grade": "A", "score": 9 },
         { "date": { "date": 1378857600000 }, "grade": "C", "score": 1 },
         { "date": { "date": 1358985600000 }, "grade": "A", "score": 8 },
         { "date": { "date": 1322006400000 }, "grade": "B", "score": 5 },
      ],
      "name": "Kfc",
      "restaurant_id": "002"
    })
    console.log(restoInsert)
  }

  // Modifier un restaurant

  getUpdateRestaurant = async (userId) => {
    const restoUpdate = await restaurants.update({ name : userId},
    {
  $addToSet: {
          grades: {
              $each : [{
                  grade : "X",
                  score : 18
              },
              {
                  grade : "Z",
                  score: 22
              }]
          }
      }
  }, { upsert: true })
    console.log(restoUpdate)
  }

  getRestaurantWithId("Kfc")
  get10Restaurant()
  getAllRestaurant()
  getRestaurantRemove("Kfc")
  getInsertRestaurant()
  getUpdateRestaurant("Kfc")
})