# Quick Start Guide - Attendance System

## 🚀 Getting Started in 5 Minutes

### Prerequisites
- Python 3.8+
- Git installed
- Modern web browser

### Step 1: Clone & Setup

```bash
# Clone the repository
cd location_attendance_project/attendance_system

# Create superuser (admin account)
python manage.py createsuperuser
```

### Step 2: Run Server

```bash
python manage.py runserver
```

Server runs at: http://127.0.0.1:8000

### Step 3: Access

- **Main App**: http://127.0.0.1:8000
- **Login**: Use superuser credentials
- **Admin Panel**: http://127.0.0.1:8000/admin

## 📋 First Time Setup

1. **Login** with your superuser account
2. **Setup Profile**:
   - Click "Profile Settings"
   - Enter Employee ID
   - Set office location on the map
   - Save profile
3. **Test Check-In**:
   - Click "Check In"
   - Grant location permission
   - Submit
4. **Test Check-Out**:
   - Click "Check Out"
   - Submit

## 🎨 Pink Theme Colors

```
Primary: #ec407a (Pink)
Success: #4caf50 (Green)
Warning: #ff9800 (Orange)
Danger: #f44336 (Red)
```

## 📱 Features to Try

✅ Dashboard - View statistics
✅ Check In/Out - GPS tracking
✅ Records - Filter attendance
✅ Profile - Set office location
✅ Map View - See locations

## 🔧 For Developers

### Project Structure
```
attendance/
├── models.py       - Employee & Attendance models
├── views.py        - All application views
├── forms.py        - Form definitions
├── urls.py         - URL routing
├── utils.py        - GPS utilities
└── admin.py        - Admin configuration
```

### Key Files
- `static/css/style.css` - Pink theme
- `static/js/main.js` - GPS tracking
- `templates/` - HTML templates

### Database
- Using SQLite3 (default)
- Models: Employee, Attendance
- ORM: Django ORM

## 🐛 Troubleshooting

**Issue: GPS not working**
- Enable location in browser
- Use HTTPS in production
- Check browser console for errors

**Issue: Database errors**
- Run: `python manage.py migrate`
- Delete db.sqlite3 and re-migrate if needed

**Issue: Static files not loading**
- Run: `python manage.py collectstatic`

## 📚 Documentation

- [README.md](README.md) - Full documentation
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Implementation details

## 💡 Tips

- Use interactive map to set office location
- GPS accuracy depends on device
- Check admin panel to manage employees
- Filter attendance records by date or status

---

**Ready to use! Happy tracking! 📍**
