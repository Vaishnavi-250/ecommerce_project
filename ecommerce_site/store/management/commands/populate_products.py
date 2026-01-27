from django.core.management.base import BaseCommand
from django.core.files.base import ContentFile
from store.models import Category, Product
from PIL import Image, ImageDraw
import io

class Command(BaseCommand):
    help = 'Populate database with test products and categories'

    def handle(self, *args, **options):
        # Clear existing products and categories
        Product.objects.all().delete()
        Category.objects.all().delete()

        # Create categories
        categories_data = [
            {'name': 'Electronics', 'icon': 'laptop', 'description': 'Electronic gadgets and devices'},
            {'name': 'Fashion', 'icon': 'tshirt', 'description': 'Clothing and accessories'},
            {'name': 'Home & Garden', 'icon': 'home', 'description': 'Home decor and garden items'},
            {'name': 'Sports & Outdoors', 'icon': 'dumbbell', 'description': 'Sports equipment and outdoor gear'},
            {'name': 'Books & Media', 'icon': 'book', 'description': 'Books, movies, and music'},
        ]

        categories = {}
        for cat_data in categories_data:
            cat = Category.objects.create(**cat_data)
            categories[cat.name] = cat
            self.stdout.write(f'Created category: {cat.name}')

        # Create products with generated images
        products_data = [
            # Electronics
            {'name': 'Wireless Headphones', 'category': 'Electronics', 'price': 79.99, 'stock': 50,
             'description': 'Premium noise-cancelling wireless headphones with 30-hour battery', 'rating': 4.5, 'color': '#3498db'},
            {'name': 'USB-C Cable', 'category': 'Electronics', 'price': 12.99, 'stock': 200,
             'description': '6ft high-speed USB-C charging and data cable', 'rating': 4.2, 'color': '#e74c3c'},
            {'name': 'Power Bank 20000mAh', 'category': 'Electronics', 'price': 34.99, 'stock': 80,
             'description': 'Fast charging portable power bank with dual USB ports', 'rating': 4.7, 'color': '#2ecc71'},
            {'name': 'Wireless Mouse', 'category': 'Electronics', 'price': 24.99, 'stock': 120,
             'description': 'Ergonomic wireless mouse with precision tracking', 'rating': 4.3, 'color': '#9b59b6'},
            {'name': 'Laptop Stand', 'category': 'Electronics', 'price': 39.99, 'stock': 60,
             'description': 'Adjustable aluminum laptop stand for better ergonomics', 'rating': 4.6, 'color': '#f39c12'},
            
            # Fashion
            {'name': 'Cotton T-Shirt', 'category': 'Fashion', 'price': 19.99, 'stock': 150,
             'description': 'Premium quality 100% cotton comfortable t-shirt', 'rating': 4.4, 'color': '#e74c3c'},
            {'name': 'Denim Jeans', 'category': 'Fashion', 'price': 59.99, 'stock': 90,
             'description': 'Classic fit denim jeans with excellent durability', 'rating': 4.5, 'color': '#3498db'},
            {'name': 'Casual Sneakers', 'category': 'Fashion', 'price': 79.99, 'stock': 75,
             'description': 'Comfortable casual sneakers suitable for everyday wear', 'rating': 4.6, 'color': '#2ecc71'},
            {'name': 'Wool Winter Jacket', 'category': 'Fashion', 'price': 129.99, 'stock': 40,
             'description': 'Warm and stylish wool winter jacket', 'rating': 4.8, 'color': '#34495e'},
            {'name': 'Leather Belt', 'category': 'Fashion', 'price': 34.99, 'stock': 100,
             'description': 'Premium genuine leather belt with classic buckle', 'rating': 4.3, 'color': '#8B4513'},
            
            # Home & Garden
            {'name': 'LED Desk Lamp', 'category': 'Home & Garden', 'price': 29.99, 'stock': 110,
             'description': 'Adjustable LED desk lamp with touch control', 'rating': 4.5, 'color': '#f1c40f'},
            {'name': 'Plant Pot Set', 'category': 'Home & Garden', 'price': 24.99, 'stock': 80,
             'description': 'Set of 3 beautiful ceramic plant pots', 'rating': 4.4, 'color': '#27ae60'},
            {'name': 'Throw Pillow', 'category': 'Home & Garden', 'price': 19.99, 'stock': 120,
             'description': 'Soft and cozy throw pillow for comfort', 'rating': 4.2, 'color': '#e74c3c'},
            {'name': 'Wall Clock', 'category': 'Home & Garden', 'price': 34.99, 'stock': 60,
             'description': 'Modern minimalist wall clock', 'rating': 4.6, 'color': '#95a5a6'},
            {'name': 'Bedding Set', 'category': 'Home & Garden', 'price': 89.99, 'stock': 50,
             'description': 'Luxurious 3-piece bedding set with pillowcase', 'rating': 4.7, 'color': '#3498db'},
            
            # Sports & Outdoors
            {'name': 'Yoga Mat', 'category': 'Sports & Outdoors', 'price': 29.99, 'stock': 100,
             'description': 'Non-slip yoga mat with carrying strap', 'rating': 4.5, 'color': '#e74c3c'},
            {'name': 'Dumbbells Set', 'category': 'Sports & Outdoors', 'price': 79.99, 'stock': 40,
             'description': 'Adjustable dumbbell set 5-25 lbs', 'rating': 4.6, 'color': '#2c3e50'},
            {'name': 'Resistance Bands', 'category': 'Sports & Outdoors', 'price': 19.99, 'stock': 150,
             'description': 'Set of 5 resistance bands for home workouts', 'rating': 4.4, 'color': '#16a085'},
            {'name': 'Water Bottle', 'category': 'Sports & Outdoors', 'price': 24.99, 'stock': 200,
             'description': 'Insulated stainless steel water bottle keeps drinks cold', 'rating': 4.5, 'color': '#3498db'},
            {'name': 'Running Shoes', 'category': 'Sports & Outdoors', 'price': 99.99, 'stock': 60,
             'description': 'Professional running shoes with advanced cushioning', 'rating': 4.7, 'color': '#e74c3c'},
            
            # Books & Media
            {'name': 'Python Programming Book', 'category': 'Books & Media', 'price': 45.99, 'stock': 70,
             'description': 'Complete guide to Python programming for beginners', 'rating': 4.6, 'color': '#3498db'},
            {'name': 'Fiction Novel', 'category': 'Books & Media', 'price': 16.99, 'stock': 120,
             'description': 'Best-selling fiction novel - gripping storyline', 'rating': 4.4, 'color': '#e74c3c'},
            {'name': 'Self-Help Book', 'category': 'Books & Media', 'price': 19.99, 'stock': 90,
             'description': 'Transform your mindset with this self-help guide', 'rating': 4.5, 'color': '#2ecc71'},
        ]

        for prod_data in products_data:
            category_name = prod_data.pop('category')
            color = prod_data.pop('color')
            
            # Generate a simple product image
            img = Image.new('RGB', (300, 300), color=color)
            draw = ImageDraw.Draw(img)
            
            # Add text to image
            text = prod_data['name'][:20]
            draw.text((50, 140), text, fill='white')
            
            # Save image to memory
            img_io = io.BytesIO()
            img.save(img_io, 'PNG')
            img_io.seek(0)
            
            product = Product.objects.create(
                **prod_data,
                category=categories[category_name]
            )
            
            # Save image file
            product.image.save(f'{product.id}_{product.name.replace(" ", "_")}.png', 
                             ContentFile(img_io.getvalue()), save=True)
            
            self.stdout.write(f'Created product: {product.name} in category {category_name}')

        self.stdout.write(self.style.SUCCESS('Successfully populated database with test products'))
