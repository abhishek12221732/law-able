import React, { useState } from 'react';

const BulkUploadForm = () => {
  const [quizData, setQuizData] = useState([
    { question: '', options: ['', '', '', ''], correctAnswer: '', category: '', difficulty: 'medium' }
  ]);
  const [error, setError] = useState(null);

  const handleQuestionChange = (index, event) => {
    const { name, value } = event.target;
    const updatedQuizData = [...quizData];
    updatedQuizData[index][name] = value;
    setQuizData(updatedQuizData);
  };

  const handleOptionChange = (index, optionIndex, event) => {
    const { value } = event.target;
    const updatedQuizData = [...quizData];
    updatedQuizData[index].options[optionIndex] = value;
    setQuizData(updatedQuizData);
  };

  const addNewQuestion = () => {
    setQuizData([
      ...quizData,
      { question: '', options: ['', '', '', ''], correctAnswer: '', category: '', difficulty: 'medium' }
    ]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/quizzes/bulk-upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // No need to include the token here; it's managed by cookies
        },
        body: JSON.stringify({ quizzes: quizData }),
        credentials: 'include', // Important to include cookies in the request
      });

      if (!response.ok) {
        throw new Error(`Error uploading quizzes: ${response.statusText}`);
      }

      await response.json();
      alert('Quizzes uploaded successfully!');
      setQuizData([{ question: '', options: ['', '', '', ''], correctAnswer: '', category: '', difficulty: 'medium' }]);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Bulk Upload Questions</h1>
      <form onSubmit={handleSubmit}>
        {quizData.map((quiz, index) => (
          <div key={index} className="mb-6 p-4 border border-gray-300 rounded-md bg-white shadow-sm">
            <label className="block mb-2 text-lg font-semibold text-gray-700">
              Question {index + 1}:
              <input
                type="text"
                name="question"
                value={quiz.question}
                onChange={(e) => handleQuestionChange(index, e)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </label>
            <div className="mb-4">
              <label className="block mb-2 text-lg font-semibold text-gray-700">Options:</label>
              {quiz.options.map((option, optionIndex) => (
                <input
                  key={optionIndex}
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, optionIndex, e)}
                  placeholder={`Option ${optionIndex + 1}`}
                  required
                  className="block w-full px-3 py-2 mb-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              ))}
            </div>
            <label className="block mb-2 text-lg font-semibold text-gray-700">
              Correct Answer:
              <select
                name="correctAnswer"
                value={quiz.correctAnswer}
                onChange={(e) => handleQuestionChange(index, e)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled>Select Correct Answer</option>
                {quiz.options.map((option, optionIndex) => (
                  <option key={optionIndex} value={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="block mb-2 text-lg font-semibold text-gray-700">
              Category:
              <input
                type="text"
                name="category"
                value={quiz.category}
                onChange={(e) => handleQuestionChange(index, e)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </label>
            <label className="block mb-2 text-lg font-semibold text-gray-700">
              Difficulty:
              <select
                name="difficulty"
                value={quiz.difficulty}
                onChange={(e) => handleQuestionChange(index, e)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </label>
          </div>
        ))}
        <div className="flex justify-between mb-6">
          <button
            type="button"
            onClick={addNewQuestion}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Another Question
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Submit
          </button>
        </div>
      </form>
      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
};

export default BulkUploadForm;
