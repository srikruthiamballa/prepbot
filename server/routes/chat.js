const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

router.post('/', async (req, res) => {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Messages array is required' });
    }

    // Default System Prompt
    const systemPrompt = {
        role: 'system',
        content: `You are an expert prep bot, an AI Exam Planner. 
Your tone is encouraging and helpful. You analyze user requested topics and suggest smart study algorithms, 
dynamically updating and reorganizing plans based on deadlines and difficulty. Provide conversational, ChatGPT-like responses.`
    };
    
    // Attempt connecting to generic OpenAI completion endpoint
    try {
        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
            // Mock response if NO API Key
            return res.json({
               reply: "I noticed you don't have a valid OpenAI API Key set in the environment variables yet! Once you add it, I'll be able to create intelligent, dynamic study plans for you. 🚀"
            });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [systemPrompt, ...messages],
        });

        res.json({ reply: completion.choices[0].message.content });

    } catch (error) {
        console.error("OpenAI Error", error.message);
        
        let customMessage = 'Failed to communicate with AI';
        if (error.status === 429) {
             customMessage = 'Your OpenAI API Key was accepted, but your OpenAI account has run out of credits/quota! Please check your OpenAI billing details to add credits.';
        } else if (error.status === 401) {
             customMessage = 'Your OpenAI API Key is invalid or incorrect.';
        }

        res.status(500).json({ error: customMessage, details: error.message });
    }
});

module.exports = router;
