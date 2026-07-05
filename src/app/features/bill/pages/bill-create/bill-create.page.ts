import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../core/services/api.service';
import { LoadingSpinnerComponent } from '../../../../shared/loading-spinner/loading-spinner.component';


@Component({
  selector: 'app-bill-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingSpinnerComponent],
  templateUrl: './bill-create.page.html',
  styleUrls: ['./bill-create.page.scss']
})
export class BillCreatePage implements OnInit {
  billForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: ActivatedRoute, private apiService: ApiService) {}
  private clientId: string | undefined = undefined;
  private clientDetails:any;
  isLoading = true;
  ngOnInit() {
    this.billForm = this.fb.group({
      customerName: ['', Validators.required],
      billDate: [new Date().toISOString().substring(0, 10), Validators.required],
      items: this.fb.array([]) 
    });

    this.addItem();

    this.router.queryParams.subscribe(params => {
       this.clientId = params['clientId'];
       this.apiService.getClientName(this.clientId).subscribe({
          next: (clientData) => {
            this.billForm.patchValue({ customerName: clientData.name });
            this.isLoading = false;
          },
          error: (err) =>{
            console.error('Failed to resolve client identity: componet', err)
             this.isLoading = false;
          } 
        });
    });

    this.apiService.getCreateBillDetails().subscribe({
      next: (createBillData) => {
        console.log(createBillData,"createBillData")
        if(this.clientId){
          this.clientDetails = createBillData.clientData.find((data)=> data.id == this.clientId)
          this.billForm.patchValue({ customerName: this.clientDetails.name });
        }
        this.isLoading = false;
      },
      error: (err) =>{
        console.error('Failed to resolve client identity: componet', err)
         this.isLoading = false;
      } 
    });
    

  }

  // Helper getter to easily access items array in HTML
  get itemsFormArray(): FormArray {
    return this.billForm.get('items') as FormArray;
  }

  // Add a new row to the items list
  addItem() {
    const itemGroup = this.fb.group({
      itemName: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      rate: [0, [Validators.required, Validators.min(0)]],
      discountRate: [0, [Validators.required, Validators.min(0)]]
    });

    this.itemsFormArray.push(itemGroup);
  }

  // Remove a row from the items list
  removeItem(index: number) {
    if (this.itemsFormArray.length > 1) {
      this.itemsFormArray.removeAt(index);
    }
  }

  // Calculate row total: (Rate - Discount) * Quantity
  calculateRowTotal(index: number): number {
    const row = this.itemsFormArray.at(index).value;
    const qty = row.quantity || 0;
    const rate = row.rate || 0;
    const disc = row.discountRate || 0;
    
    const finalRate = rate - disc;
    return finalRate > 0 ? finalRate * qty : 0;
  }

  // Calculate grand total of the entire bill
  get grandTotal(): number {
    let total = 0;
    for (let i = 0; i < this.itemsFormArray.length; i++) {
      total += this.calculateRowTotal(i);
    }
    return total;
  }

  onSubmit() {
    if (this.billForm.valid) {
      const finalPayload = {
        ...this.billForm.value,
        grandTotal: this.grandTotal
      };
      console.log('Form Submitted Data:', finalPayload);
      // Here you would call your backend service to save the bill
    } else {
      this.billForm.markAllAsTouched();
    }
  }
}