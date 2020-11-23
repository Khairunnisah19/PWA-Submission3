// Ambil nilai query parameter (?id=)
let urlParams = new URLSearchParams(window.location.search);
let idParam = urlParams.get("id");

const api_token = "3ded6212f5134415990060de48934677";
const base_url = 'https://api.football-data.org/v2/';
const leagues = 'https://api.football-data.org/v2/competitions?plan=TIER_ONE&areas=2077';
const standings = 'https://api.football-data.org/v2/competitions/${idParam}/standings';
const matches = 'https://api.football-data.org/v2/competitions/2021/matches?status=SCHEDULED';
const scorers = '${base_url}competitions/${idParam}/scorers';
const teams = 'https://api.football-data.org/v2/teams/2021';
let url = "";

const fetchApi = function(url) {
    return fetch(url, {
        headers: {
            'X-Auth-Token': api_token
        }
    })
};

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

function getLeagues() {
  if ("caches" in window) {
    caches.match(leagues,{
        headers: {
          'X-Auth-Token': api_token
        },
    })
    .then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var articlesHTML = "";
          data.competitions.forEach(function(competitions) {
            articlesHTML += `
                  <div class="card">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${competitions.area.ensignUrl}" />
                      </div>
                    <div class="card-content">
                      <span class="card-title truncate">${competitions.area.name}</span>
                      <p>${competitions.name}</p>
                    </div>
                  </div>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("home2").innerHTML = articlesHTML;
        });
      }
    });
  }

  fetch(leagues, {
    headers: {
      'X-Auth-Token': api_token
    },
    })
    .then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var articlesHTML = "";
          data.competitions.forEach(function(competitions) {
            articlesHTML += `
                  <div class="card">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${competitions.area.ensignUrl}" />
                      </div>
                    <div class="card-content">
                      <span class="card-title truncate">${competitions.area.name}</span>
                      <p>${competitions.name}</p>
                    </div>
                  </div>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("home2").innerHTML = articlesHTML;
        });
      }
    })
    .catch(error);
}

function getMatch() {
  if ("caches" in window) {
    caches.match(teams,{
        headers: {
          'X-Auth-Token': api_token
        },
    })
    .then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var home2HTML = "";
          data.activeCompetitions.forEach(function(competition) {
            home2HTML += `
                  <div class="card">
                    <a href="./competitions.html?id=${competition.id}">
                      <div class="card-content">
                        <span class="card-title truncate">${competition.area.name}</span>
                        <p>${competition.name}</p>
                      </div>
                    </a>
                  </div>`;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("articles").innerHTML = home2HTML;
        });
      }
    });
  }

  fetch(teams, {
    headers: {
      'X-Auth-Token': api_token
    },
  })
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      var home2HTML = "";
      data.activeCompetitions.forEach(function(competition) {
        home2HTML += `
                <div class="card">
                  <a href="./competitions.html?id=${competition.id}">
                    <div class="card-content">
                      <span class="card-title truncate">${competition.area.name}</span>
                      <p>${competition.name}</p>
                    </div>
                  </a>
                </div>`;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("articles").innerHTML = home2HTML;
    })
    .catch(error);
}


function getMatchById() {
    return new Promise(function(resolve, reject) {
      // Ambil nilai query parameter (?id=)
      var urlParams = new URLSearchParams(window.location.search);
      var idParam = urlParams.get("id");
  
      if ("caches" in window) {
        caches.match(base_url + "competitions.html?id=/" + idParam,{
        headers: {
          'X-Auth-Token': api_token
        },
      }).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            var homeHTML = '';
            data.activeCompetitions.forEach(function(competition) {
              if(competition.id == idParam){
                    homeHTML += `
                    <div class="card">
                    <div class="card-content">
                      <span class="card-title truncate">${competition.area.name}</span>
                      <p>${competition.name}</p>
                      <p>${competition.code}</p>
                      <p>${competition.plan}</p>
                    </div>
                </div>`;
              }
          });



            /*if(data.activeCompetitions[0].id == idParam){
              var homeHTML = `
              <div class="card">
                  <div class="card-content">
                    <span class="card-title truncate">${data.activeCompetitions[0].area.name}</span>
                    <p>${data.activeCompetitions[0].name}</p>
                    <p>${data.activeCompetitions[0].code}</p>
                    <p>${data.activeCompetitions[0].plan}</p>
                  </div>
              </div>`;
            }else{
              var homeHTML = `
              <div class="card">
                  <div class="card-content">
                    <span class="card-title truncate">${data.activeCompetitions[1].area.name}</span>
                    <p>${data.activeCompetitions[1].name}</p>
                    <p>${data.activeCompetitions[1].code}</p>
                    <p>${data.activeCompetitions[1].plan}</p>
                  </div>
              </div>`;
            }*/
            document.getElementById("body-content").innerHTML = homeHTML;
          });
        }
        });
      }
  
      fetch(teams, {
        headers: {
          'X-Auth-Token': api_token
        },
      })
        .then(status)
        .then(json)
        .then(function(data) {
          // Objek JavaScript dari response.json() masuk lewat variabel data.
          // Menyusun komponen card artikel secara dinamis
          //data.activeCompetitions.forEach(function(competition) {
            var homeHTML = '';
            data.activeCompetitions.forEach(function(competition) {
              if(competition.id == idParam){
                    homeHTML += `
                    <div class="card">
                    <div class="card-content">
                      <span class="card-title truncate">${competition.area.name}</span>
                      <p>${competition.name}</p>
                      <p>${competition.code}</p>
                      <p>${competition.plan}</p>
                    </div>
                </div>`;
              }
            });
          //});
          document.getElementById("body-content").innerHTML = homeHTML;
          // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
          resolve(data);
        });
    });
}

function getSavedMatch() {
  getAll().then(function(competitions) {
    var articleHTML = '';
    competitions.forEach(function(data) {
       articleHTML += `
        <div class="card">
        <a href="./competitions.html?id=${data.id}&saved=true">
            <div class="card-content">
              <span class="card-title truncate">${data.area.name}</span>
              <p>${data.name}</p>
            </div>
        </a>    
        </div>
    `;
    /*
    <div class="card">
          <a href="./competitions.html?id=${data.id}&saved=true">
            <div class="card-content">
              <span class="card-title truncate">${data.area.name}</span>
              <p>${data.name}</p>
            </div>
          </a>
        </div>
    */
    });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = articleHTML;
    
  });
}

function getSavedMatchById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  idParam = parseInt(idParam);

  getById(idParam).then(function(data) {
    articleHTML = '';
    var articleHTML = `
    <div class="card">
        <div class="card-content">
          <span class="card-title truncate">${data.area.name}</span>
          <p>${data.name}</p>
          <p>${data.code}</p>
          <p>${data.plan}</p>
        </div>
    </div>
  `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = articleHTML;
  });
}
