conn = Mongo();
db = conn.getDB('fur');

db.stories.insertMany(
    [{
        "_id": ObjectId("635bde494cf081c002acb391"),
        "title": "I like my pet",
        "story": "https://media.istockphoto.com/photos/headshot-portrait-of-smiling-male-employee-in-office-picture-id1309328823?b=1&k=20&m=1309328823&s=170667a&w=0&h=a-f8vR5TDFnkMY5poQXfQhDSnK1iImIfgVTVpFZi_KU=",
        "picture": "635bd0d54cf081c002acb36b/1ef45aacecbd6f55abed8f7bb58a08f62526b812.jpeg",
        "status": "Approved",
        "application_id": "635bdcb94cf081c002acb38c",
        "pet_id": "635bd3084cf081c002acb376",
        "rescue_id": "635bd1d64cf081c002acb373",
        "account_id": "635bd0d54cf081c002acb36b"
    }, {
        "_id": ObjectId("635bde734cf081c002acb392"),
        "title": "sotry two",
        "story": "here is the story ...",
        "picture": "635bd0d54cf081c002acb36b/8f3db8b4652b6c2ff11e780478dcaf51.jpeg",
        "status": "Approved",
        "application_id": "635bdd804cf081c002acb38e",
        "pet_id": "635bdafb4cf081c002acb384",
        "rescue_id": "635bd1d64cf081c002acb373",
        "account_id": "635bd0d54cf081c002acb36b"
    }, {
        "_id": ObjectId("635be1214cf081c002acb39b"),
        "title": "My Story",
        "story": "If you're visiting this page, you're likely here because you're searching for a random sentence.",
        "picture": "635bd1774cf081c002acb371/Norbio.jpeg",
        "status": "Approved",
        "application_id": "635bdfb54cf081c002acb397",
        "pet_id": "635bd6634cf081c002acb37d",
        "rescue_id": "635bd21d4cf081c002acb374",
        "account_id": "635bd1774cf081c002acb371"
    }, {
        "_id": ObjectId("635be1444cf081c002acb39c"),
        "title": "Sample Story",
        "story": "If you're visiting this page, you're likely here because you're searching for a random sentence.",
        "picture": "635bd1774cf081c002acb371/cute-dog-headshot.jpeg",
        "status": "Approved",
        "application_id": "635be0164cf081c002acb398",
        "pet_id": "635bd7264cf081c002acb381",
        "rescue_id": "635bd21d4cf081c002acb374",
        "account_id": "635bd1774cf081c002acb371"
    }]
)