# Mini Social - Deployment Guide

Complete guide for deploying to production environments.

---

## 🌐 Deployment Platforms

### 1. Heroku (Easiest)
### 2. PythonAnywhere (Beginner-Friendly)
### 3. AWS EC2 (Scalable)
### 4. DigitalOcean (Affordable)
### 5. Google Cloud (Enterprise)

---

## 📋 Pre-Deployment Checklist

- [ ] Set `DEBUG = False`
- [ ] Change `SECRET_KEY` to random string
- [ ] Configure `ALLOWED_HOSTS`
- [ ] Set up environment variables
- [ ] Configure database (PostgreSQL recommended)
- [ ] Set up static file serving
- [ ] Configure email backend
- [ ] Set up error logging
- [ ] Enable HTTPS
- [ ] Configure CORS for APIs
- [ ] Test all functionality
- [ ] Set up backups
- [ ] Configure monitoring

---

## 🔧 Environment Configuration

### Create `.env` file
```
DEBUG=False
SECRET_KEY=your-very-long-random-secret-key-here
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
DATABASE_URL=postgresql://user:password@host:port/dbname
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

### Install python-decouple
```bash
pip install python-decouple
```

### Update settings.py
```python
from decouple import config

DEBUG = config('DEBUG', default=False, cast=bool)
SECRET_KEY = config('SECRET_KEY')
ALLOWED_HOSTS = config('ALLOWED_HOSTS', cast=lambda v: [s.strip() for s in v.split(',')])
```

---

## 🏢 Heroku Deployment

### Step 1: Install Heroku CLI
```bash
# Windows
choco install heroku-cli

# macOS
brew tap heroku/brew && brew install heroku

# Linux
curl https://cli-assets.heroku.com/install.sh | sh
```

### Step 2: Create Procfile
```
web: gunicorn social_project.wsgi
release: python manage.py migrate
```

### Step 3: Create runtime.txt
```
python-3.11.0
```

### Step 4: Update requirements.txt
```bash
pip install gunicorn
pip freeze > requirements.txt
```

### Step 5: Deploy
```bash
heroku login
heroku create your-app-name
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
heroku run python manage.py migrate
heroku run python manage.py createsuperuser
heroku open
```

---

## 🖥️ DigitalOcean Deployment

### Step 1: Create Droplet
- Choose Ubuntu 22.04 LTS
- Select $5/month plan (or higher)
- Add SSH key for security

### Step 2: SSH into Server
```bash
ssh root@your-droplet-ip
```

### Step 3: Update System
```bash
apt update && apt upgrade -y
```

### Step 4: Install Dependencies
```bash
apt install -y python3 python3-pip python3-venv postgresql postgresql-contrib nginx
```

### Step 5: Clone Repository
```bash
cd /var/www
git clone https://github.com/yourusername/mini-social.git
cd mini-social
```

### Step 6: Create Virtual Environment
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install gunicorn psycopg2-binary
```

### Step 7: Configure Database
```bash
sudo -u postgres psql
CREATE DATABASE social_db;
CREATE USER social_user WITH PASSWORD 'strong_password';
ALTER ROLE social_user SET client_encoding TO 'utf8';
ALTER ROLE social_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE social_user SET default_transaction_deferrable TO on;
ALTER ROLE social_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE social_db TO social_user;
\q
```

### Step 8: Configure Django
```bash
# Update settings.py with DATABASE_URL
export DATABASE_URL="postgresql://social_user:strong_password@localhost:5432/social_db"
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py createsuperuser
```

### Step 9: Configure Gunicorn
Create `/var/www/mini-social/gunicorn.py`:
```python
import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'social_project.settings')
application = get_wsgi_application()
```

### Step 10: Create Systemd Service
Create `/etc/systemd/system/mini-social.service`:
```ini
[Unit]
Description=Mini Social Gunicorn Service
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/mini-social
Environment="PATH=/var/www/mini-social/venv/bin"
ExecStart=/var/www/mini-social/venv/bin/gunicorn \
    --workers 3 \
    --bind unix:/var/www/mini-social/gunicorn.sock \
    social_project.wsgi:application

[Install]
WantedBy=multi-user.target
```

### Step 11: Start Service
```bash
systemctl daemon-reload
systemctl start mini-social
systemctl enable mini-social
```

### Step 12: Configure Nginx
Create `/etc/nginx/sites-available/mini-social`:
```nginx
upstream mini_social {
    server unix:/var/www/mini-social/gunicorn.sock fail_timeout=0;
}

server {
    listen 80;
    server_name your-domain.com;

    client_max_body_size 10M;

    location /static/ {
        alias /var/www/mini-social/staticfiles/;
    }

    location /media/ {
        alias /var/www/mini-social/media/;
    }

    location / {
        proxy_pass http://mini_social;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_redirect off;
    }
}
```

