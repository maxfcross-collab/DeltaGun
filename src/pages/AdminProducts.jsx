import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import AdminLayout from "../components/AdminLayout";
import "./AdminProducts.css";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    sort_order: 0,
    is_active: true,
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [existingImageUrls, setExistingImageUrls] = useState([]);
  const [videoFile, setVideoFile] = useState(null);

  // Get product images (supports old and new records)
  const getProductImages = (product) => {
    if (product.image_urls?.length) {
      return product.image_urls;
    }

    return product.image_url ? [product.image_url] : [];
  };

  // Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      setError(error.message);
      setProducts([]);
    } else {
      setProducts(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Product statistics
  const activeProducts = products.filter((product) => product.is_active).length;
  const inactiveProducts = products.length - activeProducts;

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      description: "",
      sort_order: 0,
      is_active: true,
    });

    setImageFiles([]);
    setExistingImageUrls([]);
    setVideoFile(null);
    setEditingProduct(null);

    const imageInput = document.getElementById("productImage");
    const videoInput = document.getElementById("productVideo");

    if (imageInput) imageInput.value = "";
    if (videoInput) videoInput.value = "";
  };

  // Start editing
  const startEditing = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name || "",
      category: product.category || "",
      description: product.description || "",
      sort_order: product.sort_order ?? 0,
      is_active: product.is_active,
    });

    setExistingImageUrls(getProductImages(product));
    setImageFiles([]);
    setVideoFile(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Upload media to Supabase Storage
  const uploadFile = async (file, folder) => {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const filePath = `${folder}/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}-${safeName}`;

    const { error: uploadError } = await supabase.storage
      .from("product-media")
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from("product-media")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  // Remove an existing image from the product
  const removeExistingImage = (imageUrl) => {
    setExistingImageUrls((current) =>
      current.filter((url) => url !== imageUrl)
    );
  };

  // Add or update product
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      // Preserve existing images
      let imageUrls = [...existingImageUrls];

      // Upload all newly selected images
      if (imageFiles.length > 0) {
        const uploadedImages = await Promise.all(
          imageFiles.map((file) => uploadFile(file, "products"))
        );

        imageUrls = [...imageUrls, ...uploadedImages];
      }

      // Preserve or upload video
      let videoUrl = editingProduct?.video_url || "";

      if (videoFile) {
        videoUrl = await uploadFile(videoFile, "products");
      }

      const productData = {
        ...formData,
        sort_order: Number(formData.sort_order) || 0,

        // New multiple-image field
        image_urls: imageUrls,

        // Keep first image in old field for compatibility
        image_url: imageUrls[0] || "",

        video_url: videoUrl,
      };

      let result;

      if (editingProduct) {
        result = await supabase
          .from("products")
          .update(productData)
          .eq("id", editingProduct.id);
      } else {
        result = await supabase.from("products").insert([productData]);
      }

      if (result.error) {
        throw result.error;
      }

      setSuccess(
        editingProduct
          ? "Product updated successfully!"
          : "Product added successfully!"
      );

      resetForm();
      await fetchProducts();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess("Product deleted successfully!");
    await fetchProducts();
  };

  // Activate / deactivate product
  const toggleStatus = async (product) => {
    setError("");
    setSuccess("");

    const { error } = await supabase
      .from("products")
      .update({ is_active: !product.is_active })
      .eq("id", product.id);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess(
      product.is_active
        ? "Product hidden successfully!"
        : "Product activated successfully!"
    );

    await fetchProducts();
  };

  return (
    <AdminLayout
      eyebrow="SYS.ADMIN // PRODUCTS"
      title="Product Management"
      subtitle="Manage your products, images and videos from one place."
      actions={
        <button
          type="button"
          className="ap-btn ap-btn-primary"
          onClick={() => {
            resetForm();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <i className="bi bi-plus-lg"></i>
          Add New Product
        </button>
      }
    >
      {/* ALERTS */}
      {error && (
        <div className="ap-alert ap-alert-error">
          <i className="bi bi-exclamation-circle"></i>
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="ap-alert ap-alert-success">
          <i className="bi bi-check-circle"></i>
          <span>{success}</span>
        </div>
      )}

      {/* STATISTICS */}
      <div className="ap-stats">
        <div className="ap-stat">
          <strong>{products.length}</strong>
          <span>TOTAL PRODUCTS</span>
        </div>

        <div className="ap-stat">
          <strong>{activeProducts}</strong>
          <span>ACTIVE PRODUCTS</span>
        </div>

        <div className="ap-stat ap-stat-blue">
          <strong>{inactiveProducts}</strong>
          <span>INACTIVE PRODUCTS</span>
        </div>
      </div>

      {/* ADD / EDIT FORM */}
      <section className="ap-panel">
        <div className="ap-panel-head">
          <div>
            <span className="ap-mini-label">
              {editingProduct ? "EDIT MODE" : "NEW ENTRY"}
            </span>

            <h2>
              <i
                className={`bi ${
                  editingProduct ? "bi-pencil-square" : "bi-plus-circle"
                }`}
              ></i>
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>

            <p>Enter product details and upload its media.</p>
          </div>

          {editingProduct && (
            <button
              type="button"
              className="ap-btn ap-btn-outline"
              onClick={resetForm}
            >
              Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="ap-form-grid">
            <div className="ap-field">
              <label htmlFor="productName">Product Name *</label>
              <input
                id="productName"
                type="text"
                placeholder="Enter product name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="ap-field">
              <label htmlFor="productCategory">Category</label>
              <input
                id="productCategory"
                type="text"
                placeholder="Enter category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />
            </div>

            <div className="ap-field ap-full">
              <label htmlFor="productDescription">Description</label>
              <textarea
                id="productDescription"
                rows="4"
                placeholder="Write product description..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              ></textarea>
            </div>

            {/* IMAGES */}
            <div className="ap-field">
              <label htmlFor="productImage">Product Images</label>

              <label className="ap-upload" htmlFor="productImage">
                <i className="bi bi-cloud-arrow-up"></i>
                <strong>Choose images</strong>
                <small>Multiple JPG, PNG, WEBP or GIF</small>
              </label>

              <input
                id="productImage"
                className="ap-file-input"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                multiple
                onChange={(e) =>
                  setImageFiles(Array.from(e.target.files || []))
                }
              />

              {existingImageUrls.length > 0 && (
                <div className="ap-current">
                  <span className="ap-mini-label">
                    CURRENT IMAGES ({existingImageUrls.length})
                  </span>

                  <div className="ap-thumbs">
                    {existingImageUrls.map((url, index) => (
                      <div className="ap-thumb" key={url}>
                        <img src={url} alt={`Product image ${index + 1}`} />

                        <button
                          type="button"
                          title="Remove image"
                          aria-label="Remove image"
                          onClick={() => removeExistingImage(url)}
                        >
                          <i className="bi bi-x-lg"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {imageFiles.length > 0 && (
                <div className="ap-selected">
                  <strong>
                    <i className="bi bi-check-circle"></i>
                    {imageFiles.length} new image(s) selected
                  </strong>

                  <ul>
                    {imageFiles.map((file, index) => (
                      <li key={`${file.name}-${index}`}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* VIDEO */}
            <div className="ap-field">
              <label htmlFor="productVideo">Product Video</label>

              <label className="ap-upload" htmlFor="productVideo">
                <i className="bi bi-camera-video"></i>
                <strong>Choose video</strong>
                <small>MP4 or WEBM</small>
              </label>

              <input
                id="productVideo"
                className="ap-file-input"
                type="file"
                accept="video/mp4,video/webm"
                onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
              />

              {videoFile && (
                <div className="ap-selected">
                  <strong>
                    <i className="bi bi-check-circle"></i>
                    {videoFile.name}
                  </strong>
                </div>
              )}

              {editingProduct?.video_url && !videoFile && (
                <p className="ap-note">Existing video will be preserved.</p>
              )}
            </div>

            <div className="ap-field">
              <label htmlFor="productOrder">Display Order</label>
              <input
                id="productOrder"
                type="number"
                value={formData.sort_order}
                onChange={(e) =>
                  setFormData({ ...formData, sort_order: e.target.value })
                }
              />
            </div>

            <div className="ap-field">
              <label>Visibility</label>

              <label className="ap-switch" htmlFor="productActive">
                <input
                  type="checkbox"
                  id="productActive"
                  checked={formData.is_active}
                  onChange={(e) =>
                    setFormData({ ...formData, is_active: e.target.checked })
                  }
                />
                <span className="ap-switch-track"></span>
                <span className="ap-switch-text">Show product on website</span>
              </label>
            </div>
          </div>

          <div className="ap-form-actions">
            <button
              type="submit"
              className="ap-btn ap-btn-primary"
              disabled={saving}
            >
              {saving ? (
                <>
                  <span className="ap-btn-spinner"></span>
                  Saving...
                </>
              ) : (
                <>
                  <i className="bi bi-check-lg"></i>
                  {editingProduct ? "Update Product" : "Save Product"}
                </>
              )}
            </button>

            <button
              type="button"
              className="ap-btn ap-btn-outline"
              onClick={resetForm}
              disabled={saving}
            >
              Clear Form
            </button>
          </div>
        </form>
      </section>

      {/* LIST HEADING */}
      <div className="ap-list-head">
        <div>
          <span className="ap-mini-label">INVENTORY</span>
          <h3>All Products</h3>
          <p>{products.length} products in your database</p>
        </div>

        <button
          type="button"
          className="ap-btn ap-btn-outline"
          onClick={fetchProducts}
          disabled={loading}
        >
          <i className="bi bi-arrow-clockwise"></i>
          Refresh
        </button>
      </div>

      {/* LIST */}
      {loading ? (
        <div className="ap-state">
          <span className="ap-spinner"></span>
          <p>Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="ap-state">
          <i className="bi bi-box"></i>
          <h4>No Products Found</h4>
          <p>Add your first product using the form above.</p>
        </div>
      ) : (
        <div className="ap-grid">
          {products.map((product, index) => {
            const productImages = getProductImages(product);

            return (
              <article className="ap-card" key={product.id}>
                <div className="ap-card-top">
                  <span
                    className={`ap-badge ${
                      product.is_active ? "is-active" : "is-inactive"
                    }`}
                  >
                    {product.is_active ? "Active" : "Inactive"}
                  </span>

                  <span className="ap-code">
                    DG-{String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* IMAGES */}
                {productImages.length > 0 && (
                  <div
                    className={`ap-media ${
                      productImages.length === 1 ? "is-single" : ""
                    }`}
                  >
                    {productImages.map((url, i) => (
                      <img
                        key={url}
                        src={url}
                        alt={`${product.name} image ${i + 1}`}
                        loading="lazy"
                      />
                    ))}
                  </div>
                )}

                {/* VIDEO */}
                {product.video_url && (
                  <div className="ap-video">
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

                {/* NO MEDIA */}
                {productImages.length === 0 && !product.video_url && (
                  <div className="ap-placeholder">
                    <i className="bi bi-image"></i>
                  </div>
                )}

                <div className="ap-body">
                  <span className="ap-category">
                    {product.category || "Uncategorized"}
                  </span>

                  <h4>{product.name}</h4>

                  <p>{product.description || "No description available."}</p>

                  <div className="ap-meta">
                    {productImages.length > 0 && (
                      <span>
                        <i className="bi bi-images"></i>
                        {productImages.length} image(s)
                      </span>
                    )}

                    {product.video_url && (
                      <span>
                        <i className="bi bi-camera-video"></i>
                        Video
                      </span>
                    )}
                  </div>

                  <div className="ap-actions">
                    <button
                      type="button"
                      className="ap-act ap-act-edit"
                      onClick={() => startEditing(product)}
                    >
                      <i className="bi bi-pencil"></i>
                      Edit
                    </button>

                    <button
                      type="button"
                      className="ap-act"
                      onClick={() => toggleStatus(product)}
                    >
                      <i
                        className={`bi ${
                          product.is_active ? "bi-eye-slash" : "bi-eye"
                        }`}
                      ></i>
                      {product.is_active ? "Hide" : "Show"}
                    </button>

                    <button
                      type="button"
                      className="ap-act ap-act-delete"
                      onClick={() => deleteProduct(product.id)}
                    >
                      <i className="bi bi-trash"></i>
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminProducts;