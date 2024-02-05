import React, { useState, useEffect } from 'react';

export default function Customize({ name, defaultImages, width, height}) {
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [images, setImages] = useState({});
  
  useEffect(() => {
    try {
      // Retrieve images from localStorage on component mount
      const storedImages = JSON.parse(localStorage.getItem('images' + name)) || {};
      const storedSelectedImageUrl = localStorage.getItem('selectedImage' + name) || '';

      // If there's no stored selected image, set it to the first default image
      if (!storedSelectedImageUrl && defaultImages.length > 0) {
        const firstDefaultImage = '/' + defaultImages[0];
        setSelectedImageUrl(firstDefaultImage);

        // Save selected image URL to localStorage
        localStorage.setItem('selectedImage' + name, firstDefaultImage);
      } else {
        setSelectedImageUrl(storedSelectedImageUrl);
      }

      setImages(storedImages);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.error('LocalStorage space exceeded:', error.message);
        alert('LocalStorage space exceeded. Unable to load images.');
      } else {
        throw error; // Re-throw other errors
      }
    }
  }, [name, defaultImages]);

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

  const handleAddImage = async (event) => {
    const file = event.target.files[0];
  
    if (file) {
      try {
        if (!file.type.startsWith('image/')) {
          alert('Please select a valid image file.');
          return;
        }
  
        const reader = new FileReader();
        reader.onload = async (e) => {
          const imageUrl = e.target.result;
  
          // Resize the image using createImageBitmap
          const resizedImageDataURL = await resizeImage(imageUrl, width, height);
  
          // Save custom image to localStorage with file name as option
          const newImages = { ...images, [file.name]: resizedImageDataURL };
  
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

  const resizeImage = async (imageUrl, width, height) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d');
  
        // Resize the image using createImageBitmap
        await createImageBitmap(img, { resizeWidth: width, resizeHeight: height })
          .then((bitmap) => {
            context.drawImage(bitmap, 0, 0, width, height);
  
            // Get the data URL of the resized image
            const resizedDataURL = canvas.toDataURL('image/jpeg');
  
            resolve(resizedDataURL);
          })
          .catch((error) => {
            console.error('Error resizing image:', error);
            reject(error);
          });
      };
  
      img.src = imageUrl;
    });
  };

  const removeSelectedImage = () => {
    if (selectedImageUrl) {
      const selectedImageName = Object.keys(images).find((key) => images[key] === selectedImageUrl);
  
      // Check if selectedImageName is not undefined before attempting to replace
      if (selectedImageName !== undefined) {
        const confirmReplace = window.confirm(`Are you sure you want to remove ${selectedImageName}?`);
  
        if (confirmReplace) {
          // Get the initial selected image without modifying the newImages object
          const initialSelectedImage = '/' + defaultImages[0];
  
          // Update localStorage and state
          const { [selectedImageName]: deletedImage, ...newImages } = images;

          // Update localStorage and state
          localStorage.setItem('images' + name, JSON.stringify(newImages));
          setImages(newImages);
          setSelectedImageUrl(initialSelectedImage);
  
          // Save the updated selected image URL to localStorage
          localStorage.setItem('selectedImage' + name, initialSelectedImage);
        }
      }
    }
  };

  const fileInputRef = React.createRef();

  return (
    <div>
      <span>{name}</span>
      <select id="imageSelect" value={selectedImageUrl} onChange={handleOptionChange}>
        {defaultImages.map((imageName) => (
          <option key={imageName} value={'/' + imageName}>
            {imageName}
          </option>
        ))}

        {Object.entries(images).map(([imageName, image]) => (
          <option key={imageName} value={image}>
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
