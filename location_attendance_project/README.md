# Attendance System with GPS Location Tracking

A sophisticated Django-based GPS attendance tracking system with real-time location monitoring, distance calculation, and an enhanced pink-themed user interface.

## Features

✨ **Key Features:**

- **GPS-Based Check-In/Check-Out**: Capture employee location with high accuracy GPS tracking
- **Distance Calculation**: Automatically calculate distance from office location using Haversine formula
- **Real-Time Map Integration**: Interactive maps showing employee and office locations using Leaflet.js
- **Enhanced Pink UI Theme**: Modern, responsive design with smooth animations and gradients
- **Attendance Dashboard**: Comprehensive dashboard with statistics and recent attendance records
- **Attendance Records**: Filter and view historical attendance data with location details
- **Employee Profiles**: Setup and manage employee information with office location coordinates
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Admin Panel**: Full Django admin interface for managing employees and attendance

## Technology Stack

- **Backend**: Django 4.2
- **Database**: SQLite3
- **Frontend**: Bootstrap 5, Leaflet.js (Maps), Vanilla JavaScript
- **Maps API**: OpenStreetMap (Open source, no API key needed)
- **Authentication**: Django built-in authentication system

## Installation & Setup

### Prerequisites

- Python 3.8+
- pip (Python package manager)
- Git

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/location_attendance_project.git
   cd location_attendance_project/attendance_system
   ```

2. **Create Virtual Environment**
   ```bash
   python -m venv venv
   venv\Scripts\activate  # On Windows
   source venv/bin/activate  # On macOS/Linux
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run Migrations**
   ```bash
   python manage.py migrate
   ```

5. **Create Superuser**
   ```bash
   python manage.py createsuperuser
   ```

6. **Run Development Server**
   ```bash
   python manage.py runserver
   ```

7. **Access Application**
   - Main App: http://127.0.0.1:8000
   - Admin Panel: http://127.0.0.1:8000/admin

## Project Structure

```
attendance_system/
├── attendance/
│   ├── migrations/
│   ├── models.py           # Employee & Attendance models
│   ├── views.py            # Application views
│   ├── forms.py            # Form definitions
│   ├── urls.py             # URL routing
│   ├── utils.py            # GPS & distance utilities
│   └── admin.py            # Admin configuration
├── attendance_system/
│   ├── settings.py         # Django settings
│   ├── urls.py             # Main URL config
│   └── wsgi.py             # WSGI configuration
├── templates/
│   ├── base.html           # Base template
│   ├── auth/
│   │   └── login.html
│   └── attendance/
│       ├── dashboard.html
│       ├── check_in.html
│       ├── check_out.html
│       ├── setup_profile.html
│       ├── attendance_records.html
│       └── attendance_detail.html
├── static/
│   ├── css/
│   │   └── style.css       # Pink theme CSS
│   └── js/
│       └── main.js         # JavaScript with GPS tracking
├── manage.py
└── db.sqlite3
```

## Usage Guide

### For Employees

1. **Login**: Access the system with your credentials
2. **Setup Profile**: 
   - Enter your employee ID, department, and position
   - Set your office location using the interactive map or GPS
3. **Check In**: 
   - Navigate to Check In page
   - System automatically captures your GPS location
   - Submit to record check-in time and location
4. **View Dashboard**: Monitor your daily and monthly attendance statistics
5. **Check Out**: Similar to check-in, capture your final location and work hours
6. **View Records**: Browse historical attendance with filters by date and status

### For Administrators

1. **Access Admin Panel**: `/admin` (requires superuser account)
2. **Manage Employees**: Add, edit, or delete employee profiles
3. **Review Attendance**: Monitor attendance records with filtering options
4. **View Statistics**: Analyze attendance patterns

## GPS Tracking Details

### How It Works

1. **Location Capture**: Uses browser's Geolocation API (requires HTTPS in production)
2. **Distance Calculation**: Uses Haversine formula to calculate great-circle distance
3. **Accuracy**: Displays GPS accuracy radius in meters

### Setting Office Location

- Use the interactive map in profile setup
- Click on the map to set coordinates
- Drag the marker to adjust position
- Or enter latitude/longitude manually

### Distance Categories

- **< 500m**: Employee at office location
- **500m - 1km**: In nearby vicinity
- **> 1km**: Away from office

## Models

### Employee Model

```python
- user (OneToOne with User)
- employee_id (CharField, unique)
- phone
- department
- position
- office_latitude
- office_longitude
- created_at
- updated_at
```

### Attendance Model

```python
- employee (ForeignKey to Employee)
- date (DateField)
- check_in_time
- check_out_time
- check_in_latitude
- check_in_longitude
- check_out_latitude
- check_out_longitude
- check_in_distance
- check_out_distance
- status (present/absent/late/leave)
- notes
- created_at
- updated_at
- total_hours (calculated property)
```

## API Endpoints

- `GET /attendance/` - Dashboard
- `GET /attendance/setup/` - Setup employee profile
- `GET/POST /attendance/check-in/` - Check-in page and submit
- `GET/POST /attendance/check-out/` - Check-out page and submit
- `GET /attendance/records/` - View attendance records
- `GET /attendance/detail/<id>/` - View attendance details
- `POST /attendance/api/location/` - API endpoint for location submission
- `/admin/` - Django admin panel
- `/login/` - Login page
- `/logout/` - Logout

## Customization

### Pink Theme Colors

Edit `static/css/style.css` to modify:

```css
:root {
    --pink-primary: #ec407a;    /* Main pink */
    --pink-dark: #c2185b;       /* Dark pink */
    --green-success: #4caf50;   /* Success color */
    --red-danger: #f44336;      /* Danger color */
}
```

### Database Configuration

For production, update `DATABASES` in `settings.py` to use PostgreSQL or MySQL.

## Security Considerations

⚠️ **Important for Production:**

1. Change `SECRET_KEY` in settings.py
2. Set `DEBUG = False`
3. Configure `ALLOWED_HOSTS` with your domain
4. Use HTTPS (required for geolocation)
5. Set up proper database (not SQLite)
6. Configure CORS if using separate frontend

## Browser Compatibility

- Chrome/Chromium: Full support
- Firefox: Full support
- Safari: Full support
- Edge: Full support
- Mobile browsers: Full support (with HTTPS)

## Known Limitations

- Requires HTTPS in production (browser geolocation policy)
- GPS accuracy depends on device hardware
- Battery consumption increases with frequent location updates

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Support & Contact

For issues, questions, or suggestions:
- Create an issue on GitHub
- Email: support@example.com

## Changelog

### Version 1.0.0 (Current)
- Initial release
- GPS tracking integration
- Pink theme UI
- Dashboard with statistics
- Attendance records with filtering
- Admin panel integration

---

**Built with ❤️ using Django and modern web technologies**
