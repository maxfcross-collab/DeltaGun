import { useEffect, useState } from "react";
import { defaultSiteContent } from "../lib/siteContent";
import { supabase } from "../lib/supabase";
import AdminLayout from "../components/AdminLayout";
import "./AdminContent.css";

const pageFields = {
  home: [
    {
      title: "Hero Section",
      description: "Main heading and introductory content.",
      fields: [
        ["heroLabel", "Hero Label"],
        ["heroTitle", "Hero Heading"],
        ["heroDescription", "Hero Description"],
        ["heroPrimaryButton", "Primary Button Text"],
        ["heroSecondaryButton", "Secondary Button Text"],
      ],
    },
    {
      title: "Features Section",
      description: "Introduction displayed in the features section.",
      fields: [
        ["featuresLabel", "Features Label"],
        ["featuresTitle", "Features Heading"],
        ["featuresDescription", "Features Description"],
      ],
    },
    {
      title: "Brand Introduction",
      description: "Your brand introduction and description.",
      fields: [
        ["brandTitle", "Brand Heading"],
        ["brandDescription", "Brand Description"],
      ],
    },
    {
      title: "Call To Action",
      description: "Closing message displayed on the Home page.",
      fields: [
        ["ctaLabel", "CTA Label"],
        ["ctaTitle", "CTA Heading"],
        ["ctaDescription", "CTA Description"],
      ],
    },
  ],

  about: [
    {
      title: "About Hero",
      description: "Main introduction of the About page.",
      fields: [
        ["heroLabel", "Hero Label"],
        ["heroTitle", "Hero Heading"],
        ["heroDescription", "Hero Description"],
        ["heroDescription2", "Second Hero Description"],
      ],
    },
    {
      title: "Our Values",
      description: "Edit all three value cards.",
      fields: [
        ["valuesLabel", "Values Label"],
        ["valuesTitle", "Values Heading"],
        ["valuesDescription", "Values Description"],
        ["valuesCards.0.title", "Value Card 1 Title"],
        ["valuesCards.0.description", "Value Card 1 Description"],
        ["valuesCards.0.icon", "Value Card 1 Icon"],
        ["valuesCards.1.title", "Value Card 2 Title"],
        ["valuesCards.1.description", "Value Card 2 Description"],
        ["valuesCards.1.icon", "Value Card 2 Icon"],
        ["valuesCards.2.title", "Value Card 3 Title"],
        ["valuesCards.2.description", "Value Card 3 Description"],
        ["valuesCards.2.icon", "Value Card 3 Icon"],
      ],
    },
    {
      title: "Why Delta Gun",
      description: "Edit the information card and checklist.",
      fields: [
        ["whyLabel", "Why Us Label"],
        ["whyTitle", "Why Us Heading"],
        ["whyDescription", "Why Us Description"],
        ["whyParagraph2", "Additional Description"],
        ["checklist.0", "Checklist Item 1"],
        ["checklist.1", "Checklist Item 2"],
        ["checklist.2", "Checklist Item 3"],
        ["checklist.3", "Checklist Item 4"],
        ["whyCardTitle", "Information Card Heading"],
        ["whyCardDescription", "Information Card Description"],
        ["whyMeta.0.label", "Meta Label 1"],
        ["whyMeta.1.label", "Meta Label 2"],
        ["whyMeta.2.label", "Meta Label 3"],
      ],
    },
    {
      title: "Highlights",
      description: "Edit all four highlight cards.",
      fields: [
        ["highlightsLabel", "Highlights Label"],
        ["highlightsTitle", "Highlights Heading"],
        ["highlightsDescription", "Highlights Description"],
        ["highlightsCards.0.title", "Highlight 1 Title"],
        ["highlightsCards.0.description", "Highlight 1 Description"],
        ["highlightsCards.0.icon", "Highlight 1 Icon"],
        ["highlightsCards.1.title", "Highlight 2 Title"],
        ["highlightsCards.1.description", "Highlight 2 Description"],
        ["highlightsCards.1.icon", "Highlight 2 Icon"],
        ["highlightsCards.2.title", "Highlight 3 Title"],
        ["highlightsCards.2.description", "Highlight 3 Description"],
        ["highlightsCards.2.icon", "Highlight 3 Icon"],
        ["highlightsCards.3.title", "Highlight 4 Title"],
        ["highlightsCards.3.description", "Highlight 4 Description"],
        ["highlightsCards.3.icon", "Highlight 4 Icon"],
      ],
    },
    {
      title: "Call To Action",
      description: "Closing message on the About page.",
      fields: [
        ["ctaLabel", "CTA Label"],
        ["ctaTitle", "CTA Heading"],
        ["ctaDescription", "CTA Description"],
      ],
    },
  ],

  contact: [
    {
      title: "Contact Hero",
      description: "Main introduction of the Contact page.",
      fields: [
        ["heroLabel", "Hero Label"],
        ["heroTitle", "Hero Heading"],
        ["heroDescription", "Hero Description"],
      ],
    },
    {
      title: "Contact Information",
      description: "Your business contact details.",
      fields: [
        ["infoLabel", "Information Label"],
        ["infoTitle", "Information Heading"],
        ["infoDescription", "Information Description"],
        ["phone", "Phone Number"],
        ["email", "Email Address"],
        ["address", "Shop Address"],
      ],
    },
    {
      title: "Contact Form Content",
      description: "Text displayed around the contact form.",
      fields: [
        ["formLabel", "Form Label"],
        ["formTitle", "Form Heading"],
        ["formDescription", "Form Description"],
      ],
    },
    {
      title: "Social Media",
      description: "Your social media introduction and links.",
      fields: [
        ["socialLabel", "Social Label"],
        ["socialTitle", "Social Heading"],
        ["socialDescription", "Social Description"],
        ["facebook", "Facebook URL"],
        ["instagram", "Instagram URL"],
        ["youtube", "YouTube URL"],
        ["whatsapp", "WhatsApp URL"],
      ],
    },
  ],
};

