from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.db.models import Q
from .models import Product, Order, OrderItem, Category, Favorite
from .forms import ProductForm, OrderCreateForm, FavoriteForm
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
    category_id = request.GET.get('category')
    search_query = request.GET.get('search', '')
    sort_by = request.GET.get('sort', '')
    
    products = Product.objects.all()
    
    if category_id:
        products = products.filter(category_id=category_id)
    
    if search_query:
        products = products.filter(Q(name__icontains=search_query) | Q(description__icontains=search_query))
    
    # Price sorting
    if sort_by == 'price_low':
        products = products.order_by('price')
    elif sort_by == 'price_high':
        products = products.order_by('-price')
    elif sort_by == 'rating':
        products = products.order_by('-rating')
    elif sort_by == 'newest':
        products = products.order_by('-id')
    
    categories = Category.objects.all()
    favorites = set()
    if request.user.is_authenticated:
        favorites = set(Favorite.objects.filter(user=request.user).values_list('product_id', flat=True))
    
    context = {
        'products': products,
        'categories': categories,
        'favorite_ids': favorites,
        'search_query': search_query,
        'selected_category': category_id,
        'selected_sort': sort_by,
    }
    return render(request, 'store/marketplace.html', context)

def product_detail(request, pk):
    product = get_object_or_404(Product, pk=pk)
    is_favorite = False
    if request.user.is_authenticated:
        is_favorite = Favorite.objects.filter(user=request.user, product=product).exists()
    
    related_products = Product.objects.filter(category=product.category).exclude(id=product.id)[:4]
    
    context = {
        'product': product,
        'is_favorite': is_favorite,
        'related_products': related_products,
    }
    return render(request, 'store/product_detail.html', context)


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
            order.total_price = cart.get_total_price()
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
    
    # Calculate tax (10%) and total
    subtotal = float(cart.get_total_price()) if cart.get_total_price() else 0
    tax = subtotal * 0.1
    total = subtotal + tax
    
    return render(request, 'store/checkout.html', {
        'cart': cart, 
        'form': form,
        'subtotal': subtotal,
        'tax': tax,
        'total': total
    })

@login_required
def order_history(request):
    orders = Order.objects.filter(user=request.user).order_by('-created_at')
    return render(request, 'store/order_history.html', {'orders': orders})


@login_required
def order_tracking(request, order_id):
    order = get_object_or_404(Order, id=order_id, user=request.user)
    order_items = order.items.all()
    
    # Define tracking stages
    stages = [
        {'name': 'Order Placed', 'status': 'completed', 'date': order.created_at},
        {'name': 'Processing', 'status': 'processing' if order.status in ['Pending', 'Processing'] else 'completed', 'date': None},
        {'name': 'Shipped', 'status': 'pending' if order.status in ['Pending', 'Processing'] else ('completed' if order.status in ['Delivered', 'Cancelled'] else 'pending'), 'date': None},
        {'name': 'Delivered', 'status': 'completed' if order.status == 'Delivered' else ('cancelled' if order.status == 'Cancelled' else 'pending'), 'date': None},
    ]
    
    context = {
        'order': order,
        'order_items': order_items,
        'stages': stages,
        'total_items': sum(item.quantity for item in order_items),
    }
    return render(request, 'store/order_tracking.html', context)

@login_required
def add_to_favorites(request, product_id):
    product = get_object_or_404(Product, pk=product_id)
    favorite, created = Favorite.objects.get_or_create(user=request.user, product=product)
    
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return JsonResponse({'added': created, 'message': 'Added to favorites' if created else 'Already in favorites'})
    
    return redirect('product_detail', pk=product_id)


@login_required
def remove_from_favorites(request, product_id):
    product = get_object_or_404(Product, pk=product_id)
    Favorite.objects.filter(user=request.user, product=product).delete()
    
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return JsonResponse({'removed': True, 'message': 'Removed from favorites'})
    
    return redirect('favorites_list')


@login_required
def favorites_list(request):
    favorites = Favorite.objects.filter(user=request.user)
    products = [fav.product for fav in favorites]
    return render(request, 'store/favorites.html', {'products': products, 'favorites': favorites})


@login_required
def dashboard_view(request):
    # Differentiate between Admin and Customer
    is_admin = request.user.is_staff
    
    context = {
        'is_admin': is_admin,
    }
    
    if is_admin:
        # Admin Dashboard Data
        total_orders = Order.objects.count()
        pending_orders = Order.objects.filter(status='Pending').count()
        total_revenue = sum(order.total_price for order in Order.objects.all())
        low_stock = Product.objects.filter(stock__lt=20)
        
        context.update({
            'total_orders': total_orders,
            'pending_orders': pending_orders,
            'total_revenue': total_revenue,
            'low_stock_items': low_stock.count(),
            'low_stock': low_stock,
        })
    else:
        # Customer Dashboard Data
        recent_products = Product.objects.all()[:8]
        featured_products = Product.objects.filter(is_featured=True)[:4]
        favorites_count = Favorite.objects.filter(user=request.user).count()
        recent_orders = Order.objects.filter(user=request.user)[:3]
        
        context.update({
            'recent_products': recent_products,
            'featured_products': featured_products,
            'favorites_count': favorites_count,
            'recent_orders': recent_orders,
        })
        
    return render(request, 'store/dashboard.html', context)
