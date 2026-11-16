import { useLocation, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import "./ProductsGallery.css";

// Get old and new product image formats
function getProductImages(product) {
  if (product.image_urls?.length) {
    return product.image_urls;
  }

  return product.image_url ? [product.image_url] : [];
}

// Individual product card
function ProductCard({ product }) {
  const images = getProductImages(product);
  const [activeImage, setActiveImage] = useState(0);

  const nextImage = () => {
    setActiveImage((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  };

  const previousImage = () => {
    setActiveImage((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  return (
    <article className="dg-product-card">
      {/* TOP ROW: category + code */}
      <div className="dg-card-top">
        <span className="dg-card-tag">{product.category || "COLLECTION"}</span>
        <span className="dg-card-code">{product.code}</span>
      </div>

      {/* PRODUCT IMAGE GALLERY */}
      {images.length > 0 && (
        <div className="dg-product-gallery">
          <div className="dg-gallery-main">
            <img
              src={images[activeImage]}
              alt={`${product.name} - Image ${activeImage + 1}`}
            />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  className="dg-gallery-arrow dg-gallery-prev"
                  onClick={previousImage}
                  aria-label="Previous image"
                >
                  <i className="bi bi-chevron-left"></i>
                </button>

                <button
                  type="button"
                  className="dg-gallery-arrow dg-gallery-next"
                  onClick={nextImage}
                  aria-label="Next image"
                >
                  <i className="bi bi-chevron-right"></i>
                </button>

                <span className="dg-gallery-counter">
                  {activeImage + 1} / {images.length}
                </span>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="dg-gallery-thumbnails">
              {images.map((image, index) => (
                <button
                  type="button"
                  key={image}
                  className={`dg-gallery-thumb ${
                    activeImage === index ? "active" : ""
                  }`}
                  onClick={() => setActiveImage(index)}
                  aria-label={`View image ${index + 1}`}
                >
                  <img
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* EMPTY PLACEHOLDER ONLY WHEN NO MEDIA EXISTS */}
      {images.length === 0 && !product.video_url && (
        <div className="dg-gallery-empty">
          <i className="bi bi-image"></i>
          <span>No image available</span>
        </div>
      )}

      {/* PRODUCT VIDEO */}
      {product.video_url && (
        <div className="dg-product-video">
          <div className="dg-video-heading">
            <i className="bi bi-play-circle"></i>
            Product Video
          </div>

          <video
            src={product.video_url}
            controls
            controlsList="nodownload noplaybackrate"
            disablePictureInPicture
            playsInline
            preload="metadata"
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      )}

      {/* PRODUCT DETAILS */}
      <div className="dg-product-content">
        <h3>{product.name}</h3>

        <p>{product.description || "Contact us for more information."}</p>

        <Link to="/contact" className="dg-product-link">
          <span>More Information</span>
          <i className="bi bi-arrow-right"></i>
        </Link>
      </div>
    </article>
  );
}

// Table (blueprint) view
function ProductsTable({ products }) {
  return (
    <div className="dg-table-wrap">
      <table className="dg-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Product</th>
            <th>Category</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => {
            const image = getProductImages(product)[0];

            return (
              <tr key={product.id}>
                <td className="dg-td-code">{product.code}</td>

                <td>
                  <div className="dg-td-product">
                    <span className="dg-table-thumb">
                      {image ? (
                        <img src={image} alt={product.name} />
                      ) : (
                        <i className="bi bi-image"></i>
                      )}
                    </span>
                    <strong>{product.name}</strong>
                  </div>
                </td>

                <td>
                  <span className="dg-card-tag">
                    {product.category || "COLLECTION"}
                  </span>
                </td>

                <td className="dg-td-desc">
                  {product.description || "Contact us for more information."}
                </td>

                <td>
                  <Link to="/contact" className="dg-table-link">
                    Inquire
                    <i className="bi bi-arrow-right"></i>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Products() {
  const location = useLocation();
  const isProductsPage = location.pathname === "/products";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Catalog controls (products page only)
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [sort, setSort] = useState("featured");
  const [view, setView] = useState("grid");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (error) {
        setError(error.message);
        setProducts([]);
      } else {
        setProducts(data || []);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  // Add DG-01 style code
  const coded = useMemo(
    () =>
      products.map((product, index) => ({
        ...product,
        code: `DG-${String(index + 1).padStart(2, "0")}`,
      })),
    [products]
  );

  // Categories come automatically from the database
  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category).filter(Boolean))),
    [products]
  );

  const visibleProducts = useMemo(() => {
    if (!isProductsPage) return coded.slice(0, 4);

    let list = coded;

    if (category !== "ALL") {
      list = list.filter((p) => p.category === category);
    }

    const query = search.trim().toLowerCase();

    if (query) {
      list = list.filter((p) =>
        [p.name, p.description, p.category, p.code]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(query)
      );
    }

    if (sort === "az") {
      list = [...list].sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
      );
    } else if (sort === "za") {
      list = [...list].sort((a, b) =>
        (b.name || "").localeCompare(a.name || "")
      );
    }

    return list;
  }, [coded, isProductsPage, category, search, sort]);

  const clearFilters = () => {
    setSearch("");
    setCategory("ALL");
    setSort("featured");
  };

  return (
    <section
      id="products"
      className={`dg-catalog ${isProductsPage ? "is-page" : "is-home"}`}
    >
      <div className="dg-catalog-inner">
        {/* HEADING */}
        <div className="dg-cat-head">
          <span className="dg-eyebrow">
            {isProductsPage
              ? "SYS.02 // CURATED INVENTORY"
              : "SYS.02 // FEATURED COLLECTION"}
          </span>

          {isProductsPage ? <h1>Shop All</h1> : <h2>Featured Collection</h2>}

          <p>
            Explore our carefully presented collections and discover quality
            products from Delta Gun.
          </p>
        </div>

        {/* CATALOG CONTROLS */}
        {isProductsPage && !loading && !error && products.length > 0 && (
          <>
            <div className="dg-view-toggle">
              <button
                type="button"
                className={`dg-view-btn ${view === "grid" ? "active" : ""}`}
                onClick={() => setView("grid")}
              >
                <i className="bi bi-grid-3x3-gap"></i>
                Card Grid
              </button>

              <button
                type="button"
                className={`dg-view-btn ${view === "table" ? "active" : ""}`}
                onClick={() => setView("table")}
              >
                <i className="bi bi-table"></i>
                Table
              </button>
            </div>

            <div className="dg-filters">
              <div className="dg-pills">
                <button
                  type="button"
                  className={`dg-pill ${category === "ALL" ? "active" : ""}`}
                  onClick={() => setCategory("ALL")}
                >
                  All Models
                </button>

                {categories.map((item) => (
                  <button
                    type="button"
                    key={item}
                    className={`dg-pill ${category === item ? "active" : ""}`}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="dg-filter-row">
                <label className="dg-search">
                  <i className="bi bi-search"></i>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search model, category, code..."
                  />
                </label>

                <select
                  className="dg-select"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  aria-label="Sort products"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="az">Sort: Name A–Z</option>
                  <option value="za">Sort: Name Z–A</option>
                </select>
              </div>
            </div>

            <p className="dg-count">
              SHOWING {visibleProducts.length} OF {products.length} MODELS
            </p>
          </>
        )}

        {/* PRODUCTS */}
        {loading ? (
          <div className="dg-state">
            <span className="dg-spinner"></span>
            <p>Loading collections...</p>
          </div>
        ) : error ? (
          <div className="dg-state dg-state-error">
            <p>Unable to load products: {error}</p>
          </div>
        ) : products.length === 0 ? (
          <div className="dg-state">
            <h3>No Products Available</h3>
            <p>Please check back later.</p>
          </div>
        ) : visibleProducts.length === 0 ? (
          <div className="dg-state">
            <h3>No matching models</h3>
            <p>Try a different search or category.</p>
            <button type="button" className="dg-clear-btn" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        ) : isProductsPage && view === "table" ? (
          <ProductsTable products={visibleProducts} />
        ) : (
          <div className="dg-products-grid">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* HOME: view all button */}
        {!isProductsPage && !loading && products.length > 0 && (
          <div className="dg-view-all">
            <Link to="/products" className="dg-solid-btn">
              View Full Catalog
              <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        )}

        {/* PRODUCTS PAGE: WHY DELTA GUN */}
        {isProductsPage && (
          <div className="dg-why">
            <div className="dg-why-head">
              <span className="dg-eyebrow">SYS.04 // WHY DELTA GUN</span>
              <h2>Quality. Precision. Performance.</h2>
              <p>
                We focus on presenting carefully selected collections with a
                professional and premium experience for our customers.
              </p>
            </div>

            <div className="dg-why-grid">
              <div className="dg-why-card">
                <span className="dg-why-num">01</span>
                <h3>Quality Focused</h3>
                <p>
                  Our collections are presented with attention to quality,
                  design and detail.
                </p>
              </div>

              <div className="dg-why-card">
                <span className="dg-why-num">02</span>
                <h3>Precision</h3>
                <p>
                  Carefully organized collections designed around a clean and
                  professional experience.
                </p>
              </div>

              <div className="dg-why-card">
                <span className="dg-why-num">03</span>
                <h3>Professional Service</h3>
                <p>
                  Our team is available to provide general information and
                  answer your inquiries.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTS PAGE: CTA */}
        {isProductsPage && (
          <div className="dg-cta">
            <div>
              <span className="dg-cta-label">CONCIERGE &amp; SHOWROOM DESK</span>
              <h2>Ready To Inquire?</h2>
              <p>
                Have questions about our collections? Our team is ready to
                assist you with general information and inquiries.
              </p>
            </div>

            <div className="dg-cta-buttons">
              <Link to="/contact" className="dg-cta-primary">
                Get In Touch
                <i className="bi bi-arrow-right"></i>
              </Link>

              <a href="tel:+923131555111" className="dg-cta-secondary">
                Call +92 313 1555 111
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Products;