from flask import Flask, request, jsonify
import openai
import os

# Set your OpenAI API key
openai.api_key = 'your_openai_api_key_here'  # Replace with your actual API key

app = Flask(__name__)

def generate_ai_response(user_message):
    prompt = f"Respond to the following user message with a smart, romantic, and charming tone. Try to make it sound flirty and engaging: {user_message}"

    response = openai.Completion.create(
        engine="gpt-4",  # You can use "gpt-3.5-turbo" or "gpt-4" depending on your plan
        prompt=prompt,
        max_tokens=150,
        n=1,
        stop=None,
        temperature=0.9,
    )

    ai_reply = response.choices[0].text.strip()  # Clean up the response
    return ai_reply

@app.route('/api/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')

    # Generate AI response using GPT-4
    ai_reply = generate_ai_response(user_message)

    return jsonify({"reply": ai_reply})

if __name__ == '__main__':
    app.run(debug=True)
