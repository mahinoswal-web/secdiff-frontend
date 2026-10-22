FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
# The Gemma 2 GGUF model volume should be mounted at runtime via GEMMA_MODEL_PATH
ENTRYPOINT ["python", "harness.py"]
