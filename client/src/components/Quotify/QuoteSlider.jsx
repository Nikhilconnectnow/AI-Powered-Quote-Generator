// // // import { FaChevronLeft, FaChevronRight, FaHeart, FaCopy } from 'react-icons/fa';

// // // const QuoteSlider = ({
// // //   quotes = [],
// // //   currentSlide,
// // //   setCurrentSlide,
// // //   onFavorite,
// // //   onCopy
// // // }) => {
// // //   if (!quotes.length) return null;

// // //   return (
// // //     <section className="bg-white rounded-xl shadow-lg p-6">
// // //       <h2 className="text-2xl font-bold mb-4">Generated Quotes</h2>

// // //       {/* Quote Slides */}
// // //       <div className="relative overflow-hidden rounded-lg">
// // //         <div
// // //           className="flex transition-transform duration-300 ease-in-out"
// // //           style={{ transform: `translateX(-${currentSlide * 100}%)` }}
// // //         >
// // //           {quotes.map((quote, idx) => (
// // //             <div key={idx} className="min-w-full p-6 bg-gray-50 rounded-lg">
// // //               <div className="relative">
// // //                 <span className="absolute left-0 top-0 text-4xl text-indigo-500 opacity-20">"</span>
// // //                 <p className="text-xl italic pl-8 mb-4">{quote}</p>
// // //                 <span className="absolute right-0 bottom-0 text-4xl text-indigo-500 opacity-20 rotate-180">"</span>
// // //               </div>

// // //               <div className="flex justify-end gap-2 mt-4">
// // //                 <button
// // //                   onClick={() => onFavorite(quote)}
// // //                   className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
// // //                   aria-label="Add to favorites"
// // //                 >
// // //                   <FaHeart />
// // //                 </button>
// // //                 <button
// // //                   onClick={() => onCopy(quote)}
// // //                   className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors"
// // //                   aria-label="Copy to clipboard"
// // //                 >
// // //                   <FaCopy />
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>

// // //       {/* Slide Navigation */}
// // //       <div className="flex justify-center gap-4 mt-6">
// // //         <button
// // //           disabled={currentSlide === 0}
// // //           onClick={() => setCurrentSlide(prev => prev - 1)}
// // //           className="p-2 disabled:opacity-50 disabled:cursor-not-allowed"
// // //         >
// // //           <FaChevronLeft />
// // //         </button>

// // //         <div className="flex gap-2">
// // //           {quotes.map((_, idx) => (
// // //             <button
// // //               key={idx}
// // //               onClick={() => setCurrentSlide(idx)}
// // //               className={`w-3 h-3 rounded-full ${
// // //                 idx === currentSlide ? 'bg-indigo-500' : 'bg-gray-300'
// // //               }`}
// // //             />
// // //           ))}
// // //         </div>

// // //         <button
// // //           disabled={currentSlide === quotes.length - 1}
// // //           onClick={() => setCurrentSlide(prev => prev + 1)}
// // //           className="p-2 disabled:opacity-50 disabled:cursor-not-allowed"
// // //         >
// // //           <FaChevronRight />
// // //         </button>
// // //       </div>
// // //     </section>
// // //   );
// // // };

// // // export default QuoteSlider;





// // import { useRef, useState } from 'react';
// // import {
// //   FaChevronLeft,
// //   FaChevronRight,
// //   FaHeart,
// //   FaCopy,
// //   FaImage,
// //   FaDownload,
// //   FaUpload,
// //   FaPhotoVideo,
// // } from 'react-icons/fa';

// // const QuoteSlider = ({
// //   quotes = [],
// //   currentSlide,
// //   setCurrentSlide,
// //   onFavorite,
// //   onCopy,
// // }) => {
// //   const canvasRef = useRef(null);
// //   const [generatedImage, setGeneratedImage] = useState(null);
// //   const [bgImage, setBgImage] = useState(null);
// //   const [aspectRatio, setAspectRatio] = useState('16:9');

// //   // Canvas size logic
// //   const getCanvasSize = (ratio) => {
// //     switch (ratio) {
// //       case '16:9': return [1280, 720];
// //       case '9:16': return [720, 1280];
// //       case '1:1': return [800, 800];
// //       case '3:2': return [1200, 800];
// //       default: return [1280, 720];
// //     }
// //   };

