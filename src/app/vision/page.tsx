import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import 'tailwindcss/tailwind.css';

async function getMarkdownContent() {
  const filePath = path.join(process.cwd(), 'public', 'vision.md');
  const fileContents = fs.readFileSync(filePath, 'utf8');

  // Convert Markdown to HTML
  const processedContent = await remark().use(html).process(fileContents);
  return processedContent.toString();
}

export default async function VisionPage() {
  const contentHtml = await getMarkdownContent();

  return (
    <div className="prose prose-lg mx-auto mt-8 px-4">
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  );
}

// import fs from 'fs';
// import path from 'path';
// import { useState } from 'react';
// import { remark } from 'remark';
// import html from 'remark-html';
// import 'tailwindcss/tailwind.css';

// async function getFileContent(fileType: 'md' | 'txt') {
//   const fileName = fileType === 'md' ? 'vision.md' : 'vision.txt';
//   const filePath = path.join(process.cwd(), 'public', fileName);
//   const fileContents = fs.readFileSync(filePath, 'utf8');

//   if (fileType === 'md') {
//     // Convert Markdown to HTML
//     const processedContent = await remark().use(html).process(fileContents);
//     return processedContent.toString();
//   }

//   // For plain text, return the raw text
//   return fileContents;
// }

// export default function VisionPage() {
//   const [fileType, setFileType] = useState<'md' | 'txt'>('md');
//   const [contentHtml, setContentHtml] = useState<string>('');

//   // Load content when the fileType changes
//   const loadContent = async () => {
//     const content = await getFileContent(fileType);
//     setContentHtml(content);
//   };

//   // Handle toggle between Markdown and Text
//   const toggleFileType = () => {
//     const newFileType = fileType === 'md' ? 'txt' : 'md';
//     setFileType(newFileType);
//     loadContent();
//   };

//   // Initial content load
//   useState(() => {
//     loadContent();
//   }, [fileType]);

//   return (
//     <div className="prose prose-lg mx-auto mt-8 px-4">
//       <button 
//         onClick={toggleFileType} 
//         className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
//       >
//         Switch to {fileType === 'md' ? 'Text' : 'Markdown'}
//       </button>

//       <div 
//         dangerouslySetInnerHTML={{ __html: fileType === 'md' ? contentHtml : contentHtml.replace(/<\/?[^>]+(>|$)/g, "") }} 
//       />
//     </div>
//   );
// }
