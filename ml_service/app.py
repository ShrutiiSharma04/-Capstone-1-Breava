# ml_service/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import tempfile
import os

# Import your existing CSV-based tester
from Test_NB_Model import predict_from_csv  # <-- you’ll need to add this function

app = Flask(__name__)
CORS(app)

@app.route('/predict_csv', methods=['POST'])
def predict_csv():
    """
    Expects form-data with a 'file' field (your CSV).
    Returns JSON: { "results": ["benign","malignant",…] }
    """
    if 'file' not in request.files:
        return jsonify({'error': 'no file provided'}), 400

    f = request.files['file']
    # write to a temp file so your existing function can read it
    with tempfile.NamedTemporaryFile(suffix='.csv', delete=False) as tmp:
        f.save(tmp.name)
        tmp_path = tmp.name

    try:
        # call into your Test_NB_Model logic
        results = predict_from_csv(tmp_path)
    except Exception as e:
        return jsonify({'error': f'Model error: {e}'}), 500
    finally:
        os.remove(tmp_path)

    return jsonify({'results': results})


if __name__ == '__main__':
    # debug=True gives auto-reload; host 0.0.0.0 makes it accessible across network if needed.
    app.run(host='0.0.0.0', port=8008, debug=True)
