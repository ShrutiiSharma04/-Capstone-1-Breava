# ml_service/Dockerfile
FROM python:3.10.5-slim

# 1. Set working directory
WORKDIR /app

# 2. Copy and install dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# 3. Copy service code
COPY . ./

# 4. Expose the port your Flask app uses
EXPOSE 8008

# 5. Run the app
CMD ["python", "app.py"]