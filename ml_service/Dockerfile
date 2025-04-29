# ml_service/Dockerfile
FROM python:3.10.5

# 1. Set working dir
WORKDIR /app

# 2. Copy and install dependencies
COPY ml_service/requirements.txt .
RUN pip install -r requirements.txt

# 3. Copy service code
COPY ml_service .

# 4. Expose the port your Flask app uses
EXPOSE 8008

# 5. Run the app
CMD ["python", "app.py"]
