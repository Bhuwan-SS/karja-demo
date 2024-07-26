// utility function to convert base64 to a File object
export function base64ToFile(base64String) {
    // Decode base64 string to binary data
    const byteString = atob(base64String.split(',')[1]);
  
    // Create an ArrayBuffer and a view (as unsigned 8-bit)
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
  
    // Convert binary data to an array
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
  
    // Generate a unique file name
    const fileName = `image_${Date.now()}.png`;
  
    // Create a Blob from the array
    const blob = new Blob([ab], { type: 'image/png' });
  
    // Create a File from the Blob
    return new File([blob], fileName, { type: 'image/png' });
  }
  