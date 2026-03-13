import { useRef } from "react";

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Failed to read file."));
    reader.readAsDataURL(file);
  });

const ImageUploader = ({ photos, setPhotos, error }) => {
  const inputRef = useRef(null);

  const handleFiles = async (event) => {
    const incoming = Array.from(event.target.files || []);
    if (!incoming.length) return;

    const remaining = Math.max(0, 3 - photos.length);
    const sliced = incoming.slice(0, remaining);
    const mapped = await Promise.all(
      sliced.map(async (file) => ({
        id: `${file.name}-${file.lastModified}`,
        name: file.name,
        dataUrl: await readFileAsDataUrl(file),
      }))
    );

    setPhotos((prev) => [...prev, ...mapped]);
    event.target.value = "";
  };

  const handleRemove = (id) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-ink-900 dark:text-white">
          Upload Site Photos
        </p>
        <span className="text-xs text-ink-500 dark:text-ink-300">
          {photos.length}/3 uploaded
        </span>
      </div>

      <div className="rounded-2xl border border-dashed border-slate-200 p-4 text-sm text-slate-400 dark:border-ink-700 dark:text-ink-300">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium text-ink-700 dark:text-ink-200">
              Drag and drop or browse
            </p>
            <p className="text-xs">JPG or PNG, up to 3 images.</p>
          </div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-full bg-ink-900 px-4 py-2 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-ink-700 active:translate-y-0 dark:bg-white dark:text-ink-900 dark:hover:bg-ink-200"
          >
            Select Images
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFiles}
          className="hidden"
        />
      </div>

      {error && <p className="text-xs text-danger">{error}</p>}

      {photos.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative overflow-hidden rounded-xl border border-ink-100 bg-white shadow-soft dark:border-ink-800 dark:bg-ink-900"
            >
              <img
                src={photo.dataUrl}
                alt={photo.name}
                className="h-24 w-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemove(photo.id)}
                className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold text-ink-800 shadow-sm transition hover:bg-white dark:bg-ink-900/80 dark:text-white"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
