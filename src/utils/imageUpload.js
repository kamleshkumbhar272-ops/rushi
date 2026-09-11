// Compress an image for a fast preview/upload.
export function fileToCompressedDataUrl(file, maxSize = 960, quality = 0.82) {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error("No file provided"));
    if (!file.type.startsWith("image/")) {
      return reject(new Error("Please choose an image file"));
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Could not decode image"));
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > maxSize) {
          height = Math.round((height * maxSize) / width);
          width = maxSize;
        } else if (height > maxSize) {
          width = Math.round((width * maxSize) / height);
          height = maxSize;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Could not prepare image"));
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

export async function uploadMenuImage(supabase, dataUrl) {
  if (!dataUrl || !dataUrl.startsWith("data:image/")) return dataUrl || null;

  const [meta, base64] = dataUrl.split(",");
  const mime = meta.match(/data:(.*?);base64/)?.[1] || "image/jpeg";
  const extension = mime === "image/png" ? "png" : mime === "image/webp" ? "webp" : "jpg";
  const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
  const blob = new Blob([bytes], { type: mime });
  const path = `menu/${crypto.randomUUID()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from("menu-images")
    .upload(path, blob, {
      contentType: mime,
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from("menu-images").getPublicUrl(path);
  return data.publicUrl;
}

export function getMenuImagePathFromUrl(url) {
  if (!url) return null;
  const marker = "/storage/v1/object/public/menu-images/";
  const index = url.indexOf(marker);
  return index === -1 ? null : decodeURIComponent(url.slice(index + marker.length));
}

export async function deleteMenuImage(supabase, url) {
  const path = getMenuImagePathFromUrl(url);
  if (!path) return;
  const { error } = await supabase.storage.from("menu-images").remove([path]);
  if (error) console.warn("Could not remove old menu image:", error.message);
}
