import tacticalImg from "../assets/tactical.png";
import precisionImg from "../assets/precision.png";
import premiumImg from "../assets/premium.png";
import collectionImg from "../assets/collection.png";

const products = [
  {
    name: "Tactical Collection",
    image: tacticalImg,
    description:
      "Explore our featured tactical collection."
  },
  {
    name: "Precision Collection",
    image: precisionImg,
    description:
      "Designed around quality and precision."
  },
  {
    name: "Premium Gear",
    image: premiumImg,
    description:
      "Selected equipment for enthusiasts."
  },
  {
    name: "Featured Collection",
    image: collectionImg,
    description:
      "Discover our carefully presented collection."
  }
];

function Products() {
  return (
    <section id="products" className="products-section">

      <div className="section-heading">
        <span>OUR COLLECTION</span>

        <h2>Featured Collection</h2>

        <p>
          Browse our featured products and collections.
        </p>
      </div>

      <div className="products-grid">

        {products.map((product, index) => (
          <article
            className="product-card"
            key={index}
          >

            {/* Product Image */}
            <div className="product-image">
              <img
                src={product.image}
                alt={product.name}
              />

              <span className="product-badge">
                FEATURED
              </span>
            </div>

            {/* Product Content */}
            <div className="product-content">

              <h3>{product.name}</h3>

              <p>
                {product.description}
              </p>

              <a href="#contact">
                Contact Us
                <i className="bi bi-arrow-right"></i>
              </a>

            </div>

          </article>
        ))}

      </div>
    </section>
  );
}

export default Products;