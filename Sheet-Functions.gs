//Create custom Google Sheets functions that return a movie statistic based on the input title
//Uses Online Movie Database from omdbapi.com
//Uses The Movie Database from developers.themoviedb.org/3

const OMDB_API_KEY = '1fba46cd'
var API_URL = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=`

function getBoxOffice(input) {
  var response = UrlFetchApp.fetch(API_URL+input); //Fetch data from OMDB API
  var data = response.getContentText(); 
  var jsonData = JSON.parse(data); //Parse from XML to JSON data

  return(jsonData.BoxOffice) //Return Box Office value
}

function getRottenTomatoes(input) {
  var data = UrlFetchApp.fetch(API_URL+input).getContentText();
  var jsonData = JSON.parse(data);

  var ratings = jsonData.Ratings //Find Ratings array (includes RT, Metacritic, etc)

  for (var i in ratings){ //Find RT score and return it
    if(ratings[i].Source == "Rotten Tomatoes"){
      return(ratings[i].Value)
    }
  }
}

const TMDB_API_KEY = "0e10336f4cee0d466dca9a17661b40f8"
function getBudget(input) {
  //FIND ID OF MOVIE
  API_URL = `https://api.themoviedb.org/3/search/movie?page=1&language=en-US&api_key=${TMDB_API_KEY}&query=`
  var data = UrlFetchApp.fetch(API_URL+input).getContentText();
  var jsonData = JSON.parse(data);
  var movie_id = jsonData.results[0].id

  //USE ID TO FIND BUDGET
  API_URL = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${TMDB_API_KEY}&language=en-US`
  data = UrlFetchApp.fetch(API_URL).getContentText();
  var jsonData = JSON.parse(data);

  return(jsonData.Budget) //Return budgets
}

