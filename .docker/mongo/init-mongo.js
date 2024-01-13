db.createUser({
  user: "admin",
  pwd: "adminpassword",
  roles: [
    {
      role: "readWrite",
      db: "demodb",
    },
  ],
});
db.createCollection("test");
