import json
import os

import fitz
import requests
from flask import Blueprint, jsonify, request

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

upload_bp = Blueprint("upload", __name__)


def extract_text_from_pdf(file_stream):
    try:
        pdf = fitz.open(stream=file_stream.read(), filetype="pdf")
        text = ""

        for page in pdf:
            text += page.get_text()

        return text.strip() or "[PDF file has no extractable text]"
    except Exception as e:
        return f"[-] Error extracting PDF text: {str(e)}]"


@upload_bp.route("/upload", methods=["POST"])
def upload():
    context = """
        Summarize the document in about 100 words and generate 5 MCQ based on the document.
        Return the summary in one json and mcqs in another json. The format of questions should be as follows:
        {'mcqs': [{'question': 'question', 'options': ['option1', 'option2', 'option3', 'option4'], 'answer': 'answer'}]}
    """

    if "file" not in request.files:
        return jsonify({"error": "No file provided!"}), 400

    file = request.files["file"]
    file.stream.seek(0)
    file_content = extract_text_from_pdf(file.stream)

    prompt = f"""
        {context}
        PDF Content:
        {file_content}
    """

    response = requests.post(
        url="https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
        },
        data=json.dumps(
            {
                "model": "deepseek/deepseek-r1-0528:free",
                "messages": [{"role": "user", "content": prompt}],
            }
        ),
    )

    return jsonify(response.json()), response.status_code
