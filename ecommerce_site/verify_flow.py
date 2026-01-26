import os
import django
from django.test import Client

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce_site.settings')
django.setup()

from django.contrib.auth.models import User
from store.models import Product, Order

def run_verification():
    print("Starting Verification...")
    client = Client()
    
    # 1. Create Users
    username = 'testuser'
    password = 'testpassword123'
    if not User.objects.filter(username=username).exists():
        user = User.objects.create_user(username=username, password=password)
        print(f"Created user: {username}")
    else:
        user = User.objects.get(username=username)
        print(f"User exists: {username}")

    admin_username = 'adminuser'
    if not User.objects.filter(username=admin_username).exists():
        admin = User.objects.create_superuser(username=admin_username, password=password, email='admin@test.com')
        print(f"Created admin: {admin_username}")
    else:
        admin = User.objects.get(username=admin_username)
        print(f"Admin exists: {admin_username}")

    # 2. Login
    login_success = client.login(username=username, password=password)
    print(f"Login successful: {login_success}")
    if not login_success:
        print("Login failed!")
        return

    # 3. Create Product (as admin)
    # We define it manually here for test
    Product.objects.all().delete() # Clean slate
    p1 = Product.objects.create(name="Test Product 1", price=100.0, description="Desc 1")
    p2 = Product.objects.create(name="Test Product 2", price=200.0, description="Desc 2")
    print(f"Created products: {p1}, {p2}")

    # 4. Add to Cart
    resp = client.get(f'/cart/add/{p1.id}/')
    print(f"Add to cart status: {resp.status_code} (Redirect expected 302)")
    
    # Check session
    session = client.session
    cart = session.get('cart')
    print(f"Cart content: {cart}")
    
    if str(p1.id) in cart:
        print("Product 1 successfully in cart.")
    else:
        print("Product 1 NOT in cart.")

    # 5. Checkout
    print("Attempting Checkout...")
    checkout_data = {
        'full_name': 'John Doe',
        'address': '123 Test St',
        'city': 'Test City'
    }
    resp = client.post('/checkout/', checkout_data)
    print(f"Checkout status: {resp.status_code}")
    
    # 6. Verify Order
    orders = Order.objects.filter(user=user)
    print(f"User orders count: {orders.count()}")
    if orders.count() > 0:
        latest = orders.first()
        print(f"Order ID: {latest.id}, Total: {latest.get_total_cost()}")
        if latest.get_total_cost() == 100.0:
             print("VERIFICATION SUCCESS: Order total matches.")
        else:
             print("VERIFICATION FAILED: Order total mismatch.")
    else:
        print("VERIFICATION FAILED: No order created.")

if __name__ == '__main__':
    run_verification()
