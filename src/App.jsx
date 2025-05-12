import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Modal from "react-modal";
import { fetchImages } from "./api/unsplash";

import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

Modal.setAppElement("#root");

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    if (!query) return;

    const getImages = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchImages(query, page);
        if (page === 1) {
          setImages(data.results);
        } else {
          setImages((prev) => [...prev, ...data.results]);
        }
        setTotalPages(data.total_pages);
      } catch (err) {
        setError("Failed to fetch images");
      } finally {
        setLoading(false);
      }
    };

    getImages();
  }, [query, page]);

  const handleSearch = (value) => {
    if (!value.trim()) {
      toast.error("Enter search term!");
      return;
    }
    if (value !== query) {
      setQuery(value);
      setPage(1);
      setImages([]);
    }
  };

  const loadMore = () => setPage((prev) => prev + 1);

  const openModal = (image) => setModalData(image);
  const closeModal = () => setModalData(null);

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      {images.length > 0 && (
        <>
          <ImageGallery items={images} onImageClick={openModal} />
          {page < totalPages && <LoadMoreBtn onClick={loadMore} />}
        </>
      )}
      {loading && <Loader />}
      {modalData && <ImageModal data={modalData} onClose={closeModal} />}
    </>
  );
}

export default App;
