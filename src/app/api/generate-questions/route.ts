import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file = data.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const prompt = `Generate a comprehensive NEET exam paper based on the content of this PDF and your past knowledge of questions have come previously in NEET - generate 20 questions . Follow these requirements strictly:
1. Question Format:
   - Number questions sequentially (1, 2, 3, etc.)
   - Format options as (1), (2), (3), (4)
   - Questions should be challenging and NEET-exam style
   - Include both direct and application-based questions
   - Mix single-choice and matching questions
   - Focus on concepts that are frequently tested in NEET
2. For matching questions:
   Column - I     Column - II
   (a) item       (i) match
   (b) item       (ii) match
   etc.
3. Each question must include:
   - Clear, concise question text
   - Well-structured options
   - Correct answer
   - Detailed explanation of why the answer is correct
   - For matching questions: proper combinations
4. Return in this JSON structure:
{
  "questions": [
    {
      "number": 1,
      "type": "single",
      "text": "question text",
      "options": ["(1) option1", "(2) option2", "(3) option3", "(4) option4"],
      "correctOption": "1",
      "explanation": "Detailed explanation of why this is the correct answer...",
      // For matching questions only:
      "columnI": [{"key": "a", "value": "text"}, ...],
      "columnII": [{"key": "i", "value": "text"}, ...],
      "combinations": [
        {"a": "i", "b": "ii", "c": "iii", "d": "iv"}
      ]
    }
  ]
}
5. Question Guidelines:
   - Make questions progressively challenging
   - Include current trends and recent developments
   - Focus on application and understanding rather than mere recall
   - Ensure questions are representative of actual NEET exam style and difficulty
   - Include questions that test multiple concepts when appropriate`;

    const response = await generateText({
      model: google('gemini-1.5-pro'),
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            { type: 'file', data: buffer, mimeType: file.type },
          ],
        },
      ],
    });

    const result = response.text || '';
    let examPaper;
    
    try {
      examPaper = JSON.parse(result);
    } catch (e) {
      const jsonMatch = result.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        examPaper = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Failed to parse exam paper from response');
      }
    }

    // Validate and clean up the exam paper structure
    if (!examPaper?.questions || !Array.isArray(examPaper.questions)) {
      throw new Error('Invalid exam paper structure');
    }

    // Fix the mapping function to handle the questions array directly
    examPaper.questions = examPaper.questions.map((question: any, index: number) => ({
      ...question,
      number: index + 1,
      explanation: question.explanation || 'Explanation not available',
    }));

    return NextResponse.json({ examPaper });
  } catch (error) {
    console.error('Error generating exam paper:', error);
    return NextResponse.json(
      { error: 'Failed to generate exam paper', details: (error as Error).message },
      { status: 500 }
    );
  }
}