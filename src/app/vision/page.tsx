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
