import React, { useState, useEffect } from 'react';
import useForm from '../../hooks/form';
import { validateRequired } from '../../utils/Validation';
import FormWrapper from '../../components/HOCs/FormWrapper';
import { fileService, valueService } from '../../api';

const FileForm = ({ onSubmit }) => {
  const [vendors, setVendors] = useState([]);
  const [systems, setSystems] = useState([]);
  const [tags, setTags] = useState([]);
  const [file, setFile] = useState(null);
  const [useFileNameAsNumber, setUseFileNameAsNumber] = useState(false);

  useEffect(() => {
    // Fetch dropdown and checkbox options from the server
    const fetchOptions = async () => {
      try {
        const vendorOptions = await valueService.getValuesByCategory('vendor');
        const systemOptions = await valueService.getValuesByCategory('system');
        const tagOptions = await valueService.getValuesByCategory('fileTag');
        
        setVendors(vendorOptions);
        setSystems(systemOptions);
        setTags(tagOptions);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, []);

  const validate = (values) => {
    const errors = {};
    errors.fileNumber = validateRequired(values.fileNumber);
    errors.fileType = validateRequired(values.fileType);
    errors.vendor = validateRequired(values.vendor);
    if (values.systems.length === 0) {
      errors.systems = 'Please select at least one system';
    }
    if (!file) {
      errors.file = 'Please attach a file';
    }
    return errors;
  };

  const { values, errors, handleChange, handleSubmit} = useForm(
    {
      fileNumber: '',
      fileType: '',
      vendor: '',
      systems: [],
      tags: [],
    },
    validate
  );

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  
    if (useFileNameAsNumber && selectedFile) {
      const fileNameWithoutExtension = selectedFile.name.split('.').slice(0, -1).join('.');
      handleChange({ target: { name: 'fileNumber', value: fileNameWithoutExtension } });
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    const updatedValues = checked
      ? [...values[name], value]
      : values[name].filter(item => item !== value);
    handleChange({ target: { name, value: updatedValues } });
  };

  const handleUseFileNameChange = (e) => {
    setUseFileNameAsNumber(e.target.checked);
    if (e.target.checked && file) {
      const fileNameWithoutExtension = file.name.split('.').slice(0, -1).join('.');
      handleChange({ target: { name: 'fileNumber', value: fileNameWithoutExtension } });
    }
  };

  const submitForm = async (formValues) => {
    const formData = new FormData();
    formData.append('file', file);

    console.log('submitting form with values:', formValues);
    
    // Append each form value to formData
    Object.keys(formValues).forEach(key => {
      if (Array.isArray(formValues[key])) {
        formValues[key].forEach(value => formData.append(key + '[]', value));
      } else {
        formData.append(key, formValues[key]);
      }
    });
  
    try {
      const result = await fileService.createFile(formData);
      console.log('File created successfully:', result);
      onSubmit(result);
    } catch (error) {
      console.error('Error creating file:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <form onSubmit={(e) => {
        console.log('Form submitted');
        handleSubmit(submitForm)(e);
      }}>
      <div>
        <label htmlFor="file">Attach File:</label>
        <input
          type="file"
          id="file"
          name="file"
          onChange={handleFileChange}
        />
        {errors.file && <span className="error">{errors.file}</span>}
      </div>

      <div>
        <input
          type="checkbox"
          id="useFileName"
          checked={useFileNameAsNumber}
          onChange={handleUseFileNameChange}
        />
        <label htmlFor="useFileName">Use file name as File Number</label>
      </div>

      <div>
        <label htmlFor="fileNumber">File Number:</label>
        <input
          type="text"
          id="fileNumber"
          name="fileNumber"
          value={values.fileNumber}
          onChange={handleChange}
          readOnly={useFileNameAsNumber}
        />
        {errors.fileNumber && <span className="error">{errors.fileNumber}</span>}
      </div>

      <div>
        <label htmlFor="fileType">File Type:</label>
        <input
          type="text"
          id="fileType"
          name="fileType"
          value={values.fileType}
          onChange={handleChange}
        />
        {errors.fileType && <span className="error">{errors.fileType}</span>}
      </div>

      <div>
        <label htmlFor="vendor">Vendor:</label>
        <select
          id="vendor"
          name="vendor"
          value={values.vendor}
          onChange={handleChange}
        >
          <option value="">Select a vendor</option>
          {vendors.map(vendor => (
            <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
          ))}
        </select>
        {errors.vendor && <span className="error">{errors.vendor}</span>}
      </div>

      <div>
        <label>Systems:</label>
        {systems.map(system => (
          <div key={system.id}>
            <input
              type="checkbox"
              id={`system-${system.id}`}
              name="systems"
              value={system.id}
              checked={values.systems.includes(system.id)}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={`system-${system.id}`}>{system.name}</label>
          </div>
        ))}
        {errors.systems && <span className="error">{errors.systems}</span>}
      </div>

      <div>
        <label>Tags:</label>
        {tags.map(tag => (
          <div key={tag.id}>
            <input
              type="checkbox"
              id={`tag-${tag.id}`}
              name="tags"
              value={tag.id}
              checked={values.tags.includes(tag.id)}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={`tag-${tag.id}`}>{tag.name}</label>
          </div>
        ))}
      </div>

      <button type="submit">Create File</button>
    </form>
  );
};

export default FormWrapper(FileForm);