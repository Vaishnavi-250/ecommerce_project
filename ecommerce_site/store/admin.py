from django.contrib import admin
from .models import Product, Order, Category, OrderItem, Favorite


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'icon']
    search_fields = ['name']


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'stock', 'rating', 'is_featured']
    list_filter = ['category', 'is_featured', 'rating']
    search_fields = ['name', 'description']
    fieldsets = (
        ('Product Information', {
            'fields': ('name', 'category', 'description', 'image')
        }),
        ('Pricing & Inventory', {
            'fields': ('price', 'stock')
        }),
        ('Details', {
            'fields': ('rating', 'is_featured')
        }),
    )


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'total_price', 'payment_method', 'status', 'created_at']
    list_filter = ['status', 'payment_method', 'created_at']
    search_fields = ['user__username', 'full_name', 'id']
    readonly_fields = ['created_at', 'updated_at']
    fieldsets = (
        ('Order Information', {
            'fields': ('id', 'user', 'status', 'created_at', 'updated_at')
        }),
        ('Shipping Information', {
            'fields': ('full_name', 'city', 'address')
        }),
        ('Payment & Amount', {
            'fields': ('payment_method', 'total_price')
        }),
    )


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['order', 'product', 'quantity', 'price']
    list_filter = ['order__created_at']
    search_fields = ['product__name', 'order__id']


@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ['user', 'product', 'added_at']
    list_filter = ['added_at']
    search_fields = ['user__username', 'product__name']
