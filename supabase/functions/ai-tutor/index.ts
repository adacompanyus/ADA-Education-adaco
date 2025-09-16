import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, type, subject } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not found');
    }

    let systemMessage = '';
    
    if (type === 'flashcard') {
      systemMessage = `You are an expert tutor for ${subject}. Generate educational flashcard content. Return ONLY a valid JSON array with exactly 3 flashcards. Each flashcard must have "front" and "back" properties. Do not include any markdown formatting, code blocks, or extra text. Return only the raw JSON array.`;
    } else if (type === 'explanation') {
      systemMessage = `You are an expert tutor for ${subject}. Provide clear, concise explanations for AP level students. Keep responses under 150 words and use simple language.`;
    } else if (type === 'quiz') {
      systemMessage = `You are creating a quiz question for ${subject}. Generate one multiple choice question with 4 options and indicate the correct answer. Return ONLY valid JSON with "question", "options" array, and "correctAnswer" index. No markdown formatting.`;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: prompt }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('OpenAI API error:', data);
      throw new Error(data.error?.message || 'Failed to get AI response');
    }

    const aiResponse = data.choices[0].message.content;

    // For JSON responses, validate and clean the response
    if (type === 'flashcard' || type === 'quiz') {
      try {
        // Remove markdown code block fences if present
        let cleanedResponse = aiResponse.trim();
        if (cleanedResponse.startsWith('```json')) {
          cleanedResponse = cleanedResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');
        } else if (cleanedResponse.startsWith('```')) {
          cleanedResponse = cleanedResponse.replace(/^```\s*/, '').replace(/\s*```$/, '');
        }
        
        // Parse and re-stringify to ensure valid JSON
        const parsedJson = JSON.parse(cleanedResponse);
        const validJsonString = JSON.stringify(parsedJson);
        
        return new Response(JSON.stringify({ 
          success: true, 
          response: validJsonString 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (jsonError) {
        console.error('JSON parsing error:', jsonError);
        return new Response(JSON.stringify({ 
          error: 'Failed to parse AI response as valid JSON',
          success: false 
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      response: aiResponse 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-tutor function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});