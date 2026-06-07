const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const prompt = `You are an ATS analyzer. Reply with ONLY this JSON, no other text:
{"matchScore": 80, "matchedKeywords": ["Node.js", "Express"], "missingKeywords": ["React"], "suggestions": ["Add React to resume", "Highlight projects"], "coverLetter": "Dear Hiring Manager, I am applying for this role..."}

Resume: ${resumeText.substring(0, 500)}
Job: ${jobDescription}

JSON only:`;

    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'tinyllama',
      prompt: prompt,
      stream: false
    });

    let rawText = response.data.response;
    console.log("Mistral:", rawText.substring(0, 300));
    
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    const result = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
    res.json(result);

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('HireIQ Backend running on port 3000!');
});