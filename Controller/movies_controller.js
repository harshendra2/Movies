const { ObjectId } = require('mongodb');
const Movies = require('../Models/Movies_Models');
const Actors = require('../Models/Actors_Models');
const Genres = require('../Models/Genres_Models');
const Directors = require('../Models/Directors_Models');

exports.GetAllMovies = async (req, res) => {
  try {
    const moviesCollection = await Movies();

    const data = await moviesCollection.aggregate([
      {
        $addFields: {
          actors_id: { $toObjectId: "$actors_id" },
          genres_id: { $toObjectId: "$genres_id" },
          director_id: { $toObjectId: "$director_id" }
        }
      },
      {
        $lookup: {
          from: 'actors',
          localField: 'actors_id',
          foreignField: '_id',
          as: 'Actors'
        }
      },
      {
        $lookup: {
          from: 'genres',
          localField: 'genres_id',
          foreignField: '_id',
          as: 'Genres'
        }
      },
      {
        $lookup: {
          from: 'director',
          localField: 'director_id',
          foreignField: '_id',
          as: 'Directors'
        }
      },
      {
        $project: {
          title: 1,
          description: 1,
          rating: 1,
          image: 1,
          Actors: {
            _id: 1,
            actor: 1
          },
          Genres: {
            _id: 1,
            genres: 1
          },
          Directors: {
            _id: 1,
            director: 1
          }
        }
      }
    ]).toArray();

    if (data.length > 0) {
      const filteredData = data.map(item => ({
        ...item,
        Actors: Array.isArray(item.Actors) ? item.Actors.map(actor => ({ id: actor._id, name: actor.actor })) : [],
        Genres: Array.isArray(item.Genres) ? item.Genres.map(genre => ({ id: genre._id, name: genre.genres })) : [],
        Directors: Array.isArray(item.Directors) ? item.Directors.map(director => ({ id: director._id, name: director.director })) : []
      }));

      return res.status(200).json(filteredData);
    } else {
      return res.status(404).json({ error: "No movies found" });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.AddNewMovie = async (req, res) => {
  const { title, description, rating, actor_id, director_id, genres_id } = req.body;
  try {
    const MovieCollection = await Movies();
    const newMovie = {
      title,
      description,
      rating,
      actors_id: new ObjectId(actor_id),
      director_id: new ObjectId(director_id),
      genres_id: new ObjectId(genres_id), 
      image: req.file ? req.file.filename : null
    };
    const data = await MovieCollection.insertOne(newMovie);
    if (data) {
      return res.status(200).json({ message: "Movie Added Successfully" });
    } else {
      return res.status(400).json({ error: "Something went wrong" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.CreateGenres = async (req, res) => {
  const { genres } = req.body;
  try {
    const genresCollection = await Genres();
    const data = await genresCollection.insertOne({ genres });
    if (data) {
      return res.status(200).json({ message: "Genres Created" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.CreateDirectors = async (req, res) => {
  const { director } = req.body;
  try {
    const directorsCollection = await Directors();
    const data = await directorsCollection.insertOne({ director });
    if (data) {
      return res.status(200).json({ message: "Director Created" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.CreateActors = async (req, res) => {
  const { actor } = req.body;
  try {
    const actorsCollection = await Actors();
    const data = await actorsCollection.insertOne({ actor });
    if (data) {
      return res.status(200).json({ message: "Actor Created" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
