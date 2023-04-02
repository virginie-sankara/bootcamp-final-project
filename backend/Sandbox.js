// const formData1 = {
//   length: ["30 - 60", "60 - 90"],
//   genre: ["comedy", "horror", "documentary"],
// };

// const formData2 = {
//   length: ["30 - 60", "60 - 90"],
//   genre: ["comedy", "horror"],
// };

// const formData3 = {
//   length: formData1.length.filter((val) => formData2.length.includes(val)),
//   genre: formData1.genre.concat(formData2.genre),
// };

// console.log(formData3.genre);

// Test TBDB API REQUEST
// https://api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate

// ALL ENGLISH GENRE
// TO_DO : Assign ids to genre.name in FE corresponding to the following ids :
// const genres = [
//   { id: 28, name: "Action" },
//   { id: 12, name: "Adventure" },
//   { id: 16, name: "Animation" },
//   { id: 35, name: "Comedy" },
//   { id: 80, name: "Crime" },
//   { id: 99, name: "Documentary" },
//   { id: 18, name: "Drama" },
//   { id: 10751, name: "Family" },
//   { id: 14, name: "Fantasy" },
//   { id: 36, name: "History" },
//   { id: 27, name: "Horror" },
//   { id: 10402, name: "Music" },
//   { id: 9648, name: "Mystery" },
//   { id: 10749, name: "Romance" },
//   { id: 878, name: "Science Fiction" },
//   { id: 10770, name: "TV Movie" },
//   { id: 53, name: "Thriller" },
//   { id: 10752, name: "War" },
//   { id: 37, name: "Western" },
// ];

// const genreNames = genres.map((genre) => genre.name);

// console.log(genreNames);

// [
//   "Action",
//   "Adventure",
//   "Animation",
//   "Comedy",
//   "Crime",
//   "Documentary",
//   "Drama",
//   "Family",
//   "Fantasy",
//   "History",
//   "Horror",
//   "Music",
//   "Mystery",
//   "Romance",
//   "Science Fiction",
//   "TV Movie",
//   "Thriller",
//   "War",
//   "Western",
// ];

// if matchToUpdate.type === tvshow
// TO_DO : Assign ids to genre.name in FE corresponding to the following ids :
// const tvgenres = [
//   { id: 10759, name: "Action & Adventure" },
//   { id: 16, name: "Animation" },
//   { id: 35, name: "Comedy" },
//   { id: 80, name: "Crime" },
//   { id: 99, name: "Documentary" },
//   { id: 18, name: "Drama" },
//   { id: 10751, name: "Family" },
//   { id: 10762, name: "Kids" },
//   { id: 9648, name: "Mystery" },
//   { id: 10763, name: "News" },
//   { id: 10764, name: "Reality" },
//   { id: 10765, name: "Sci-Fi & Fantasy" },
//   { id: 10766, name: "Soap" },
//   { id: 10767, name: "Talk" },
//   { id: 10768, name: "War & Politics" },
//   { id: 37, name: "Western" },
// ];
