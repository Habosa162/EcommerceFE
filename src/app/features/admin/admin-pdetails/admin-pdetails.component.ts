import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../Services/product.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-pdetails',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './admin-pdetails.component.html',
})
export class AdminPDetailsComponent implements OnInit {
  product!: Product;
  isModalOpen: boolean = false;
  selectedProduct: any = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    subCategoryId: 0,
    subCategoryName: '',
    imageUrl: '',
    stock: 0,
    avgRate: 0,
    brand: '',
    discountAmount: 0,
    isAccepted: false,
    isDeleted: false,
    color: '',
    finalPrice: 0,
    title: '',
    category: '',
    reviewCount: 0,
    priceRange: '',
    stockQuantity: 0,
  };

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductById(productId).subscribe({
      next: (product: any) => {
        this.product = product;
        this.calculateFinalPrice();
      },
      error: (err) => console.error('Error fetching product details:', err)
    });
  }


  editProduct(product: Product): void {
    this.selectedProduct = { ...product };
    this.isModalOpen = true;
  }
  closeModal(): void {
    this.isModalOpen = false;
  }

  updateProduct(): void {
    const formData = new FormData();

    // Append all product fields to the FormData
    formData.append('name', this.selectedProduct.name);
    formData.append('price', this.selectedProduct.price.toString());
    formData.append('discountamount', this.selectedProduct.discountAmount.toString());
    formData.append('description', this.selectedProduct.description);
    formData.append('subCategoryId', this.selectedProduct.subCategoryId.toString());
    formData.append('stock', this.selectedProduct.stock);
    formData.append('color', this.selectedProduct.color);
    formData.append('brand', this.selectedProduct.brand);




    // Check if the image is a file and append it to the FormData
    if (this.selectedProduct.imageUrl instanceof File) {
      formData.append('imageUrl', this.selectedProduct.imageUrl);
    }

    this.productService.updateProduct(formData, this.selectedProduct.id).subscribe(
      (response: any) => {
        alert('Product updated successfully:');
        this.changeDetectorRef.detectChanges();
        this.closeModal();
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }

  calculateFinalPrice(): void {
    // Recalculate final price whenever price or discount changes
    this.product.finalPrice = this.product.price - this.product.discountAmount;
    if (this.product.finalPrice < 0) {
      this.product.finalPrice = 0; // Prevent negative final price
    }
  }

  deleteProduct(): void {
    if (this.product && confirm('Are you sure you want to delete this product?')) {

      this.productService.deleteProduct(this.product.id).subscribe({
        next: () => {
          alert('Product deleted successfully!');
          this.router.navigate(['/manageproducts']);
        },
        error: (err) => console.error('Error deleting product:', err)
      });
    }
  }
}


