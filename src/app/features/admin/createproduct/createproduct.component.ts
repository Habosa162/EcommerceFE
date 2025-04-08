import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from '../../../Services/product.service';
import { SubCategoryService } from '../../../Services/sub-category.service';
import { SubCategory } from './../../../core/models/subCategory.model';
import { IProductCreate } from './../../../core/models/product.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-createproduct',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './createproduct.component.html',
})
export class CreateproductComponent implements OnInit {
  productForm!: FormGroup;
  products: any[] = [];
  selectedFile!: File;
  subCategories!: SubCategory[];
  newProduct: IProductCreate = {
    name: '',
    description: '',
    price: 0,
    subCategoryId: 0,
    stock: 0,
    avgRate: 0,
    brand: '',
    discountAmount: 0,
    color: '',
    finalPrice: 0,
  };

  constructor(
    private productService: ProductService,
    private subCategoryService: SubCategoryService
  ) { }

  ngOnInit(): void {
    this.subCategoryService.getsubCategories().subscribe((data) => {
      this.subCategories = data;
    });

    // this.productForm = new FormGroup({
    //   name: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9\s]+$/)]),
    //   price: new FormControl(0, [Validators.required, Validators.min(0)]),
    //   description: new FormControl('', Validators.required),
    //   brand: new FormControl(''),
    //   stock: new FormControl(0, [Validators.min(0)]),
    //   avgRate: new FormControl(0),
    //   discountAmount: new FormControl(0, [Validators.min(0)]),
    //   color: new FormControl(''),
    //   finalPrice: new FormControl({ value: 0, disabled: true }),
    //   subCategoryId: new FormControl('', Validators.required)
    // });

    // // Listen to price and discountAmount value changes
    // this.productForm.get('price')?.valueChanges.subscribe(() => {
    //   this.calculateFinalPrice();
    // });
    // this.productForm.get('discountAmount')?.valueChanges.subscribe(() => {
    //   this.calculateFinalPrice();
    // });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
      }
      this.selectedFile = file;
    }
  }

  resetForm(): void {
    this.newProduct = {
      name: '',
      description: '',
      price: 0,
      subCategoryId: 0,
      stock: 0,
      avgRate: 0,
      brand: '',
      discountAmount: 0,
      color: '',
      finalPrice: 0,
    };
    this.selectedFile = null!;
  }

  
  calculateFinalPrice(): void {
    // Recalculate final price whenever price or discount changes
    this.newProduct.finalPrice = this.newProduct.price - this.newProduct.discountAmount;
    if (this.newProduct.finalPrice < 0) {
      this.newProduct.finalPrice = 0; // Prevent negative final price
    }
  }
  onPriceChange(): void {
    this.calculateFinalPrice();
  }

  onDiscountChange(): void {
    this.calculateFinalPrice();
  }

  createProduct(): void {
    console.log('Form submitted with data:', this.newProduct);

    if (!this.newProduct.name || !this.newProduct.price || !this.selectedFile) {
      console.warn('Validation failed - missing required fields');
      alert('Please fill in all required fields (Name, Price, and Image).');
      return;
    }
    this.calculateFinalPrice();

    // Create FormData object
    const formData = new FormData();
    formData.append('Name', this.newProduct.name);
    formData.append('Description', this.newProduct.description);
    formData.append('Price', this.newProduct.price.toString());
    formData.append('SubCategoryId', this.newProduct.subCategoryId.toString());
    formData.append('Stock', this.newProduct.stock.toString());
    formData.append('AvgRate', this.newProduct.avgRate.toString());
    formData.append('Brand', this.newProduct.brand);
    formData.append('DiscountAmount', this.newProduct.discountAmount.toString());
    formData.append('color', this.newProduct.color);
    formData.append('finalPrice', this.newProduct.finalPrice.toString());
    formData.append('productImage', this.selectedFile);

    console.log('FormData being sent:', formData);

    this.productService.createProduct(formData).subscribe({
      next: (product) => {
        console.log('API Response:', product);
        this.products.push(product);
        alert('Product created successfully!');
        this.resetForm();
      },
      error: (err) => {
        console.error('Full error details:', err);
        alert(`Failed to create product: ${err.message || 'Unknown error'}`);
      },
    });
  }


}
