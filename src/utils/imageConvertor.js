export async function imageConvertor(dataUrl, fileName,type) {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], fileName, { type: type });
}
