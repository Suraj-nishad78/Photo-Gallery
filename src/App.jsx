
import { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

const PAGE_SIZE = 10;

function App() {
  const [photos, setPhotos] = useState([]);
  const [likes, setLikes] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");

  const observer = useRef(null);
  const loadingRef = useRef(false);

  const fetchPhotos = useCallback(async () => {
    if (loadingRef.current || !hasMore) return;

    loadingRef.current = true;
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${page}&limit=${PAGE_SIZE}`
      );

      if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid response received from the API.");
      }

      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      setPhotos((previous) => {
        const existingIds = new Set(previous.map((photo) => photo.id));
        const newPhotos = data.filter(
          (photo) => !existingIds.has(photo.id)
        );

        return [...previous, ...newPhotos];
      });

      setPage((previous) => previous + 1);

      // An empty page indicates that the feed has ended.
      if (data.length < PAGE_SIZE) {
        setHasMore(false);
      }
    } catch (err) {
      setError(err.message || "Unable to load photos.");
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [page, hasMore]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  const lastPhotoRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchPhotos();
          }
        },
        {
          root: null,
          rootMargin: "300px",
          threshold: 0,
        }
      );

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore, fetchPhotos]
  );

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  const handleLike = (photoId) => {
    setLikes((previous) => ({
      ...previous,
      [photoId]: (previous[photoId] || 0) + 1,
    }));
  };

  return (
    <div className="app">
      <header className="gallery-header">
        <h1>Photo Gallery</h1>
      </header>

      <main className="gallery-container">
        {photos.map((photo, index) => (
          <article
            className="photo-card"
            key={photo.id}
            ref={index === photos.length - 1 ? lastPhotoRef : null}
          >
            <div className="photo-wrapper">
              <img
                className="photo-image"
                src={photo.download_url}
                alt={`Photograph by ${photo.author}`}
                loading={index < PAGE_SIZE ? "eager" : "lazy"}
                onError={(event) => {
                  event.currentTarget.alt = "Image could not be loaded";
                }}
              />
            </div>

            <div className="photo-details">
              <div className="author-info">
                <span className="author-label">Author: </span>
                <h2>{photo.author}</h2>
                <button
                type="button"
                className="like-button"
                onClick={() => handleLike(photo.id)}
                aria-label={`Like photo by ${photo.author}. ${
                  likes[photo.id] || 0
                } likes`}
                title="Like this photo"
              >
                <FontAwesomeIcon icon={faThumbsUp} />
                <span>{likes[photo.id] || 0}</span>
              </button>
              </div>

              
            </div>
          </article>
        ))}

        {loading && (
          <div className="status-message" role="status">
            <span className="loader" />
            <p>Loading more photos...</p>
          </div>
        )}

        {error && (
          <div className="status-message error-message" role="alert">
            <p>{error}</p>
            <button
              type="button"
              className="retry-button"
              onClick={fetchPhotos}
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && photos.length > 0 && !hasMore && (
          <p className="end-message">
            You have reached the end of the gallery.
          </p>
        )}
      </main>


      <footer className="gallery-footer">
        Photos powered by{" "}
        <a
          href="https://picsum.photos/"
          target="_blank"
          rel="noreferrer"
        >
          Suraj Nishad
        </a>
      </footer>
    </div>
  );
}

export default App;