// //   // Preview size logic
// //   const getPreviewSize = (ratio) => {
// //     switch (ratio) {
// //       case '16:9': return { width: '640px', height: '360px' };
// //       case '9:16': return { width: '270px', height: '480px' };
// //       case '1:1': return { width: '400px', height: '400px' };
// //       case '3:2': return { width: '600px', height: '400px' };
// //       default: return { width: '640px', height: '360px' };
// //     }
// //   };

// //   const handleImageUpload = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       const reader = new FileReader();
// //       reader.onload = () => setBgImage(reader.result);
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const handleGenerateImage = (quote) => {
// //     const canvas = canvasRef.current;
// //     const ctx = canvas.getContext('2d');
// //     const [width, height] = getCanvasSize(aspectRatio);
// //     canvas.width = width;
// //     canvas.height = height;

// //     const drawQuote = () => {
// //       ctx.fillStyle = 'rgba(0,0,0,0.4)';
// //       ctx.fillRect(0, 0, width, height);

// //       ctx.fillStyle = 'white';
// //       ctx.font = '28px serif';
// //       ctx.textAlign = 'center';
// //       ctx.textBaseline = 'middle';

// //       const words = quote.split(' ');
// //       let lines = [];
// //       let line = '';
// //       words.forEach((word) => {
// //         const testLine = line + word + ' ';
// //         const testWidth = ctx.measureText(testLine).width;
// //         if (testWidth > width * 0.8) {
// //           lines.push(line);
// //           line = word + ' ';
// //         } else {
// //           line = testLine;
// //         }
// //       });
// //       lines.push(line);

// //       lines.forEach((l, i) => {
// //         ctx.fillText(l.trim(), width / 2, height / 3 + i * 40);
// //       });

// //       setGeneratedImage(canvas.toDataURL());
// //     };

// //     if (bgImage) {
// //       const img = new Image();
// //       img.onload = () => {
// //         ctx.drawImage(img, 0, 0, width, height);
// //         drawQuote();
// //       };
// //       img.src = bgImage;
// //     } else {
// //       ctx.fillStyle = '#f3f4f6';
// //       ctx.fillRect(0, 0, width, height);
// //       drawQuote();
// //     }
// //   };

// //   const handleDownload = () => {
// //     const link = document.createElement('a');
// //     link.download = 'quote-image.png';
// //     link.href = generatedImage;
// //     link.click();
// //   };

// //   if (!quotes.length) return null;

// //   return (
// //     <section className="bg-white rounded-xl shadow-xl p-6 space-y-8">

// //       {/* Quotes */}
// //       <div>
// //         <h2 className="text-2xl font-bold flex items-center gap-2 text-indigo-600">
// //           <FaPhotoVideo /> Generated Quotes
// //         </h2>

// //         <div className="relative overflow-hidden mt-4 rounded-lg">
// //           <div
// //             className="flex transition-transform duration-300 ease-in-out"
// //             style={{ transform: `translateX(-${currentSlide * 100}%)` }}
// //           >
// //             {quotes.map((quote, idx) => (
// //               <div
// //                 key={idx}
// //                 className="min-w-full p-6 bg-gray-100 rounded-lg shadow-inner"
// //               >
// //                 <div className="relative text-gray-800">
// //                   <span className="absolute left-0 top-0 text-4xl text-indigo-500 opacity-20">"</span>
// //                   <p className="text-xl italic pl-8 pr-4 mb-4">{quote}</p>
// //                   <span className="absolute right-0 bottom-0 text-4xl text-indigo-500 opacity-20 rotate-180">"</span>
// //                 </div>

// //                 <div className="flex flex-wrap justify-end gap-3 mt-4">
// //                   <button
// //                     onClick={() => onFavorite(quote)}
// //                     className="flex items-center gap-2 px-3 py-2 text-red-600 border border-red-300 hover:bg-red-100 rounded"
// //                   >
// //                     <FaHeart /> Favorite
// //                   </button>
// //                   <button
// //                     onClick={() => onCopy(quote)}
// //                     className="flex items-center gap-2 px-3 py-2 text-indigo-600 border border-indigo-300 hover:bg-indigo-100 rounded"
// //                   >
// //                     <FaCopy /> Copy
// //                   </button>
// //                   <button
// //                     onClick={() => handleGenerateImage(quote)}
// //                     className="flex items-center gap-2 px-3 py-2 text-green-700 border border-green-300 hover:bg-green-100 rounded"
// //                   >
// //                     <FaImage /> Generate Image
// //                   </button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Navigation */}
// //         <div className="flex justify-center gap-4 mt-4">
// //           <button
// //             disabled={currentSlide === 0}
// //             onClick={() => setCurrentSlide((prev) => prev - 1)}
// //             className="p-2 text-xl bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
// //           >
// //             <FaChevronLeft />
// //           </button>
// //           <div className="flex gap-2 items-center">
// //             {quotes.map((_, idx) => (
// //               <button
// //                 key={idx}
// //                 onClick={() => setCurrentSlide(idx)}
// //                 className={`w-3 h-3 rounded-full ${
// //                   idx === currentSlide ? 'bg-indigo-600' : 'bg-gray-400'
// //                 }`}
// //               />
// //             ))}
// //           </div>
// //           <button
// //             disabled={currentSlide === quotes.length - 1}
// //             onClick={() => setCurrentSlide((prev) => prev + 1)}
// //             className="p-2 text-xl bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
// //           >
// //             <FaChevronRight />
// //           </button>
// //         </div>
// //       </div>

// //       {/* Upload Image */}
// //       <div>
// //         <label className="block text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
// //           <FaUpload className="text-blue-500" />
// //           Upload Background Image:
// //         </label>
// //         <input
// //           type="file"
// //           accept="image/*"
// //           onChange={handleImageUpload}
// //           className="file:mr-4 file:px-4 file:py-2 file:border-0 file:rounded file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 w-full text-gray-600"
// //         />
// //         {bgImage && (
// //           <img
// //             src={bgImage}
// //             alt="Uploaded Preview"
// //             className="mt-4 max-h-48 object-cover rounded shadow border"
// //           />
// //         )}
// //       </div>

// //       {/* Aspect Ratio Dropdown */}
// //       <div>
// //         <label className="block text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
// //           <FaImage className="text-green-500" />
// //           Select Aspect Ratio:
// //         </label>
// //         <select
// //           value={aspectRatio}
// //           onChange={(e) => setAspectRatio(e.target.value)}
// //           className="w-full p-3 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //         >
// //           <option value="16:9">16:9 – Desktop</option>
// //           <option value="9:16">9:16 – Mobile (Portrait)</option>
// //           <option value="1:1">1:1 – Instagram</option>
// //           <option value="3:2">3:2 – Tablet</option>
// //         </select>
// //       </div>

// //       {/* Image Preview & Download */}
// //       {generatedImage && (
// //         <div className="mt-8 text-center space-y-4">
// //           <h3 className="text-lg font-semibold text-gray-700">Preview</h3>
// //           <div
// //             className="mx-auto border rounded-lg shadow overflow-hidden"
// //             style={{
// //               ...getPreviewSize(aspectRatio),
// //             }}
// //           >
// //             <img
// //               src={generatedImage}
// //               alt="Generated Quote"
// //               className="w-full h-full object-cover"
// //             />
// //           </div>

// //           <button
// //             onClick={handleDownload}
// //             className="px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center gap-2"
// //           >
// //             <FaDownload /> Download Image
// //           </button>
// //         </div>
// //       )}

// //       {/* Hidden Canvas */}
// //       <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
// //     </section>
// //   );
// // };

// // export default QuoteSlider;


// import { useRef, useState } from 'react';
// import {
//   FaChevronLeft,
//   FaChevronRight,
//   FaHeart,
//   FaCopy,
//   FaImage,
//   FaDownload,
//   FaUpload,
//   FaPhotoVideo,
// } from 'react-icons/fa';

// const QuoteSlider = ({
//   quotes = [],
//   currentSlide,
//   setCurrentSlide,
//   onFavorite,
//   onCopy,
// }) => {
//   const canvasRef = useRef(null);
//   const [generatedImage, setGeneratedImage] = useState(null);
//   const [bgImage, setBgImage] = useState(null);
//   const [aspectRatio, setAspectRatio] = useState('16:9');

//   // Canvas size logic
//   const getCanvasSize = (ratio) => {
//     switch (ratio) {
//       case '16:9': return [1280, 720];
//       case '9:16': return [720, 1280];
//       case '1:1': return [800, 800];
//       case '3:2': return [1200, 800];
//       default: return [1280, 720];
//     }
//   };

//   // Responsive preview size
//   const getPreviewSize = (ratio) => {
//     switch (ratio) {
//       case '16:9': return { aspectRatio: '16 / 9', maxWidth: '640px' };
//       case '9:16': return { aspectRatio: '9 / 16', maxWidth: '270px' };
//       case '1:1': return { aspectRatio: '1 / 1', maxWidth: '400px' };
//       case '3:2': return { aspectRatio: '3 / 2', maxWidth: '600px' };
//       default: return { aspectRatio: '16 / 9', maxWidth: '640px' };
//     }
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => setBgImage(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleGenerateImage = (quote) => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     const [width, height] = getCanvasSize(aspectRatio);
//     canvas.width = width;
//     canvas.height = height;

//     const drawQuote = () => {
//       ctx.fillStyle = 'rgba(0,0,0,0.4)';
//       ctx.fillRect(0, 0, width, height);

//       ctx.fillStyle = 'white';
//       ctx.font = '28px serif';
//       ctx.textAlign = 'center';
//       ctx.textBaseline = 'middle';

//       const words = quote.split(' ');
//       let lines = [];
//       let line = '';
//       words.forEach((word) => {
//         const testLine = line + word + ' ';
//         const testWidth = ctx.measureText(testLine).width;
//         if (testWidth > width * 0.8) {
//           lines.push(line);
//           line = word + ' ';
//         } else {
//           line = testLine;
//         }
//       });
//       lines.push(line);

//       lines.forEach((l, i) => {
//         ctx.fillText(l.trim(), width / 2, height / 3 + i * 40);
//       });

//       setGeneratedImage(canvas.toDataURL());
//     };

//     if (bgImage) {
//       const img = new Image();
//       img.onload = () => {
//         ctx.drawImage(img, 0, 0, width, height);
//         drawQuote();
//       };
//       img.src = bgImage;
//     } else {
//       ctx.fillStyle = '#f3f4f6';
//       ctx.fillRect(0, 0, width, height);
//       drawQuote();
//     }
//   };

//   const handleDownload = () => {
//     const link = document.createElement('a');
//     link.download = 'quote-image.png';
//     link.href = generatedImage;
//     link.click();
//   };

//   if (!quotes.length) return null;

//   return (
//     <section className="bg-white rounded-xl shadow-xl p-6 space-y-8">

//       {/* Quotes */}
//       <div>
//         <h2 className="text-2xl font-bold flex items-center gap-2 text-indigo-600">
//           <FaPhotoVideo /> Generated Quotes
//         </h2>

//         <div className="relative overflow-hidden mt-4 rounded-lg">
//           <div
//             className="flex transition-transform duration-300 ease-in-out"
//             style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//           >
//             {quotes.map((quote, idx) => (
//               <div
//                 key={idx}
//                 className="min-w-full p-6 bg-gray-100 rounded-lg shadow-inner"
//               >
//                 <div className="relative text-gray-800">
//                   <span className="absolute left-0 top-0 text-4xl text-indigo-500 opacity-20">"</span>
//                   <p className="text-xl italic pl-8 pr-4 mb-4">{quote}</p>
//                   <span className="absolute right-0 bottom-0 text-4xl text-indigo-500 opacity-20 rotate-180">"</span>
//                 </div>

//                 <div className="flex flex-wrap justify-end gap-3 mt-4">
//                   <button
//                     onClick={() => onFavorite(quote)}
//                     className="flex items-center gap-2 px-3 py-2 text-red-600 border border-red-300 hover:bg-red-100 rounded"
//                   >
//                     <FaHeart /> Favorite
//                   </button>
//                   <button
//                     onClick={() => onCopy(quote)}
//                     className="flex items-center gap-2 px-3 py-2 text-indigo-600 border border-indigo-300 hover:bg-indigo-100 rounded"
//                   >
//                     <FaCopy /> Copy
//                   </button>
//                   <button
//                     onClick={() => handleGenerateImage(quote)}
//                     className="flex items-center gap-2 px-3 py-2 text-green-700 border border-green-300 hover:bg-green-100 rounded"
//                   >
//                     <FaImage /> Generate Image
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Navigation */}
//         <div className="flex justify-center gap-4 mt-4">
//           <button
//             disabled={currentSlide === 0}
//             onClick={() => setCurrentSlide((prev) => prev - 1)}
//             className="p-2 text-xl bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
//           >
//             <FaChevronLeft />
//           </button>
//           <div className="flex gap-2 items-center">
//             {quotes.map((_, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => setCurrentSlide(idx)}
//                 className={`w-3 h-3 rounded-full ${
//                   idx === currentSlide ? 'bg-indigo-600' : 'bg-gray-400'
//                 }`}
//               />
//             ))}
//           </div>
//           <button
//             disabled={currentSlide === quotes.length - 1}
//             onClick={() => setCurrentSlide((prev) => prev + 1)}
//             className="p-2 text-xl bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
//           >
//             <FaChevronRight />
//           </button>
//         </div>
//       </div>

//       {/* Upload Image */}
//       <div>
//         <label className="block text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
//           <FaUpload className="text-blue-500" />
//           Upload Background Image:
//         </label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageUpload}
//           className="file:mr-4 file:px-4 file:py-2 file:border-0 file:rounded file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 w-full text-gray-600"
//         />
//         {bgImage && (
//           <img
//             src={bgImage}
//             alt="Uploaded Preview"
//             className="mt-4 max-h-48 object-cover rounded shadow border"
//           />
//         )}
//       </div>

//       {/* Aspect Ratio Dropdown */}
//       <div>
//         <label className="block text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
//           <FaImage className="text-green-500" />
//           Select Aspect Ratio:
//         </label>
//         <select
//           value={aspectRatio}
//           onChange={(e) => setAspectRatio(e.target.value)}
//           className="w-full p-3 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         >
//           <option value="16:9">16:9 – Desktop</option>
//           <option value="9:16">9:16 – Mobile (Portrait)</option>
//           <option value="1:1">1:1 – Instagram</option>
//           <option value="3:2">3:2 – Tablet</option>
//         </select>
//       </div>

//       {/* Image Preview & Download */}
//       {generatedImage && (
//         <div className="mt-8 text-center space-y-4">
//           <h3 className="text-lg font-semibold text-gray-700">Preview</h3>
//           {(() => {
//             const preview = getPreviewSize(aspectRatio);
//             return (
//               <div
//                 className="relative w-full mx-auto border rounded-lg shadow overflow-hidden"
//                 style={{
//                   aspectRatio: preview.aspectRatio,
//                   maxWidth: preview.maxWidth,
//                 }}
//               >
//                 <img
//                   src={generatedImage}
//                   alt="Generated Quote"
//                   className="absolute top-0 left-0 w-full h-full object-cover"
//                 />
//               </div>
//             );
//           })()}

//           <button
//             onClick={handleDownload}
//             className="px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center gap-2"
//           >
//             <FaDownload /> Download Image
//           </button>
//         </div>
//       )}

//       {/* Hidden Canvas */}
//       <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
//     </section>
//   );
// };

// export default QuoteSlider;

import { useRef, useState } from 'react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaCopy,
  FaImage,
  FaDownload,
  FaUpload,
  FaPhotoVideo,
} from 'react-icons/fa';

