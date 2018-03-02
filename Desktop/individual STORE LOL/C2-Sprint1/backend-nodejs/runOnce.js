var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/Store-Database";




MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Store-Database");  

  var ProductsObj = [
    {id: 1, name: 'p1',price: 100,seller:'mohamed hesham'},
    {id: 2, name: 'p2',price: 200,seller:'mohamed hesham'},
    {id: 3, name: 'p3',price: 300,seller:'mohamed hesham'},
    {id: 4, name: 'p4',price: 400,seller:'mohamed hesham'},
    {id: 5, name: 'p5',price: 500,seller:'mohamed hesham'},

  ];

  

  var usersObj = [
    { username: '1', password: '1',type:'user'},
    { username: '2', password: '2',type:'admin'},
    { username: 'user', password: 'user',type:'user'},
    { username: 'admin', password: 'admin',type:'admin'},
    { username: 'manager', password: 'manager',type:'manager'}
  ];

  var collectionsObj = [
    {name: 'Products', data: ProductsObj},
    {name: 'Users', data: usersObj},
  ];

  for (var i = 0; i < collectionsObj.length; i++){
    if(collectionsObj[i].data == null){
      dbo.createCollection(collectionsObj[i].name , function(err, res){
        if(err) throw err;
        done = true;
      });
    } else {
      dbo.collection(collectionsObj[i].name).insertMany(collectionsObj[i].data,function(err,res) {
        if(err) throw err;
        done = true;
      });
    }
    console.log("Collection: "+collectionsObj[i].name+" created !");
  }
  console.log("Press Control C");
}); 