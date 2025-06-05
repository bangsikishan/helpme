import { useState } from "react"

import JsonExtractor from '../utils/extractJsonBlocks'

const UploadPDF = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [summary, setSummary] = useState(null);
    const [questions, setQuestions] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null);

        if (!file) {
            setError("Please select a file");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message);
                return;
            }

            const result = await response.json();
            const jsons = JsonExtractor(result.choices[0].message.content)

            setSummary(jsons[0].summary);
            setQuestions(jsons[1].mcqs);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <div className="max-w-5xl mx-auto px-6 py-12">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                    </div>
                    <h1
                        className="text-4xl md:text-5xl font-bold mb-4"
                        style={{
                            background: "linear-gradient(to right, #111827, #1e3a8a, #3730a3)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        PDF Intelligence Hub
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Transform your PDF documents into interactive summaries and intelligent questions with AI-powered analysis
                    </p>
                </div>

                {/* Upload Section */}
                <div
                    className="rounded-3xl p-8 mb-8 shadow-xl border border-white border-opacity-20"
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        backdropFilter: "blur(4px)",
                    }}
                >
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-4">
                            <label htmlFor="file" className="block text-lg font-semibold text-gray-800 mb-4">
                                Upload Your Document
                            </label>

                            {/* Enhanced File Upload Area */}
                            <div className="relative group">
                                <div
                                    className="absolute inset-0 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                                    style={{
                                        background: "linear-gradient(to right, #60a5fa, #6366f1)",
                                        filter: "blur(8px)",
                                    }}
                                ></div>
                                <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-dashed border-blue-300 rounded-2xl p-12 text-center hover:border-blue-400 transition-all duration-300 group-hover:shadow-lg">
                                    <input
                                        type="file"
                                        name="file"
                                        id="file"
                                        onChange={handleFileChange}
                                        accept=".pdf"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />

                                    {!file ? (
                                        <div className="space-y-4">
                                            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                    />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-lg font-medium text-gray-700 mb-2">
                                                    Drop your PDF here or <span className="text-blue-600 font-semibold">browse files</span>
                                                </p>
                                                <p className="text-sm text-gray-500">Supports PDF files up to 10MB</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-lg font-medium text-green-700 mb-2">File Selected Successfully!</p>
                                                <div className="bg-white rounded-lg p-4 border border-green-200 max-w-md mx-auto">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="inline-flex items-center justify-center w-10 h-10 bg-red-100 rounded-lg">
                                                                <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                            </div>
                                                            <div className="text-left">
                                                                <p
                                                                    className="text-sm font-medium text-gray-900 truncate max-w-48"
                                                                    title={file.name}
                                                                >
                                                                    {file.name}
                                                                </p>
                                                                <p className="text-xs text-gray-500">
                                                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => setFile(null)}
                                                            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                                        >
                                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-green-600 mt-2">Ready to process your document</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={!file}
                                className={`group relative px-8 py-4 font-semibold rounded-xl focus:outline-none focus:ring-4 transition-all duration-300 transform shadow-lg ${file
                                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:scale-105 hover:shadow-xl focus:ring-blue-300"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    }`}
                            >
                                <span className="relative z-10 flex items-center">
                                    {file ? (
                                        <>
                                            <svg
                                                className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                                />
                                            </svg>
                                            Process Document
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            Select a file first
                                        </>
                                    )}
                                </span>
                                {file && (
                                    <div
                                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                                        style={{
                                            background: "linear-gradient(to right, #60a5fa, #a78bfa)",
                                            filter: "blur(4px)",
                                        }}
                                    ></div>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Summary Section */}
                {summary && (
                    <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg border border-gray-100">
                        <div className="flex items-center mb-4">
                            <div className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 rounded-lg mr-3">
                                <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-lg font-semibold text-gray-900">Document Summary</h2>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-emerald-400">
                            <p className="text-gray-700 leading-relaxed">{summary}</p>
                        </div>
                    </div>
                )}

                {/* Questions Section */}
                {questions && questions.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center mb-6">
                            <div className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg mr-3">
                                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-lg font-semibold text-gray-900">Generated Questions</h2>
                        </div>

                        <div className="space-y-4">
                            {questions.map((question, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-colors duration-200"
                                >
                                    <div className="flex items-start mb-4">
                                        <div className="inline-flex items-center justify-center w-6 h-6 bg-blue-600 text-white text-sm font-medium rounded-full mr-3 mt-0.5 flex-shrink-0">
                                            {index + 1}
                                        </div>
                                        <h4 className="text-base font-medium text-gray-900 leading-relaxed">{question.question}</h4>
                                    </div>

                                    <div className="mb-4 ml-9">
                                        <div className="space-y-2">
                                            {question.options.map((option, optionIndex) => (
                                                <div
                                                    key={optionIndex}
                                                    className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-150"
                                                >
                                                    <div className="inline-flex items-center justify-center w-6 h-6 bg-gray-300 text-gray-700 text-xs font-medium rounded-full mr-3 flex-shrink-0">
                                                        {String.fromCharCode(65 + optionIndex)}
                                                    </div>
                                                    <span className="text-gray-700 text-sm leading-relaxed">{option}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="ml-9">
                                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                                            <div className="flex items-center">
                                                <div className="inline-flex items-center justify-center w-4 h-4 bg-emerald-500 rounded-full mr-2">
                                                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                                <p className="text-sm">
                                                    <span className="font-medium text-emerald-800">Answer: </span>
                                                    <span className="text-emerald-700">{question.answer}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Error Section */}
                {error && (
                    <div className="bg-white rounded-2xl p-4 shadow-lg border border-red-200">
                        <div className="flex items-center">
                            <div className="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-lg mr-3">
                                <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-red-900">Processing Error</h3>
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UploadPDF
