'use client';
import React, { useState } from 'react';
import { Upload, File } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ColumnItem {
  key: string;
  value: string;
}

interface Combinations {
  [key: string]: string;
}

interface Question {
  number: number;
  type: 'single' | 'matching';
  text: string;
  options: string[];
  correctOption: string;
  explanation?: string;
  columnI?: ColumnItem[];
  columnII?: ColumnItem[];
  combinations?: Combinations[];
}

interface ExamPaper {
  questions: Question[];
}

const NEETPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [examPaper, setExamPaper] = useState<ExamPaper | null>(null);
  const [error, setError] = useState<string>('');
  const [showAnswers, setShowAnswers] = useState(false);

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
        throw new Error('Failed to generate exam paper');
      }

      const data = await response.json();
      setExamPaper(data.examPaper);
    } catch (err) {
      setError('Failed to generate exam paper. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderMatchingQuestion = (question: Question) => {
    if (!question.columnI || !question.columnII) return null;

    return (
      <div className="mt-4 space-y-4">
        <div className="grid grid-cols-2 gap-8 bg-gray-50 p-4 rounded-lg">
          <div>
            <div className="font-medium mb-2 text-gray-700">Column - I</div>
            {question.columnI.map((item) => (
              <div key={item.key} className="mb-2 flex items-start">
                <span className="font-medium mr-2">({item.key})</span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
          <div>
            <div className="font-medium mb-2 text-gray-700">Column - II</div>
            {question.columnII.map((item) => (
              <div key={item.key} className="mb-2 flex items-start">
                <span className="font-medium mr-2">({item.key})</span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="pl-8 space-y-2">
          {question.combinations?.map((combo, idx) => (
            <div
              key={idx}
              className={`p-2 rounded ${showAnswers && idx + 1 === parseInt(question.correctOption)
                  ? 'bg-green-100'
                  : 'hover:bg-gray-50'
                }`}
            >
              <span className="font-medium">({idx + 1})</span>{' '}
              {Object.entries(combo)
                .map(([k, v]) => `${k}-${v}`)
                .join(', ')}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 flex flex-col items-center">
      <div className="w-full max-w-4xl px-6 md:px-10">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Generate Your Custom Question Paper
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Upload your PDF study material to generate personalized exam questions in seconds.
          </p>
        </div>

        {/* Upload Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="w-full md:w-2/3">
              <label
                htmlFor="file-upload"
                className="w-full flex flex-col items-center justify-center border-2 border-dashed border-blue-300 rounded-lg py-6 cursor-pointer transition hover:border-blue-500 hover:bg-blue-50"
              >
                <Upload className="h-10 w-10 text-blue-400 mb-3" />
                <span className="text-sm text-gray-600">
                  {file ? file.name : 'Click to upload your PDF'}
                </span>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
              </label>
            </div>
            <div className="w-full md:w-1/3">
              <button
                onClick={handleSubmit}
                disabled={!file || loading}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all shadow-md ${!file || loading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <File className="animate-spin h-5 w-5 mr-2" />
                    Generating...
                  </span>
                ) : (
                  'Generate Paper'
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-300 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Questions Section */}
        {examPaper && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6 md:p-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  Generated Question Paper
                </h2>
                <p className="text-sm text-gray-500">Set E1 · TEST 2024</p>
              </div>
              <button
                onClick={() => setShowAnswers(!showAnswers)}
                className="py-2 px-4 rounded-lg bg-gray-700 text-white text-sm font-medium hover:bg-gray-800"
              >
                {showAnswers ? 'Hide Answers' : 'Show Answers'}
              </button>
            </div>

            <div className="mt-6 space-y-6">
              {examPaper.questions.map((question) => (
                <div
                  key={question.number}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4 transition-transform transform hover:scale-[1.02]"
                >
                  <div className="flex gap-4">
                    <div className="text-blue-500 font-bold">{question.number}.</div>
                    <div className="flex-1">
                      <p className="text-gray-800">{question.text}</p>
                      {question.type === 'matching' ? (
                        renderMatchingQuestion(question)
                      ) : (
                        <div className="mt-4 space-y-3">
                          {question.options.map((option, idx) => (
                            <div
                              key={idx}
                              className={`p-3 rounded-lg text-sm transition hover:bg-gray-100 ${showAnswers &&
                                  option.startsWith(`(${question.correctOption})`)
                                  ? 'bg-green-100 text-green-800 font-bold'
                                  : 'text-gray-700'
                                }`}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      )}
                      {showAnswers && question.explanation && (
                        <div className="mt-4 bg-blue-50 text-blue-700 p-3 rounded-lg">
                          <strong>Explanation:</strong> {question.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {showAnswers && (
              <div className="mt-8 pt-4 border-t">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Answer Key
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {examPaper.questions.map((q) => (
                    <div
                      key={q.number}
                      className="p-3 bg-gray-50 rounded-lg text-center text-gray-700 font-medium hover:bg-gray-100"
                    >
                      {q.number}.{' '}
                      <span className="text-green-600 font-bold">
                        ({q.correctOption})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>

  );
};

export default NEETPage;
