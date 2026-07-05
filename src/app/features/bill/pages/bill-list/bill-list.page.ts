import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../../../shared/table/table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../core/services/api.service';

@Component({
  selector: 'app-bill-list',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './bill-list.page.html',
  styleUrls: ['./bill-list.page.scss']
})
export class BillListPage implements OnInit {
  constructor(private router: Router,private route: ActivatedRoute, private apiService: ApiService) {}
  
  billHeaders = ['Bill No', 'Name', 'Amount', 'Due Amount', 'Details'];
  billColumns = ['billNo', 'name', 'amount', 'dueAmount']; 
  clientId:string | null = null; // Example client ID, replace with actual data as needed

  data = [
    { billNo: 'B001', name: 'John', amount: 2000, dueAmount: 500 },
    { billNo: 'B002', name: 'Alex', amount: 3000, dueAmount: 0 }
  ];

  ngOnInit() {
    this.apiService.getBills().subscribe({
      next: (bills) => {

        console.log('Fetched bills:', bills);           
        this.data = bills.map(bill => ({
          billNo: bill.billNo,
          name: bill?.name,
          amount: bill.amount,
          dueAmount: bill.dueAmount
        }));
      },
      error: (err) => {
        console.error('Failed to fetch bills:', err);
      }
    });
  }

  goToDetailsPage(id: string) {
    // this.router.navigate(['/bills', id]);
    console.log('Navigating to details page for bill ID:', id);
  }

  createBill() {
    console.log('User clicked button, navigating now...');
    const queryParams: any = {};
    if (this.clientId) {
      queryParams.clientId = this.clientId;
    }
    this.router.navigate(['create'],{relativeTo: this.route,queryParams: queryParams}); 
  }

  
}