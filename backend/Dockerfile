FROM python:3.11-slim-bookworm
ENV PYTHONUNBUFFERED 1

WORKDIR /backend

COPY requirement.txt requirement.txt

RUN pip install -r requirement.txt

COPY . .
