conn = Mongo();
db = conn.getDB("fur");

db.accounts.insertMany(
    [{
        "_id": {
            "$oid": "635bcb9c4cf081c002acb366"
        },
        "email": "admin1@test.com",
        "password": "$2b$12$0kTdyyxFS2z/1ajcTq/wj.48f6KSpu71SclUiPU9EQOb0cgbiL7QK",
        "address": {
            "address_one": "",
            "address_two": "",
            "city": "",
            "state": "",
            "zip_code": "78717"
        },
        "roles": [
            "base",
            "admin",
            "staff"
        ],
        "location": {
            "type": "Point",
            "coordinates": [
                -97.77345251568441,
                30.493687392395437
            ]
        },
        "rescue_id": "635bd1d64cf081c002acb373",
        "about_me": null,
        "first_name": "admin1",
        "last_name": "Austin",
        "picture": "https://images.lifestyleasia.com/wp-content/uploads/sites/7/2021/03/09094056/137050737_411742716747464_7113369430332059484_n-900x900.jpg"
    }, {
        "_id": {
            "$oid": "635bcbd14cf081c002acb368"
        },
        "email": "staff1@test.com",
        "password": "$2b$12$pZ5aJtF/Vy2TZT0kjaYcMuU.jR7vG/6Xq/V0antyXvpThZ95Wuvne",
        "address": {
            "address_one": "",
            "address_two": "",
            "city": "Austin",
            "state": "TX",
            "zip_code": "78717"
        },
        "roles": [
            "base"
        ],
        "location": {
            "type": "Point",
            "coordinates": [
                -97.7436995,
                30.2711286
            ]
        },
        "about_me": "Hi, Im Staff1 for test!",
        "first_name": "Staff1",
        "last_name": "Test",
        "picture": "https://media.istockphoto.com/photos/millennial-male-team-leader-organize-virtual-workshop-with-employees-picture-id1300972574?b=1&k=20&m=1300972574&s=170667a&w=0&h=2nBGC7tr0kWIU8zRQ3dMg-C5JLo9H2sNUuDjQ5mlYfo="
    }, {
        "_id": {
            "$oid": "635bd0d54cf081c002acb36b"
        },
        "email": "base1@test.com",
        "password": "$2b$12$PYUYv810fZoano8uvdIMFuB6y3Iw6LOg9d7wfm.w8Iipp1dJ.bY8q",
        "address": {
            "address_one": "",
            "address_two": "",
            "city": "Austin",
            "state": "TX",
            "zip_code": "78717"
        },
        "roles": [
            "base"
        ],
        "location": {
            "type": "Point",
            "coordinates": [
                -97.7436995,
                30.2711286
            ]
        },
        "about_me": null,
        "first_name": "Base1",
        "last_name": "Test",
        "picture": "https://media.istockphoto.com/photos/headshot-portrait-of-smiling-male-employee-in-office-picture-id1309328823?b=1&k=20&m=1309328823&s=170667a&w=0&h=a-f8vR5TDFnkMY5poQXfQhDSnK1iImIfgVTVpFZi_KU="
    }, {
        "_id": {
            "$oid": "635bd12f4cf081c002acb36d"
        },
        "email": "admin2@test.com",
        "password": "$2b$12$OMdCMUlLYZ/ZtVALWfVf8upo0izj8KDmyMCKCqlI0JjOFWhojnZgS",
        "address": {
            "address_one": "",
            "address_two": "",
            "city": "Palm Desert",
            "state": "CA",
            "zip_code": "92211"
        },
        "roles": [
            "base",
            "admin",
            "staff"
        ],
        "location": {
            "type": "Point",
            "coordinates": [
                -116.382571,
                33.7288179
            ]
        },
        "rescue_id": "635bd21d4cf081c002acb374",
        "about_me": "Hi, this is the Admin2 for Test!",
        "first_name": "Admin2",
        "last_name": "Test",
        "picture": "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/lionel-animals-to-follow-on-instagram-1568319926.jpg?crop=0.922xw:0.738xh;0.0555xw,0.142xh&resize=640:*"
    }, {
        "_id": {
            "$oid": "635bd1614cf081c002acb36f"
        },
        "email": "staff2@test.com",
        "password": "$2b$12$APO2yCy/W1PnABYodn.YfuI9JYCm3nqQTdK6JSlMWeLyPfoTqqF3C",
        "address": {
            "address_one": "",
            "address_two": "",
            "city": "Palm Desert",
            "state": "CA",
            "zip_code": "92211"
        },
        "roles": [
            "base",
            "staff"
        ],
        "location": {
            "type": "Point",
            "coordinates": [
                -116.382571,
                33.7288179
            ]
        },
        "about_me": "Hi, This is Staff2 for Test!",
        "first_name": "Staff2",
        "last_name": "Test",
        "picture": "https://play-lh.googleusercontent.com/f-ASZPJUJhZNw6SKYnF54_RoZa-1LmVXMW33zkJ2WP54_nCt5E3-XLOmZO8vx58KhBpL",
        "rescue_id": "635bd21d4cf081c002acb374"
    }, {
        "_id": {
            "$oid": "635bd1774cf081c002acb371"
        },
        "email": "base2@test.com",
        "password": "$2b$12$WshUVRsVOvNvLV5nyftm7updX6Jh1QYGfEBrEw9pjKpbVPOk0kXzi",
        "address": {
            "address_one": "",
            "address_two": "",
            "city": "Palm Desert",
            "state": "CA",
            "zip_code": "92211"
        },
        "roles": [
            "base"
        ],
        "location": {
            "type": "Point",
            "coordinates": [
                -116.382571,
                33.7288179
            ]
        },
        "about_me": "Hi Im Base2 For Test",
        "first_name": "Base2",
        "last_name": "Test",
        "picture": "https://assets-global.website-files.com/5ec7dad2e6f6295a9e2a23dd/60d598d1fd5b43c13ee465ea_Amy_Sept.png"
    }]
)