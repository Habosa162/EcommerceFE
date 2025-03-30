import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  categories: any[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories() {
    this.http.get<any[]>('https://localhost:7280/api/Category').subscribe(
      (data) => {
        this.categories = data.slice(0, 6);
        console.log(this.categories);
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }
}
