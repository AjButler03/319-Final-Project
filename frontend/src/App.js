import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

const ItemForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:8081/addSong", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log("Song added:", result);
    } catch (error) {
      console.error("Error adding song:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3 row">
        <div className="col-sm-2">
          <label htmlFor="id" className="form-label">
            ID:
          </label>
          <input
            type="text"
            className="form-control"
            {...register("id", { required: true })}
          />
          {errors.id && <span className="text-danger">ID is required</span>}
        </div>
        <div className="col-sm-7">
          <label htmlFor="artist" className="form-label">
            Artist:
          </label>
          <input
            type="text"
            className="form-control"
            {...register("artist", { required: true })}
          />
          {errors.artist && (
            <span className="text-danger">Artist is required</span>
          )}
        </div>
        <div className="col-sm-3">
          <label htmlFor="duration" className="form-label">
            Duration:
          </label>
          <input
            type="text"
            className="form-control"
            {...register("duration", { required: true })}
          />
          {errors.duration && (
            <span className="text-danger">Song duration is required</span>
          )}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Song title:
        </label>
        <textarea
          className="form-control"
          {...register("title", { required: true })}
        ></textarea>
        {errors.title && (
          <span className="text-danger">Song title is required</span>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="lyrics" className="form-label">
          Lyrics:
        </label>
        <textarea
          className="form-control"
          {...register("lyrics", { required: false })}
        ></textarea>
        {errors.lyrics && (
          <span className="text-danger">Lyrics is required</span>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="imageUrl" className="form-label">
          Image URL:
        </label>
        <input
          type="text"
          className="form-control"
          {...register("imageUrl", { required: true })}
        />
        {errors.imageUrl && (
          <span className="text-danger">
            Image URL is required.{" "}
            <a
              href="https://bendodson.com/projects/itunes-artwork-finder/index.html"
              target="_blank"
            >
              Find album artwork here.
            </a>
          </span>
        )}
      </div>

      <div className="mb-3 row">
        <div className="col-sm-4">
          <label htmlFor="tag1" className="form-label">
            Tag 1:
          </label>
          <input
            type="text"
            className="form-control"
            {...register("tag1", { required: true })}
          />
          {errors.tag1 && (
            <span className="text-danger">A tag is required.</span>
          )}
        </div>
        <div className="col-sm-4">
          <label htmlFor="tag2" className="form-label">
            Tag 2:
          </label>
          <input
            type="text"
            className="form-control"
            {...register("tag2", { required: false })}
          />
          {errors.tag2 && <span className="text-danger">Message?</span>}
        </div>
        <div className="col-sm-4">
          <label htmlFor="tag3" className="form-label">
            Tag 3:
          </label>
          <input
            type="text"
            className="form-control"
            {...register("tag3", { requred: false })}
          />
          {errors.tag3 && <span className="text-danger">tag3</span>}
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Add Song
      </button>
    </form>
  );
};

const UpdateForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitUpdate = async (data) => {
    try {
      const id = parseInt(data.id);
      const response = await fetch(`http://localhost:8081/updateSong/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          artistName: data.artist,
          duration: data.duration,
          songTitle: data.title,
          lyrics: data.lyrics,
          imageUrl: data.imageUrl,
          tags: [data.tag1, data.tag2, data.tag3],
        }),
      });
      const result = await response.json();
      console.log("song updated:", result);
    } catch (error) {
      console.error("Error updating song:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitUpdate)}>
      <div className="mb-3 row">
        <div className="col-sm-2">
          <label htmlFor="id" className="form-label">
            ID:
          </label>
          <input
            type="text"
            className="form-control"
            {...register("id", { required: true })}
          />
          {errors.id && <span className="text-danger">ID is required</span>}
        </div>
        <div className="col-sm-7">
          <label htmlFor="artist" className="form-label">
            Updated Artist:
          </label>
          <input
            type="text"
            className="form-control"
            {...register("artist", { required: true })}
          />
          {errors.artist && (
            <span className="text-danger">Artist is required</span>
          )}
        </div>
        <div className="col-sm-3">
          <label htmlFor="duration" className="form-label">
            Updated Duration:
          </label>
          <input
            type="text"
            className="form-control"
            {...register("duration", { required: true })}
          />
          {errors.duration && (
            <span className="text-danger">Song duration is required</span>
          )}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Song title:
        </label>
        <textarea
          className="form-control"
          {...register("title", { required: true })}
        ></textarea>
        {errors.title && (
          <span className="text-danger">Song title is required</span>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="lyrics" className="form-label">
          Lyrics:
        </label>
        <textarea
          className="form-control"
          {...register("lyrics", { required: false })}
        ></textarea>
        {errors.lyrics && (
          <span className="text-danger">Lyrics is required</span>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="imageUrl" className="form-label">
          Updated Image URL:
        </label>
        <input
          type="text"
          className="form-control"
          {...register("imageUrl", { required: true })}
        />
        {errors.imageUrl && (
          <span className="text-danger">
            Image URL is required.{" "}
            <a
              href="https://bendodson.com/projects/itunes-artwork-finder/index.html"
              target="_blank"
            >
              Find album artwork here.
            </a>
          </span>
        )}
      </div>

      <div className="mb-3 row">
        <div className="col-sm-4">
          <label htmlFor="tag1" className="form-label">
            Updated Tag 1:
          </label>
          <input
            type="text"
            className="form-control"
            {...register("tag1", { required: true })}
          />
          {errors.tag1 && (
            <span className="text-danger">A tag is required.</span>
          )}
        </div>
        <div className="col-sm-4">
          <label htmlFor="tag2" className="form-label">
            Updated Tag 2:
          </label>
          <input
            type="text"
            className="form-control"
            {...register("tag2", { required: false })}
          />
          {errors.tag2 && <span className="text-danger">Message?</span>}
        </div>
        <div className="col-sm-4">
          <label htmlFor="tag3" className="form-label">
            Updated Tag 3:
          </label>
          <input
            type="text"
            className="form-control"
            {...register("tag3", { requred: false })}
          />
          {errors.tag3 && <span className="text-danger">tag3</span>}
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit Update
      </button>
    </form>
  );
};

const StudentCard = ({ name, email, date, professor, imageSrc }) => {
  return (
    <div className="col">
      <div className="card shadow-sm">
        <img
          src={imageSrc}
          alt="Your Image"
          style={{ margin: "20px", objectFit: "cover", borderRadius: "5px" }}
        />
        <div className="card-body">
          <ul>
            <li>
              <p>
                <strong>Student name:</strong> {name}
              </p>
            </li>
            <li>
              <p>
                <strong>Email:</strong> {email}
              </p>
            </li>
            <li>
              <p>
                <strong>Date:</strong> {date}
              </p>
            </li>
            <li>
              <p>
                <strong>Professor name:</strong> {professor}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const DeleteSong = () => {
  const [songId, setSongId] = useState("");

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/deleteSong/${songId}`,
        {
          method: "DELETE",
        }
      );
      const deletedSong = await response.json();
      console.log("Deleted song:", deletedSong);
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  };

  const handleChange = (event) => {
    setSongId(event.target.value);
  };

  return (
    <div className="mb-3">
      <label htmlFor="removeItemId" className="form-label">
        Remove song with ID:
      </label>
      <input
        type="text"
        className="form-control"
        id="removeItemId"
        value={songId}
        onChange={handleChange}
      />
      <button
        type="button"
        className="btn btn-danger mt-2"
        onClick={handleDelete}
      >
        Delete song
      </button>
    </div>
  );
};

const FilterBar = ({ filterSongs }) => {
  const filterTags = [
    "All",
    "Rock",
    "Country",
    "Pop",
    "Rap",
    "Folk",
    "Indie",
    "OST",
    "Classic",
  ];

  const handleClick = (tag) => {
    filterSongs(tag);
  };

  return (
    <div className="bg-white text-black">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="vr vr-blurry" />
        {filterTags.map((tag, index) => (
          <React.Fragment key={index}>
            {index !== 0 && <div className="vr vr-blurry" />}
            <button
              type="button"
              className="btn btn-outline-dark border-0 px-2 mx-1 my-1 flex-grow-1"
              onClick={() => handleClick(tag.toLowerCase())}
            >
              {tag}
            </button>
          </React.Fragment>
        ))}
        <div className="vr vr-blurry" />
      </div>

    </div>
  );
};

const App = () => {
  const [openItem, setOpenItem] = useState(null);

  const [viewer, setViewer] = useState('all');

  const toggleCollapse = (item) => {
    setOpenItem(openItem === item ? null : item);
  };

  const Genres = () => {
    const [songsByGenres, setSongsByGenres] = useState([]);

    useEffect(() => {
      const fetchSongsByGenres = async () => {
        try {
          const response = await fetch('http://localhost:8081/listSongsByGenres');
          const data = await response.json();
          setSongsByGenres(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchSongsByGenres();
    }, []);

    return (
      <div className="container mt-5">
        {songsByGenres.map(genre => (
          <div key={genre._id} className="row justify-content-center">
            <div className="col-md-9">
              <div className="card mb-3">
                <div className="card-header">
                  <h2 className="card-title">{genre._id}</h2>
                </div>
                <div className="card-body">
                  {genre.songs.map(song => (
                    <div key={song.id} className="card mb-1">
                      <div className="row no-gutters">
                        <div className="col-md-2">
                          <img src={song.imageUrl} alt={song.songTitle} className="card-img" />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title"><strong>{song.songTitle}</strong></h5>
                            <p className="card-text">by {song.artistName}</p>
                          </div>
                        </div>
                        <div className="col-md-2 mt-5">
                          <p className="card-text">{song.duration}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const ReadAccordionItem = () => {
    const [songs, setSongs] = useState([]);
    const [filteredSongs, setFilteredSongs] = useState(songs); // used to store filtered songs

    // filter songs by tag
    const filterSongs = (tag) => {
      if (tag === "all" || tag === null) {
        setFilteredSongs(songs);
      } else {
        const filtered = songs.filter((song) => song.tags.includes(tag));
        setFilteredSongs(filtered);
        console.log(filteredSongs);
      }
    };

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8081/listSongs");
        const data = await response.json();
        setSongs(data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);

    return (
      <div>
        <FilterBar filterSongs={filterSongs} />

        <hr />
        <div className="d-flex flex-wrap justify-content-around">
          {filteredSongs.map((song) => (
            <div
              key={song.id}
              className="card m-2"
              style={{ width: "15rem" }}>
              <img
                src={song.imageUrl}
                className="card-img-top"
                alt={song.title}
              />
              <div className="card-body">
                <h4 className="card-title">{song.songTitle}</h4>
                <h6>{song.artistName}</h6>
                <p className="card-text small">{song.lyrics}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Duration:</strong> {song.duration}
                </li>
                <li className="list-group-item">
                  <strong>Tags: </strong>
                  {song.tags[0]} {song.tags[1]} {song.tags[2]}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const Header = () => {
    return (
      <header className="p-3 bg-dark text-white">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <h3 className="font-weight-bold" style={{ fontFamily: 'Impact', fontSize: '60px' }}>FM319</h3>


            </div>
          </div>
          <hr />

          <div className="row">
            <div className="col">
              <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <div className="d-flex align-items-center mb-2 mb-lg-0 text-white">


                </div>
                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                  <li><button className="btn btn-outline-dark border-0 px-2 text-white" onClick={() => setViewer('all')}>Home</button></li>
                  <li><button className="btn btn-outline-dark border-0 px-2 text-white" onClick={() => setViewer('genres')}>By Genres</button></li>
                  <li><button className="btn btn-outline-dark border-0 px-2 text-white" onClick={() => setViewer('edit')}>Add/Edit/delete Songs</button></li>
                  <li><button className="btn btn-outline-dark border-0 px-2 text-white" onClick={() => setViewer('about')}>About</button></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  const Accordion = () => {
    return (
      <div className="Container mx-5 mt-5">
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button bg-dark text-light"
                type="button"
                onClick={() => toggleCollapse(1)}
                aria-expanded={openItem === 1 ? "true" : "false"}
                aria-controls="collapseOne"
              >
                <strong>C</strong>reate: Add song to database
              </button>
            </h2>
            <div
              id="collapseOne"
              className={`accordion-collapse collapse ${openItem === 1 ? "show" : ""
                }`}
              aria-labelledby="headingOne"
            >
              <div className="accordion-body">
                <ItemForm />
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button bg-dark text-light"
                type="button"
                onClick={() => toggleCollapse(2)}
                aria-expanded={openItem === 2 ? "true" : "false"}
                aria-controls="collapseThree"
              >
                <strong>U</strong>pdate: Modify information about a song
              </button>
            </h2>
            <div
              id="collapseThree"
              className={`accordion-collapse collapse ${openItem === 2 ? "show" : ""
                }`}
              aria-labelledby="headingThree"
            >
              <div className="accordion-body">
                <UpdateForm />
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFour">
              <button
                className="accordion-button bg-dark text-light"
                type="button"
                onClick={() => toggleCollapse(3)}
                aria-expanded={openItem === 3 ? "true" : "false"}
                aria-controls="collapseFour"
              >
                <strong>D</strong>elete: Remove a song from the Database
              </button>
            </h2>
            <div
              id="collapseFour"
              className={`accordion-collapse collapse ${openItem === 3 ? "show" : ""
                }`}
              aria-labelledby="headingFour"
            >
              <div className="accordion-body">
                <DeleteSong />
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }

  return (

    <div>
      <Header />
      {viewer === 'all' && (
        <div>
          <ReadAccordionItem />
        </div>
      )}
      {viewer === 'genres' && (
        <div>
          <Genres />
        </div>
      )}
      {viewer === 'edit' && (
        <div>
          <Accordion />
        </div>
      )}
      {viewer === 'about' && (
        <div>
          <div className="album py-5">
            <div className="container">
              <h3>Com S 319: Construction of User Interfaces, Team 71</h3>

              <h4>Final Project</h4>

              <hr></hr>

              <div className="row row-cols-1 row-cols-sm-2 g-3">
                <StudentCard
                  name="Andrew Butler"
                  email="ajbutler@iastate.edu"
                  date="27-4-2024"
                  professor="Ali Jannesari"
                  imageSrc="https://raw.githubusercontent.com/AjButler03/CS319-Assign-01/main/personal%20images/andrew.JPG"
                />
                <StudentCard
                  name="Nhat Bui"
                  email="nbui@iastate.edu"
                  date="27-4-2024"
                  professor="Ali Jannesari"
                  imageSrc="https://raw.githubusercontent.com/AjButler03/CS319-Assign-01/main/personal%20images/nat.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      )
      }

    </div >
  );
};

export default App;
