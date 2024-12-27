'use client';

import React, { useState } from 'react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export default function PDFQuizPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please select a valid PDF file');
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to generate questions');
      }

      const data = await response.json();
      setQuestions(data.questions);
    } catch (err) {
      setError('Failed to generate questions. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">PDF to NEET Questions</h1>

      {/* Upload Section */}
      <div className="mb-6 p-4 border rounded-lg">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="mb-4"
        />
        
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={!file || loading}
          className={`w-full py-2 px-4 rounded ${
            !file || loading
              ? 'bg-gray-300'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          {loading ? 'Generating...' : 'Generate Questions'}
        </button>
      </div>

      {/* Questions Display */}
      {questions.length > 0 && (
        <div className="space-y-6">
          {questions.map((question, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <p className="font-medium mb-3">
                {index + 1}. {question.question}
              </p>

              <div className="space-y-2 mb-3">
                {question.options.map((option, optIndex) => (
                  <div
                    key={optIndex}
                    className={`p-2 rounded ${
                      option === question.correctAnswer
                        ? 'bg-green-100'
                        : 'bg-gray-50'
                    }`}
                  >
                    {['A', 'B', 'C', 'D'][optIndex]}. {option}
                  </div>
                ))}
              </div>

              <div className="text-sm text-gray-600 mt-2">
                <p className="font-medium">Explanation:</p>
                <p>{question.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
