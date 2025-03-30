import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-details',
  imports: [],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css',
})
export class CategoryDetailsComponent implements OnInit {
  categoryData: any;
  categoryId: string | null = null;
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.categoryId) {
      this.fetchCategory(this.categoryId);
    }
  }

  fetchCategory(id: string) {
    this.http.get(`https://localhost:7280/api/Category/${id}`).subscribe(
      (data) => {
        this.categoryData = data;
        console.log(this.categoryData);
      },
      (error) => {
        console.error('Error fetching category data', error);
      }
    );
  }
}
