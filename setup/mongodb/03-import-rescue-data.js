conn = Mongo();
db = conn.getDB('fur');

db.rescues.insertMany(
    [{
        "_id": ObjectId("635bd1d64cf081c002acb373"),
        "name": "Austin Rescue",
        "description": "A pet rescue located in Austin Tx",
        "address": {
            "address_one": "",
            "address_two": "",
            "city": "",
            "state": "",
            "zip_code": "78717"
        },
        "logo": "",
        "picture": "",
        "admin_email": "admin1@test.com",
        "location": {
            "type": "Point",
            "coordinates": [
                -97.77345251568441,
                30.493687392395437
            ]
        }
    }, {
        "_id": ObjectId("635bd21d4cf081c002acb374"),
        "name": "Palm Rescue",
        "description": "A pet rescue located in Palm Desert CA",
        "address": {
            "address_one": "",
            "address_two": "",
            "city": "",
            "state": "",
            "zip_code": "92211"
        },
        "logo": "",
        "picture": "",
        "admin_email": "admin2@test.com",
        "location": {
            "type": "Point",
            "coordinates": [
                -116.37382015396226,
                33.78505635830189
            ]
        }
    }]
)