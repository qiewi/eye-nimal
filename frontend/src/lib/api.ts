const BACKEND_URL = 'https://eye-nimal-production.up.railway.app';

export async function predictAnimal(base64Image: string) {
  // Convert base64 to Blob
  const res = await fetch(base64Image);
  const blob = await res.blob();
  const formData = new FormData();
  formData.append('file', blob, 'image.jpg');

  try {
    const response = await fetch(`${BACKEND_URL}/predict`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Prediction error:', error);
    throw error;
  }
}