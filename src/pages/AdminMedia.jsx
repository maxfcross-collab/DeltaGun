import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import AdminLayout from "../components/AdminLayout";
import "./AdminMedia.css";

function AdminMedia() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("products")
      .select("id, name, image_url, image_urls, video_url, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
      setMedia([]);
      setLoading(false);
      return;
    }

    const allMedia = [];

    (data || []).forEach((product) => {
      // Support both old and new image formats
      const images = product.image_urls?.length
        ? product.image_urls
        : product.image_url
          ? [product.image_url]
          : [];

      // Remove duplicate image URLs
      const uniqueImages = [...new Set(images)];

      uniqueImages.forEach((url, index) => {
        if (url) {
          allMedia.push({
            id: `${product.id}-image-${index}`,
            productId: product.id,
            productName: product.name,
            url,
            type: "Image",
            createdAt: product.created_at,
          });
        }
      });

      if (product.video_url) {
        allMedia.push({
          id: `${product.id}-video`,
          productId: product.id,
          productName: product.name,
          url: product.video_url,
          type: "Video",
          createdAt: product.created_at,
        });
      }
    });

    setMedia(allMedia);
    setLoading(false);
  };

  const copyUrl = async (item) => {
    try {
      await navigator.clipboard.writeText(item.url);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      window.prompt("Copy this URL:", item.url);
    }
  };

  const filteredMedia =
    filter === "All" ? media : media.filter((item) => item.type === filter);

  const imageCount = media.filter((item) => item.type === "Image").length;
  const videoCount = media.filter((item) => item.type === "Video").length;

  return (
    <AdminLayout
      eyebrow="SYS.ADMIN // MEDIA"
      title="Media Library"
      subtitle="Manage and view images and videos connected to your products."
      actions={
        <button
          type="button"
          className="am-btn"
          onClick={fetchMedia}
          disabled={loading}
        >
          <i className="bi bi-arrow-clockwise"></i>
          {loading ? "Loading..." : "Refresh"}
        </button>
      }
    >
      {/* STATISTICS */}
      <div className="am-stats">
        <div className="am-stat">
          <strong>{imageCount}</strong>
          <span>TOTAL IMAGES</span>
        </div>

        <div className="am-stat">
          <strong>{videoCount}</strong>
          <span>TOTAL VIDEOS</span>
        </div>

        <div className="am-stat am-stat-blue">
          <strong>{media.length}</strong>
          <span>TOTAL MEDIA FILES</span>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="am-toolbar">
        <div>
          <span className="am-mini-label">LIBRARY</span>
          <h3>All Media</h3>
          <p>Browse your product images and videos.</p>
        </div>

        <div className="am-filters">
          {["All", "Image", "Video"].map((item) => (
            <button
              key={item}
              type="button"
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
            >
              {item === "Image" && <i className="bi bi-image"></i>}
              {item === "Video" && <i className="bi bi-camera-video"></i>}
              {item === "All" && <i className="bi bi-grid"></i>}
              {item === "All" ? "All Media" : `${item}s`}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="am-state">
          <span className="am-spinner"></span>
          <p>Loading media library...</p>
        </div>
      ) : error ? (
        <div className="am-error">
          <i className="bi bi-exclamation-circle"></i>
          <span>Unable to load media: {error}</span>
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="am-state">
          <i className="bi bi-folder2-open"></i>
          <h4>No Media Found</h4>
          <p>
            {filter === "All"
              ? "Uploaded product images and videos will appear here."
              : `No ${filter.toLowerCase()} files found.`}
          </p>
        </div>
      ) : (
        <div className="am-grid">
          {filteredMedia.map((item, index) => (
            <article className="am-card" key={item.id}>
              <div className="am-card-top">
                <span
                  className={`am-type ${
                    item.type === "Image" ? "is-image" : "is-video"
                  }`}
                >
                  <i
                    className={`bi ${
                      item.type === "Image" ? "bi-image" : "bi-camera-video"
                    }`}
                  ></i>
                  {item.type}
                </span>

                <span className="am-code">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="am-preview">
                {item.type === "Image" ? (
                  <img src={item.url} alt={item.productName} loading="lazy" />
                ) : (
                  <video
                    src={item.url}
                    controls
                    controlsList="nodownload"
                    playsInline
                    preload="metadata"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                )}
              </div>

              <div className="am-body">
                <h4 title={item.productName}>{item.productName}</h4>

                <p>
                  <i className="bi bi-link-45deg"></i>
                  Product Media
                </p>

                <button
                  type="button"
                  className={`am-copy ${copiedId === item.id ? "copied" : ""}`}
                  onClick={() => copyUrl(item)}
                >
                  <i
                    className={`bi ${
                      copiedId === item.id ? "bi-check-lg" : "bi-copy"
                    }`}
                  ></i>
                  {copiedId === item.id ? "Copied!" : "Copy URL"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminMedia;