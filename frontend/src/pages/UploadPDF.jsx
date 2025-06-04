import { useState } from "react"

import JsonExtractor from '../utils/extractJsonBlocks'

const UploadPDF = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [summary, setSummary] = useState(null);
    const [questions, setQuestions] = useState(null);

    const handleFileUpload = (e) => {
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
        <div>
            <h1>Upload PDF</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="file">File</label>
                        <input type="file" name="file" id="file" onChange={handleFileUpload} />
                    </div>
                    <div>
                        <button>Upload</button>
                    </div>
                </form>
            </div>
            {summary && (
                <div>
                    <h2>Summary</h2>
                    <p>{summary}</p>
                </div>
            )}
            {questions && (
                <div>
                    <h2>Questions</h2>
                    {questions.map((question, index) => (
                        <div key={index}>
                            <h4>Question: {question.question}</h4>
                            <ul>
                                {question.options.map((option, optionIndex) => (
                                    <li key={optionIndex}><b>{optionIndex+1}.</b> {option}</li>
                                ))}
                            </ul>
                            <p><b>Answer:</b> {question.answer}</p><br />
                        </div>
                    ))}
                </div>
            )}
            <p>{error}</p>
        </div>
    )
}

export default UploadPDF
