# Stage 1: Builder
FROM python:3.9-alpine as builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache \
    gcc \
    musl-dev \
    python3-dev \
    libffi-dev \
    openssl-dev \
    jpeg-dev \
    zlib-dev \
    git \
    linux-headers

# Copy requirements
COPY requirements.txt .

# Create virtual environment and install dependencies
RUN python -m venv /opt/venv && \
    /opt/venv/bin/pip install --no-cache-dir -U pip setuptools wheel && \
    /opt/venv/bin/pip install --no-cache-dir -r requirements.txt

# Stage 2: Runtime
FROM python:3.9-alpine

WORKDIR /app

# Install runtime dependencies
RUN apk add --no-cache \
    libstdc++ \
    libgomp \
    libjpeg \
    libffi \
    openssl

# Copy virtual environment from builder
COPY --from=builder /opt/venv /opt/venv

# Set environment variables
ENV PATH="/opt/venv/bin:$PATH" \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONPATH="/opt/venv/lib/python3.9/site-packages:$PYTHONPATH"

# Create models directory and copy all application files
RUN mkdir -p models
COPY . .

# Expose port
EXPOSE 8000

# Command to run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"] 