### Step 13: Enable Nginx
```bash
ln -s /etc/nginx/sites-available/mini-social /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### Step 14: Setup HTTPS with Let's Encrypt
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d your-domain.com
```

---

## 🔒 Security Hardening

### Update Django Settings
```python
# Security settings
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_SECURITY_POLICY = {
    "default-src": ("'self'",),
}
X_FRAME_OPTIONS = "DENY"

# HSTS
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
```

### Configure Firewall
```bash
# UFW on Ubuntu/Debian
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow http
ufw allow https
ufw enable
```

### Set Permissions
```bash
chown -R www-data:www-data /var/www/mini-social
chmod -R 755 /var/www/mini-social
chmod -R 775 /var/www/mini-social/media
```

---

## 📊 Monitoring & Logging

### Setup Error Logging
```python
# In settings.py
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'ERROR',
            'class': 'logging.FileHandler',
            'filename': '/var/log/django/error.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'ERROR',
            'propagate': True,
        },
    },
}
```

### Monitor with Supervisor
```bash
apt install supervisor
```

Create `/etc/supervisor/conf.d/mini-social.conf`:
```ini
[program:mini-social]
command=/var/www/mini-social/venv/bin/gunicorn --workers 3 --bind unix:/var/www/mini-social/gunicorn.sock social_project.wsgi:application
directory=/var/www/mini-social
user=www-data
autostart=true
autorestart=true
```

---

## 🔄 Backup Strategy

### Database Backups
```bash
# Daily backup script
#!/bin/bash
BACKUP_DIR="/var/backups/mini-social"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR
pg_dump social_db > $BACKUP_DIR/backup_$DATE.sql
gzip $BACKUP_DIR/backup_$DATE.sql

# Keep only last 30 backups
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +30 -delete
```

### File Backups
```bash
rsync -av /var/www/mini-social/ /backup/mini-social/
rsync -av /var/www/mini-social/media/ s3://your-bucket/media/
```

---

## 🚀 CI/CD Pipeline

### GitHub Actions Example
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-python@v2
        with:
          python-version: 3.11
      - run: pip install -r requirements.txt
      - run: python manage.py test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: |
          git config user.name "Deploy Bot"
          git config user.email "deploy@example.com"
          git push heroku main
```

---

## 📈 Performance Optimization

### Database Optimization
```python
# Add indexes
class Post(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, db_index=True)
    
    class Meta:
        indexes = [
            models.Index(fields=['-created_at']),
            models.Index(fields=['author', '-created_at']),
        ]
```

### Cache Configuration
```python
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}
```

### CDN Setup
```python
# Use CloudFlare or AWS CloudFront
STATIC_URL = 'https://cdn.example.com/static/'
MEDIA_URL = 'https://cdn.example.com/media/'
```

---

## 📞 Troubleshooting

### 502 Bad Gateway
```bash
# Check Gunicorn
systemctl status mini-social
journalctl -u mini-social

# Check socket
ls -l /var/www/mini-social/gunicorn.sock
```

### Static Files Not Loading
```bash
python manage.py collectstatic --noinput
chmod 755 /var/www/mini-social/staticfiles
```

### Database Connection Error
```bash
# Check PostgreSQL
sudo systemctl status postgresql
# Test connection
psql -U social_user -d social_db -h localhost
```

### Out of Memory
```bash
# Check memory usage
free -h
# Increase swap
dd if=/dev/zero of=/swapfile bs=1G count=2
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
```

---

## 📱 Mobile App Deployment

### Requirements
- Separate API endpoints
- CORS configuration
- API versioning
- Push notifications

### Deploy API
```bash
# Same server, different domain
api.yourdomain.com -> /api/ endpoints
```

---

## 🎓 Learning Resources

- [Django Deployment Checklist](https://docs.djangoproject.com/en/stable/howto/deployment/checklist/)
- [Gunicorn Documentation](https://gunicorn.org/)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/current/tutorial.html)

---

## ✅ Post-Deployment Verification

After deployment, verify:
- [ ] Site loads without errors
- [ ] Admin panel accessible
- [ ] Database migrations applied
- [ ] Static files loading
- [ ] HTTPS working
- [ ] Email sending works
- [ ] Error logging configured
- [ ] Backups running
- [ ] Performance acceptable
- [ ] Security headers present

---

**Deployment Complete!** 🎉

Your Mini Social platform is now live and accessible to the world!
