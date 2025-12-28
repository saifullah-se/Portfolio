#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate

# Add this line to create the superuser automatically
# The "|| true" ensures the build doesn't fail if the admin already exists
python manage.py createsuperuser --no-input || true