const pageInfo = {
  home: {
    label: "Home Page",
    icon: "bi-house-door",
    description: "Manage the content displayed on your website homepage.",
  },
  about: {
    label: "About Page",
    icon: "bi-info-circle",
    description: "Manage your brand introduction and About page content.",
  },
  contact: {
    label: "Contact Page",
    icon: "bi-envelope",
    description: "Manage your contact details and social media information.",
  },
};

const getFieldType = (field) => {
  if (field.endsWith(".icon")) return "text";
  if (field === "email") return "email";
  if (field === "phone") return "tel";
  if (["facebook", "instagram", "youtube", "whatsapp"].includes(field)) {
    return "url";
  }
  return "text";
};

const isTextarea = (field) =>
  field.toLowerCase().includes("description") || field === "address";

function AdminContent() {
  const [activeTab, setActiveTab] = useState("home");
  const [content, setContent] = useState(defaultSiteContent);
  const [savedContent, setSavedContent] = useState(defaultSiteContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const isDirty =
    JSON.stringify(content[activeTab]) !==
    JSON.stringify(savedContent[activeTab]);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("site_content")
        .select("content_key, content")
        .in("content_key", ["home", "about", "contact"]);

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const updatedContent = {
        home: { ...defaultSiteContent.home },
        about: { ...defaultSiteContent.about },
        contact: { ...defaultSiteContent.contact },
      };

      (data || []).forEach((item) => {
        if (
          item.content_key &&
          updatedContent[item.content_key] &&
          item.content
        ) {
          updatedContent[item.content_key] = {
            ...updatedContent[item.content_key],
            ...item.content,
          };
        }
      });

      setContent(updatedContent);
      setSavedContent(updatedContent);
      setLoading(false);
    };

    fetchContent();
  }, []);

  const handleChange = (field, value) => {
    const parts = field.split(".");

    setContent((previous) => {
      const updatedPage = { ...previous[activeTab] };

      let current = updatedPage;

      for (let i = 0; i < parts.length - 1; i++) {
        const key = parts[i];

        current[key] = Array.isArray(current[key])
          ? [...current[key]]
          : { ...current[key] };

        current = current[key];
      }

      current[parts[parts.length - 1]] = value;

      return {
        ...previous,
        [activeTab]: updatedPage,
      };
    });

    setMessage("");
    setError("");
  };

  const handleTabChange = (tab) => {
    if (isDirty) {
      const confirmed = window.confirm(
        "You have unsaved changes. Switch page without saving?"
      );

      if (!confirmed) return;
    }

    setActiveTab(tab);
    setMessage("");
    setError("");
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    setError("");

    const contentToSave = { ...content[activeTab] };

    const { error } = await supabase.from("site_content").upsert(
      {
        content_key: activeTab,
        page: activeTab,
        content: contentToSave,
        is_published: true,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "content_key" }
    );

    if (error) {
      setError(error.message);
      setSaving(false);
      return;
    }

    setSavedContent((previous) => ({
      ...previous,
      [activeTab]: contentToSave,
    }));

    setMessage(`${pageInfo[activeTab].label} content saved successfully!`);
    setSaving(false);
  };

  const totalFields = Object.values(pageFields).reduce(
    (total, groups) =>
      total + groups.reduce((sum, group) => sum + group.fields.length, 0),
    0
  );

  return (
    <AdminLayout
      eyebrow="SYS.ADMIN // CONTENT"
      title="Page Content"
      subtitle="Edit and manage the information displayed across your website."
    >
      {/* STATISTICS */}
      <div className="ac-stats">
        <div className="ac-stat">
          <strong>3</strong>
          <span>WEBSITE PAGES</span>
        </div>

        <div className="ac-stat">
          <strong>{totalFields}</strong>
          <span>EDITABLE FIELDS</span>
        </div>

        <div className="ac-stat ac-stat-blue">
          <strong>{isDirty ? "Unsaved" : "Saved"}</strong>
          <span>CURRENT PAGE STATUS</span>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="ac-toolbar">
        <div>
          <span className="ac-mini-label">CONTENT EDITOR</span>
          <h3>{pageInfo[activeTab].label}</h3>
          <p>{pageInfo[activeTab].description}</p>
        </div>

        <div className="ac-filters">
          {Object.entries(pageInfo).map(([key, info]) => (
            <button
              key={key}
              type="button"
              className={activeTab === key ? "active" : ""}
              onClick={() => handleTabChange(key)}
            >
              <i className={`bi ${info.icon}`}></i>
              <span>{info.label}</span>
              {activeTab === key && (
                <i className="bi bi-check-circle-fill tab-check"></i>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="ac-state">
          <span className="ac-spinner"></span>
          <p>Loading website content...</p>
        </div>
      ) : (
        <>
          <span className={`ac-status ${isDirty ? "unsaved" : "saved"}`}>
            <i
              className={`bi ${
                isDirty ? "bi-circle-fill" : "bi-check-circle-fill"
              }`}
            ></i>
            {isDirty ? "Unsaved Changes" : "All Changes Saved"}
          </span>

          {message && (
            <div className="ac-alert success">
              <i className="bi bi-check-circle-fill"></i>
              <span>{message}</span>
            </div>
          )}

          {error && (
            <div className="ac-alert error">
              <i className="bi bi-exclamation-circle"></i>
              <span>{error}</span>
            </div>
          )}

          <div className="ac-groups">
            {pageFields[activeTab].map((group, groupIndex) => (
              <section className="ac-card" key={group.title}>
                <div className="ac-card-top">
                  <div className="ac-card-title">
                    <div className="ac-code">
                      {String(groupIndex + 1).padStart(2, "0")}
                    </div>

                    <div>
                      <h4>{group.title}</h4>
                      <p>{group.description}</p>
                    </div>
                  </div>

                  <span className="ac-type">
                    {group.fields.length} Fields
                  </span>
                </div>

                <div className="ac-fields">
                  {group.fields.map(([field, label]) => (
                    <div
                      className={`ac-field ${
                        isTextarea(field) ? "full-width" : ""
                      }`}
                      key={field}
                    >
                      <label htmlFor={`content-${field}`}>{label}</label>

                      {isTextarea(field) ? (
                        <textarea
                          id={`content-${field}`}
                          rows={4}
                          value={content[activeTab][field] || ""}
                          onChange={(e) => handleChange(field, e.target.value)}
                          placeholder={`Enter ${label.toLowerCase()}...`}
                        />
                      ) : (
                        <input
                          id={`content-${field}`}
                          type={getFieldType(field)}
                          value={content[activeTab][field] || ""}
                          onChange={(e) => handleChange(field, e.target.value)}
                          placeholder={`Enter ${label.toLowerCase()}...`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* SAVE BAR */}
          <div className="ac-save-bar">
            <div className="ac-save-note">
              <i className="bi bi-info-circle"></i>
              <span>Save your changes to update the published page content.</span>
            </div>

            <button
              type="button"
              className="ac-btn"
              onClick={handleSave}
              disabled={saving || !isDirty}
            >
              {saving ? (
                <>
                  <span className="ac-spin-sm"></span>
                  Saving...
                </>
              ) : (
                <>
                  <i className="bi bi-cloud-check"></i>
                  Save Changes
                </>
              )}
            </button>
          </div>
        </>
      )}
    </AdminLayout>
  );
}

export default AdminContent;