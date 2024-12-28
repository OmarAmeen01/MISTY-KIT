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
              className={`p-2 rounded ${
                showAnswers && idx + 1 === parseInt(question.correctOption)
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Question Paper Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="h-12 w-12 text-gray-400 mb-4" />
                <span className="text-sm text-gray-600">
                  {file ? file.name : 'Upload PDF study material'}
                </span>
              </label>
            </div>

            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSubmit}
                disabled={!file || loading}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                  !file || loading
                    ? 'bg-gray-300'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <File className="animate-spin h-5 w-5 mr-2" />
                    Generating...
                  </span>
                ) : (
                  'Generate Question Paper'
                )}
              </button>

              {examPaper && (
                <button
                  onClick={() => setShowAnswers(!showAnswers)}
                  className="py-3 px-6 rounded-lg font-medium bg-gray-600 hover:bg-gray-700 text-white transition-colors"
                >
                  {showAnswers ? 'Hide Answers' : 'Show Answers'}
                </button>
              )}
            </div>
          </CardContent>
        </Card>

        {examPaper && (
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="text-right mb-6 space-y-1">
                <div className="text-sm font-medium">TEST 2024</div>
                <div className="text-xs text-gray-500">Set E1</div>
              </div>

              <div className="space-y-8">
                {examPaper.questions.map((question) => (
                  <div
                    key={question.number}
                    className="border-b pb-6 last:border-0"
                  >
                    <div className="flex gap-4">
                      <div className="font-medium text-gray-700 w-8">
                        {question.number}.
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="text-gray-800">{question.text}</div>
                        {question.type === 'matching' ? (
                          renderMatchingQuestion(question)
                        ) : (
                          <div className="mt-4 space-y-3 pl-8">
                            {question.options.map((option, idx) => (
                              <div
                                key={idx}
                                className={`p-3 rounded-lg transition-colors ${
                                  showAnswers &&
                                  option.startsWith(
                                    `(${question.correctOption})`
                                  )
                                    ? 'bg-green-100'
                                    : 'hover:bg-gray-50'
                                }`}
                              >
                                {option}
                              </div>
                            ))}
                          </div>
                        )}
                        {showAnswers && question.explanation && (
                          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                            <div className="font-medium text-blue-800 mb-2">
                              Explanation:
                            </div>
                            <div className="text-blue-700">
                              {question.explanation}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {showAnswers && (
                <div className="mt-8 pt-6 border-t">
                  <h3 className="font-bold text-lg mb-4">Answer Key</h3>
                  <div className="grid grid-cols-5 gap-4">
                    {examPaper.questions.map((q) => (
                      <div
                        key={q.number}
                        className="p-3 bg-gray-50 rounded-lg text-center"
                      >
                        <span className="font-medium">{q.number}.</span>{' '}
                        <span className="text-green-600">
                          ({q.correctOption})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default NEETPage;
