const JsonExtractor = (text) => {
    const jsonRegex = /```json\s*({[\s\S]*?})\s*```/g;
    const matches = [...text.matchAll(jsonRegex)];

    const parsedJsons = matches.map(match => JSON.parse(match[1]));
    return parsedJsons;
}

export default JsonExtractor;
