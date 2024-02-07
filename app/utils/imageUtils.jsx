// Jia Yu's code

// Function to resize an image
export const resizeImage = async (imageUrl, width, height) => {
  try {
    const img = new Image();
    img.crossOrigin = "anonymous";

    const bitmap = await new Promise((resolve, reject) => {
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = imageUrl;
    });

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    context.drawImage(bitmap, 0, 0, width, height);

    // Get the data URL of the resized image
    return canvas.toDataURL("image/jpeg");
  } catch (error) {
    console.error("Error resizing image:", error);
    throw error;
  }
};

// Function to flip an image upside down
export const flipImageUpsideDown = async (imageUrl) => {
  try {
    const img = await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = imageUrl;
    });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Set the canvas dimensions to match the image dimensions
    canvas.width = img.width;
    canvas.height = img.height;

    // Flip the image upside down by drawing it with a transformation matrix
    context.translate(0, img.height);
    context.scale(1, -1);

    // Draw the flipped image onto the canvas
    context.drawImage(img, 0, 0);

    // Get the data URL of the flipped image
    return canvas.toDataURL("image/png");
  } catch (error) {
    console.error("Error flipping image upside down:", error);
    throw error;
  }
};