const QuoteSlider = ({
  quotes = [],
  currentSlide,
  setCurrentSlide,
  onFavorite,
  onCopy,
}) => {
  const canvasRef = useRef(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [bgImage, setBgImage] = useState(null);
  const [aspectRatio, setAspectRatio] = useState('16:9');

  const getCanvasSize = (ratio) => {
    switch (ratio) {
      case '16:9': return [1280, 720];
      case '9:16': return [720, 1280];
      case '1:1': return [800, 800];
      case '3:2': return [1200, 800];
      default: return [1280, 720];
    }
  };

  const getPreviewSize = (ratio) => {
    switch (ratio) {
      case '16:9': return { width: '100%', aspectRatio: '16 / 9' };
      case '9:16': return { width: '100%', aspectRatio: '9 / 16' };
      case '1:1': return { width: '100%', aspectRatio: '1 / 1' };
      case '3:2': return { width: '100%', aspectRatio: '3 / 2' };
      default: return { width: '100%', aspectRatio: '16 / 9' };
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setBgImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateImage = (quote) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const [width, height] = getCanvasSize(aspectRatio);
    canvas.width = width;
    canvas.height = height;

    const drawQuote = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = 'white';
      ctx.font = '28px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const words = quote.split(' ');
      const lines = [];
      let line = '';
      const maxWidth = width * 0.85;
      const lineHeight = 40;

      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const testWidth = ctx.measureText(testLine).width;
        if (testWidth > maxWidth && i > 0) {
          lines.push(line.trim());
          line = words[i] + ' ';
        } else {
          line = testLine;
        }
      }
      lines.push(line.trim());

      const textHeight = lines.length * lineHeight;
      const yStart = height / 2 - textHeight / 2;

      lines.forEach((l, i) => {
        ctx.fillText(l, width / 2, yStart + i * lineHeight);
      });

      setGeneratedImage(canvas.toDataURL());
    };

    if (bgImage) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
        drawQuote();
      };
      img.src = bgImage;
    } else {
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, width, height);
      drawQuote();
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = 'quote-image.png';
    link.href = generatedImage;
    link.click();
  };

  if (!quotes.length) return null;

  return (
    <section className="bg-white rounded-xl shadow-xl p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2 text-indigo-600">
          <FaPhotoVideo /> Generated Quotes
        </h2>

        <div className="relative overflow-hidden mt-4 rounded-lg">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {quotes.map((quote, idx) => (
              <div
                key={idx}
                className="min-w-full p-6 bg-gray-100 rounded-lg shadow-inner"
              >
                <div className="relative text-gray-800">
                  <span className="absolute left-0 top-0 text-4xl text-indigo-500 opacity-20">"</span>
                  <p className="text-xl italic pl-8 pr-4 mb-4">{quote}</p>
                  <span className="absolute right-0 bottom-0 text-4xl text-indigo-500 opacity-20 rotate-180">"</span>
                </div>

                <div className="flex flex-wrap justify-end gap-3 mt-4">
                  <button
                    onClick={() => onFavorite(quote)}
                    className="flex items-center gap-2 px-3 py-2 text-red-600 border border-red-300 hover:bg-red-100 rounded"
                  >
                    <FaHeart /> Favorite
                  </button>
                  <button
                    onClick={() => onCopy(quote)}
                    className="flex items-center gap-2 px-3 py-2 text-indigo-600 border border-indigo-300 hover:bg-indigo-100 rounded"
                  >
                    <FaCopy /> Copy
                  </button>
                  <button
                    onClick={() => handleGenerateImage(quote)}
                    className="flex items-center gap-2 px-3 py-2 text-green-700 border border-green-300 hover:bg-green-100 rounded"
                  >
                    <FaImage /> Generate Image
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <button
            disabled={currentSlide === 0}
            onClick={() => setCurrentSlide((prev) => prev - 1)}
            className="p-2 text-xl bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            <FaChevronLeft />
          </button>
          <div className="flex gap-2 items-center">
            {quotes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full ${
                  idx === currentSlide ? 'bg-indigo-600' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
          <button
            disabled={currentSlide === quotes.length - 1}
            onClick={() => setCurrentSlide((prev) => prev + 1)}
            className="p-2 text-xl bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div>
        <label className="block text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <FaUpload className="text-blue-500" />
          Upload Background Image:
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="file:mr-4 file:px-4 file:py-2 file:border-0 file:rounded file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 w-full text-gray-600"
        />
        {bgImage && (
          <img
            src={bgImage}
            alt="Uploaded Preview"
            className="mt-4 max-h-48 object-cover rounded shadow border"
          />
        )}
      </div>

      <div>
        <label className="block text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <FaImage className="text-green-500" />
          Select Aspect Ratio:
        </label>
        <select
          value={aspectRatio}
          onChange={(e) => setAspectRatio(e.target.value)}
          className="w-full p-3 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="16:9">16:9 – Desktop</option>
          <option value="9:16">9:16 – Mobile (Portrait)</option>
          <option value="1:1">1:1 – Instagram</option>
          <option value="3:2">3:2 – Tablet</option>
        </select>
      </div>

      {generatedImage && (
        <div className="mt-8 text-center space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Preview</h3>
          <div
            className="mx-auto border rounded-lg shadow overflow-hidden"
            style={{ ...getPreviewSize(aspectRatio) }}
          >
            <img
              src={generatedImage}
              alt="Generated Quote"
              className="w-full h-full object-cover"
            />
          </div>

          <button
            onClick={handleDownload}
            className="px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center gap-2"
          >
            <FaDownload /> Download Image
          </button>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </section>
  );
};

export default QuoteSlider;
