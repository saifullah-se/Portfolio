#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate

python manage.py shell << END
from django.contrib.auth import get_user_model
import os

User = get_user_model()
un = os.environ.get('DJANGO_SUPERUSER_USERNAME', 'admin')
pw = os.environ.get('DJANGO_SUPERUSER_PASSWORD')
em = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'admin@example.com')

if pw:
    # Delete any existing user with this name to avoid "Staff" flag confusion
    User.objects.filter(username=un).delete()
    # Create fresh
    u = User.objects.create_superuser(username=un, email=em, password=pw)
    u.is_staff = True
    u.is_superuser = True
    u.save()
    print(f"--- LOG: Created superuser '{un}' successfully ---")
else:
    print("--- LOG: No password found in environment variables ---")
END