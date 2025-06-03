export async function predictAnimal(base64Image: string) {
  // Convert base64 to Blob
  const res = await fetch(base64Image);
  const blob = await res.blob();
  const formData = new FormData();
  formData.append('file', blob, 'image.jpg');

  const response = await fetch('http://localhost:8000/predict', {
    method: 'POST',
    body: formData,
  });
  return await response.json();
}