
import { useForm } from "react-hook-form";

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

  export default ItemForm;