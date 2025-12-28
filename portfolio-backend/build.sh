#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate

# Force create or update the superuser
python manage.py shell << END
from django.contrib.auth import get_user_model
User = get_user_model()
import os

username = os.environ.get('DJANGO_SUPERUSER_USERNAME')
email = os.environ.get('DJANGO_SUPERUSER_EMAIL')
password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')

if not username or not password:
    print("ERROR: DJANGO_SUPERUSER_USERNAME or PASSWORD not set in Render Env Vars")
else:
    user, created = User.objects.get_or_create(username=username, defaults={'email': email})
    user.set_password(password) # This hashes the password correctly
    user.is_staff = True
    user.is_superuser = True
    user.is_active = True
    user.save()
    print(f"User {username} is now a superuser and staff member.")
END