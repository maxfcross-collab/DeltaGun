import { useLocation, Link } from "react-router-dom";

import tacticalImg from "../assets/tactical.png";
import precisionImg from "../assets/precision.png";
import premiumImg from "../assets/premium.png";
import collectionImg from "../assets/collection.png";


// ======================================================
// PRODUCT DATA
// ======================================================

const products = [
  {
    name: "Tactical Collection",
    image: tacticalImg,
    category: "TACTICAL",
    description:
      "Explore our featured tactical collection with a focus on quality, design and professional presentation.",
  },
  {
    name: "Precision Collection",
    image: precisionImg,
    category: "PRECISION",
    description:
      "A carefully presented collection built around precision, quality and attention to detail.",
  },
  {
    name: "Premium Gear",
    image: premiumImg,
    category: "PREMIUM",
    description:
      "Discover selected equipment and gear presented for enthusiasts who value quality and performance.",
  },
  {
    name: "Featured Collection",
    image: collectionImg,
    category: "FEATURED",
    description:
      "Discover our highlighted collection and explore the products presented by Delta Gun.",
  },

  // ----------------------------------------------------
  // Additional Products
  // ----------------------------------------------------

  {
    name: "Tactical Series",
    image: tacticalImg,
    category: "TACTICAL",
    description:
      "A refined tactical selection presented with a strong focus on quality, reliability and professional design.",
  },
  {
    name: "Precision Series",
    image: precisionImg,
    category: "PRECISION",
    description:
      "Explore our precision-focused selection, carefully presented for customers who appreciate detailed craftsmanship.",
  },
  {
    name: "Premium Series",
    image: premiumImg,
    category: "PREMIUM",
    description:
      "A premium selection featuring carefully presented equipment with an emphasis on quality and presentation.",
  },
  {
    name: "Delta Gun Selection",
    image: collectionImg,
    category: "SELECTED",
    description:
      "Browse another highlighted selection from Delta Gun, presented for enthusiasts seeking quality and style.",
  },
];

function Products() {
  const location = useLocation();

  // Home page = 4 products
  // Shop All page = 8 products
  const isProductsPage = location.pathname === "/products";

  const visibleProducts = isProductsPage ? products : products.slice(0, 4);

  return (
    <section
      id="products"
      className={`products-section ${
        isProductsPage ? "products-page" : "products-home"
      }`}
    >
      {/* ==================================================
          PAGE HEADER
      ================================================== */}

      <div className="section-heading">
        <span>DELTA GUN COLLECTION</span>

        <h1>Shop All</h1>

        <p>
          Explore our carefully presented collections and discover quality
          products from Delta Gun.
        </p>
      </div>

      {/* ==================================================
          PRODUCT GRID
      ================================================== */}

      <div className="products-grid">
        {visibleProducts.map((product, index) => (
          <article className="product-card" key={`${product.name}-${index}`}>
            {/* Product Image */}

            <div className="product-image">
              <img src={product.image} alt={product.name} />

              <span className="product-badge">{product.category}</span>
            </div>

            {/* Product Content */}

            <div className="product-content">
              <span className="product-category">{product.category}</span>

              <h3>{product.name}</h3>

              <p>{product.description}</p>

              <Link to="/contact">
                More Information
                <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* ==================================================
          WHY DELTA GUN
          Only show this section on Shop All page
      ================================================== */}

      {isProductsPage && (
        <section className="products-benefits">
          <div className="products-benefits-heading">
            <span>WHY DELTA GUN</span>

            <h2>Quality. Precision. Performance.</h2>

            <p>
              We focus on presenting carefully selected collections with a
              professional and premium experience for our customers.
            </p>
          </div>

          <div className="benefits-grid">
            {/* Benefit 1 */}

            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="bi bi-award-fill"></i>
              </div>

              <div>
                <h3>Quality Focused</h3>

                <p>
                  Our collections are presented with attention to quality,
                  design and detail.
                </p>
              </div>
            </div>

            {/* Benefit 2 */}

            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="bi bi-bullseye"></i>
              </div>

              <div>
                <h3>Precision</h3>

                <p>
                  Carefully organized collections designed around a clean and
                  professional experience.
                </p>
              </div>
            </div>

            {/* Benefit 3 */}

            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="bi bi-shield-check"></i>
              </div>

              <div>
                <h3>Professional Service</h3>

                <p>
                  Our team is available to provide general information and
                  answer your inquiries.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ==================================================
          INFORMATION / CTA
      ================================================== */}

      <div className="products-info">
        <div className="products-info-icon">
          <i className="bi bi-info-circle"></i>
        </div>

        <div className="products-info-content">
          <h3>Looking for More Information?</h3>

          <p>
            Contact the Delta Gun team for general product information and
            inquiries.
          </p>
        </div>

        <Link to="/contact" className="btn-primary">
          Contact Us
          <i className="bi bi-arrow-right"></i>
        </Link>
      </div>

      {/* ==================================================
          BOTTOM CTA
          Only on Shop All page
      ================================================== */}

      {isProductsPage && (
        <div className="products-bottom-cta">
          <div>
            <span>DELTA GUN</span>

            <h2>Explore Our Collection</h2>

            <p>
              Have questions about our collections? Our team is ready to assist
              you.
            </p>
          </div>

          <Link to="/contact" className="products-cta-button">
            Get In Touch
            <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      )}
    </section>
  );
}

export default Products;
