import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-review-confirm',
  templateUrl: './review-confirm.component.html',
  styleUrls: ['./review-confirm.component.css']
})
export class ReviewConfirmComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }
  options = {
    "key": "rzp_test_rEnj14xeusjAJM", // Enter the Key ID generated from the Dashboard
    "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Admin",
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
    "prefill": {
        "name": "rcpl",
        "email": "gaurav.kumar@example.com",
        "contact": "9999999999"
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
   
  };
  rzp1;
  Pay()
   {
    this.rzp1 = new this.api.nativeWindow.Razorpay(this.options);
    this.rzp1.open();
    }  
}
