conn = Mongo();
db = conn.getDB("fur");
db.rescues.createIndex({ location: "2dsphere" });
db.accounts.createIndex({ location: "2dsphere" });
