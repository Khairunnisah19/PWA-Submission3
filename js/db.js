var dbPromised = idb.open("football-info", 1, function(upgradeDb) {
  var articlesObjectStore = upgradeDb.createObjectStore("competitions", {
    keyPath: "id"
  });
  articlesObjectStore.createIndex("name", "name", {
    unique: false
  });
});

function saveForLater(article, id) {
  dbPromised
    .then(function(db) {
      console.log('sdsd' + article.activeCompetitions);
      var tx = db.transaction("competitions", "readwrite");
      var store = tx.objectStore("competitions");
      store.add(article.activeCompetitions[id]);
      return tx.complete;
    })
    .then(function() {
      console.log("Data competition berhasil di simpan.");
    }).catch(function() {
      console.log('Buku gagal disimpan.')
  });
}

function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("competitions", "readonly");
        var store = tx.objectStore("competitions");
        return store.getAll();
      })
      .then(function(competitions) {
        resolve(competitions);
      });
  });
}


function getById(id) {
  id = parseInt(id);
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("competitions", "readonly");
        var store = tx.objectStore("competitions");
        return store.get(id);
      })
      .then(function(article) {
        resolve(article);
      });
  });
}

function deleteById(id){
  id = parseInt(id);
  return new Promise(function(resolve, reject) {
    dbPromised
    .then(function(db) {
      var tx = db.transaction('competitions', 'readwrite');
      var store = tx.objectStore('competitions');
      store.delete(id);
      return tx.complete;
    }).then(function(article) {
      console.log('Item deleted');
      resolve(article);
    });
  });
}
