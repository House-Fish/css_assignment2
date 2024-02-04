import React, { useState, useEffect } from 'react';

export default function Customize({ name }) {
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [images, setImages] = useState({});
  
  useEffect(() => {
    try {
      // Retrieve images from localStorage on component mount
      const storedImages = JSON.parse(localStorage.getItem('images' + name)) || {};
      const storedSelectedImageUrl = localStorage.getItem('selectedImage' + name) || '';
      setImages(storedImages);
      setSelectedImageUrl(storedSelectedImageUrl);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.error('LocalStorage space exceeded:', error.message);
        alert('LocalStorage space exceeded. Unable to load images.');
      } else {
        throw error; // Re-throw other errors
      }
    }
  }, [name]);

  const handleOptionChange = (event) => {
    const selectedOption = event.target.value;

    if (selectedOption === 'Add Custom Image') {
      fileInputRef.current.click(); // Trigger the file input to open the file dialog
    } else if (selectedOption === 'Remove Selected Image') {
      removeSelectedImage();
    } else {
      setSelectedImageUrl(selectedOption);

      // Save selected image URL to localStorage
      localStorage.setItem('selectedImage' + name, selectedOption);
    }
  };

  const handleAddImage = (event) => {
    const file = event.target.files[0];
  
    if (file) {
      try {
        if (!file.type.startsWith('image/')) {
          alert('Please select a valid image file.');
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target.result;
  
          // Save custom image to localStorage with file name as option
          const newImages = { ...images, [file.name]: imageUrl };
  
          try {
            localStorage.setItem('images' + name, JSON.stringify(newImages));
            setImages(newImages);
          } catch (localStorageError) {
            // Handle localStorage space limitation
            console.error('LocalStorage space exceeded:', localStorageError.message);
            alert('LocalStorage space exceeded. Unable to save custom image.');
          }
        };
  
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error processing file:', error.message);
        // Handle other potential errors related to file processing
      }
    }
  };
  
  const removeSelectedImage = () => {
    if (selectedImageUrl) {
      const selectedImageName = Object.keys(images).find((key) => images[key] === selectedImageUrl);
      const confirmDelete = window.confirm(`Are you sure you want to remove ${selectedImageName}?`);

      if (confirmDelete) {
        // Remove the selected image from localStorage
        const { [selectedImageName]: deletedImage, ...newImages } = images;
        localStorage.setItem('images' + name, JSON.stringify(newImages));
        setImages(newImages);
        setSelectedImageUrl('');

        // Remove selected image URL from localStorage
        localStorage.removeItem('selectedImage' + name);
      }
    }
  };

  const fileInputRef = React.createRef();

  return (
    <div>
      <span>{name}</span>
      <select id="imageSelect" value={selectedImageUrl} onChange={handleOptionChange}>
        <option>Sparrow</option>
        <option>Classic</option>
        {Object.keys(images).map((imageName, index) => (
          <option key={index} value={images[imageName]}>
            {imageName}
          </option>
        ))}
        <option value="Add Custom Image">Add Custom Image</option>
        <option value="Remove Selected Image">Remove Selected Image</option>
      </select>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleAddImage}
      />
    </div>
  );
};
