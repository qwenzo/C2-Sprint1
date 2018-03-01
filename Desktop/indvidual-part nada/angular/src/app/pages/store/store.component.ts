import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { APIService } from '../../app_services/api.service';
import { APIData, Product } from '../../app_services/models/api.data.structure';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'store',
  templateUrl: './template/store.component.html',
  styleUrls: ['./template/store.component.scss']
})

export class StoreComponent implements OnInit {

  ngOnInit() {

  }

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark" ></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      //onAdded: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        editable: false,
        addable: false,
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      price: {
        title: 'Price',
        type: 'number',
      },
      createdAt: {
        title: 'CreatedAt',
        type: 'string',
        editable: false,
        addable: false,
      },
      updatedAt: {
        title: 'UpdatedAt',
        type: 'string',
        editable: false,
        addable: false,
      },
      seller: {
        title: 'Seller',
        type: 'string',
        editable: false,
        addable: false,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();




  constructor(private _apiService: APIService) {
    this._apiService.getProducts().subscribe((apiresponse: APIData)=>{
      this.source.load( apiresponse.data);
    });

    this.source.onAdded().subscribe((productData :Product)=>{
      var user =localStorage.getItem('currentUser');
      productData.seller = user;
    this._apiService.createProduct(productData).subscribe((apiresponse: APIData)=>{
      console.log(apiresponse);
      this._apiService.getProducts().subscribe((apiresponse: APIData)=>{
        this.source.load( apiresponse.data);
      });
    });
  });
  this.source.onRemoved().subscribe((productData :Product)=>{
  this._apiService.deleteProduct(productData).subscribe((apiresponse: APIData)=>{
    console.log(apiresponse);
    this._apiService.getProducts().subscribe((apiresponse: APIData)=>{
      this.source.load( apiresponse.data);
    });
  });
});


this.source.onUpdated().subscribe((productData :Product)=>{
this._apiService.updateProduct(productData).subscribe((apiresponse: APIData)=>{
  console.log(apiresponse);
  this._apiService.getProducts().subscribe((apiresponse: APIData)=>{
    this.source.load( apiresponse.data);
  });
});
});






  }
  // onAdded() : void{
  //
  //     this._apiService.createProduct(Product : Product).subscribe((apiresponse: APIData)=>{
  //       console.log(1);
  //     });
  //
  //
  //
  //
  // }


  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
