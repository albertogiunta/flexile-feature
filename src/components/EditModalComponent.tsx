import React, { useState, useEffect } from "react";
import type { FreelancerData, Service, Company, ExternalLink } from "../types";

interface Props {
  freelancerData: FreelancerData;
}

const EditModalComponent: React.FC<Props> = ({
  freelancerData: initialData,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FreelancerData>(initialData);

  const updateField = (field: keyof FreelancerData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  function onClose() {
    console.log("Closing modal");
    setShowModal(false);
  }

  const addService = () => {
    setFormData((prev) => ({
      ...prev,
      services: [
        {
          name: "",
          price: 0,
          description: "",
          timesPerformed: 0,
          icon: "",
          highlighted: false,
        },
        ...prev.services,
      ],
    }));
  };

  const removeService = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  };

  const addCompany = () => {
    // @ts-ignore
    setFormData((prev) => ({
      ...prev,
      companies: [
        {
          name: "",
          url: "",
          features: [],
          verified: false,
          earnings: undefined,
          duration: "",
        },
        ...prev.companies,
      ],
    }));
  };

  const removeCompany = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      companies: prev.companies.filter((_, i) => i !== index),
    }));
  };

  const addFeature = (companyIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      companies: prev.companies.map((company, i) =>
        i === companyIndex
          ? { ...company, features: [...company.features, ""] }
          : company
      ),
    }));
  };

  const removeFeature = (companyIndex: number, featureIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      companies: prev.companies.map((company, i) =>
        i === companyIndex
          ? {
              ...company,
              features: company.features.filter((_, j) => j !== featureIndex),
            }
          : company
      ),
    }));
  };

  const addLink = () => {
    setFormData((prev) => ({
      ...prev,
      externalLinks: [{ name: "", url: "", icon: "" }, ...prev.externalLinks],
    }));
  };

  const removeLink = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      externalLinks: prev.externalLinks.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const DeleteIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );

  const XIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  return (
    <div>
      <button
        className="bg-black text-white px-4 mr-8 py-2 border-2 border-white hover:bg-white hover:text-black transition-colors duration-300"
        onClick={() => {
          console.log("Opening modal");
          setShowModal(true);
        }}
      >
        Edit
      </button>

      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          id="editModal"
        >
          <div className="bg-white text-black p-8 max-w-4xl w-full mx-4 my-16 overflow-y-auto max-h-[90vh] rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Edit Flexile Profile</h2>
              <button
                type="button"
                onClick={onClose}
                className="text-black hover:text-gray-700"
                aria-label="Close modal"
              >
                <XIcon />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              {/* Basic Info Section */}
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="Enter your name"
                      className="w-full border px-2 py-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="title" className="block mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={(e) => updateField("title", e.target.value)}
                      placeholder="Enter your title"
                      className="w-full border px-2 py-1"
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <label htmlFor="bio" className="block mb-1">
                    Bio
                  </label>
                  <input
                    type="text"
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={(e) => updateField("bio", e.target.value)}
                    placeholder="Enter your bio"
                    className="w-full border px-2 py-1"
                  />
                </div>
              </div>

              {/* Services Section */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold">Services</h3>
                  <button
                    type="button"
                    onClick={addService}
                    className="bg-black text-white px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={formData.services.length >= 3}
                  >
                    Add Service
                  </button>
                </div>
                <div id="servicesContainer">
                  {formData.services.map((service, index) => (
                    <div key={index} className="service-item mb-4 p-2">
                      <div className="flex items-center mb-2">
                        <input
                          type="text"
                          name={`services[${index}].name`}
                          value={service.name}
                          onChange={(e) => {
                            const newServices = [...formData.services];
                            newServices[index].name = e.target.value;
                            updateField("services", newServices);
                          }}
                          placeholder="Service name"
                          className="flex-grow border px-2 py-1 mr-2"
                        />
                        <button
                          type="button"
                          onClick={() => removeService(index)}
                          className="text-black hover:text-gray-700"
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                      <input
                        type="number"
                        name={`services[${index}].price`}
                        value={service.price}
                        onChange={(e) => {
                          const newServices = [...formData.services];
                          newServices[index].price = Number(e.target.value);
                          updateField("services", newServices);
                        }}
                        placeholder="Service price"
                        className="w-full border px-2 py-1 mb-2"
                      />
                      <input
                        type="text"
                        name={`services[${index}].description`}
                        value={service.description}
                        onChange={(e) => {
                          const newServices = [...formData.services];
                          newServices[index].description = e.target.value;
                          updateField("services", newServices);
                        }}
                        placeholder="Service description"
                        className="w-full border px-2 py-1 mb-2"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Companies Section */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold">Companies</h3>
                  <button
                    type="button"
                    onClick={addCompany}
                    className="bg-black text-white px-2 py-1"
                  >
                    Add Company
                  </button>
                </div>
                <div id="companiesContainer">
                  {formData.companies.map((company, companyIndex) => (
                    <div key={companyIndex} className="company-item mb-4 p-2">
                      <div className="flex items-center mb-2">
                        <input
                          type="text"
                          name={`companies[${companyIndex}].name`}
                          value={company.name}
                          onChange={(e) => {
                            const newCompanies = [...formData.companies];
                            newCompanies[companyIndex].name = e.target.value;
                            updateField("companies", newCompanies);
                          }}
                          placeholder="Company name"
                          className="flex-grow border px-2 py-1 mr-2"
                        />
                        <button
                          type="button"
                          onClick={() => removeCompany(companyIndex)}
                          className="text-black hover:text-gray-700"
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                      <input
                        type="text"
                        name={`companies[${companyIndex}].url`}
                        value={company.url}
                        onChange={(e) => {
                          const newCompanies = [...formData.companies];
                          newCompanies[companyIndex].url = e.target.value;
                          updateField("companies", newCompanies);
                        }}
                        placeholder="Company URL"
                        className="w-full border px-2 py-1 mb-2"
                      />
                      <div className="features-container">
                        {company.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="feature-item flex mb-2"
                          >
                            <input
                              type="text"
                              name={`companies[${companyIndex}].features[${featureIndex}]`}
                              value={feature}
                              onChange={(e) => {
                                const newCompanies = [...formData.companies];
                                newCompanies[companyIndex].features[
                                  featureIndex
                                ] = e.target.value;
                                updateField("companies", newCompanies);
                              }}
                              placeholder="Contribution description"
                              className="flex-grow border px-2 py-1 mr-2"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                removeFeature(companyIndex, featureIndex)
                              }
                              className="text-black hover:text-gray-600"
                            >
                              <XIcon />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addFeature(companyIndex)}
                          className="bg-white text-black border border-black px-2 py-1 mb-2"
                        >
                          Add Contribution
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* External Links Section */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold">External Links</h3>
                  <button
                    type="button"
                    onClick={addLink}
                    className="bg-black text-white px-2 py-1"
                  >
                    Add Link
                  </button>
                </div>
                <div id="linksContainer">
                  {formData.externalLinks.map((link, index) => (
                    <div key={index} className="link-item mb-4 p-2 ">
                      <div className="flex items-center mb-2">
                        <input
                          type="text"
                          name={`externalLinks[${index}].name`}
                          value={link.name}
                          onChange={(e) => {
                            const newLinks = [...formData.externalLinks];
                            newLinks[index].name = e.target.value;
                            updateField("externalLinks", newLinks);
                          }}
                          placeholder="Link name"
                          className="flex-grow border px-2 py-1 mr-2"
                        />
                        <button
                          type="button"
                          onClick={() => removeLink(index)}
                          className="text-black hover:text-gray-700"
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                      <input
                        type="text"
                        name={`externalLinks[${index}].url`}
                        value={link.url}
                        onChange={(e) => {
                          const newLinks = [...formData.externalLinks];
                          newLinks[index].url = e.target.value;
                          updateField("externalLinks", newLinks);
                        }}
                        placeholder="Link URL"
                        className="w-full border px-2 py-1 mb-2"
                      />
                      <input
                        type="text"
                        name={`externalLinks[${index}].icon`}
                        value={link.icon}
                        onChange={(e) => {
                          const newLinks = [...formData.externalLinks];
                          newLinks[index].icon = e.target.value;
                          updateField("externalLinks", newLinks);
                        }}
                        placeholder="Link icon"
                        className="w-full border px-2 py-1 mb-2"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="border-2 border-black text-black px-6 py-3 mr-4 text-lg font-semibold hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-black text-white px-6 py-3 text-lg font-semibold hover:bg-gray-800"
                  onClick={() => {
                    alert(
                      `[ALB - For the future] Update call to backend with data:\n\n\n\n ${JSON.stringify(
                        formData,
                        null,
                        2
                      )}`
                    );
                  }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditModalComponent;
