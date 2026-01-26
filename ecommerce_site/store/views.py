from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from .models import Product, Order, OrderItem
from .forms import ProductForm, OrderCreateForm
from .cart import Cart

def signup_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('dashboard')
    else:
        form = UserCreationForm()
    return render(request, 'registration/signup.html', {'form': form})

@login_required
def dashboard_view(request):
    # Differentiate between Admin and Customer
    is_admin = request.user.is_staff
    
    context = {
        'is_admin': is_admin,
    }
    
    if is_admin:
        # Admin Dashboard Data (mock for now, will enhance)
        context.update({
            'total_sales': 12500,
            'orders_pending': 5,
            'low_stock_items': 3
        })
    else:
        # Customer Dashboard Data
        recent_products = Product.objects.all()[:4]
        context.update({
            'recent_products': recent_products
        })
        
    return render(request, 'store/dashboard.html', context)

def product_list(request):
    products = Product.objects.all()
    # If user is authenticated, use dashboard layout, otherwise base
    template = 'store/marketplace.html' 
    return render(request, template, {'products': products})

def product_detail(request, pk):
    product = get_object_or_404(Product, pk=pk)
    return render(request, 'store/product_detail.html', {'product': product})


@login_required
def add_product(request):
    if not request.user.is_staff:
        return redirect('dashboard')
        
    if request.method == 'POST':
        form = ProductForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('dashboard')
    else:
        form = ProductForm()
    
    
    return render(request, 'store/manage_product.html', {'form': form, 'title': 'Add Product'})

@login_required
def add_to_cart(request, product_id):
    cart = Cart(request)
    product = Product.objects.get(id=product_id)
    cart.add(product=product)
    return redirect('cart_detail')

@login_required
def cart_remove(request, product_id):
    cart = Cart(request)
    product = Product.objects.get(id=product_id)
    cart.remove(product)
    return redirect('cart_detail')

@login_required
def cart_detail(request):
    cart = Cart(request)
    return render(request, 'store/cart.html', {'cart': cart})

@login_required
def checkout(request):
    cart = Cart(request)
    if request.method == 'POST':
        form = OrderCreateForm(request.POST)
        if form.is_valid():
            order = form.save(commit=False)
            order.user = request.user
            order.save()
            for item in cart:
                OrderItem.objects.create(order=order,
                                         product=item['product'],
                                         price=item['price'],
                                         quantity=item['quantity'])
            cart.clear()
            return render(request, 'store/created.html', {'order': order})
    else:
        form = OrderCreateForm()
    return render(request, 'store/checkout.html', {'cart': cart, 'form': form})

@login_required
def order_history(request):
    orders = Order.objects.filter(user=request.user).order_by('-created_at')
    return render(request, 'store/order_history.html', {'orders': orders})




