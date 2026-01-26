from django import forms
from .models import Product

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'price', 'description']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Product Name'}),
            'price': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Price'}),
            'description': forms.Textarea(attrs={'class': 'form-control', 'placeholder': 'Product Description', 'rows': 4}),
        }

from .models import Order

class OrderCreateForm(forms.ModelForm):
    class Meta:
        model = Order
        fields = ['full_name', 'address', 'city']
        widgets = {
            'full_name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Full Name'}),
            'address': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Address'}),
            'city': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'City'}),
        }

