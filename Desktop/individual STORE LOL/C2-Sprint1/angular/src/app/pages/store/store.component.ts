import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
//import { SmartTableService } from '../../../@core/data/smart-table.service';
import { APIService } from '../../app_services/api.service';
import { APIData  , Product } from '../../app_services/models/api.data.structure'


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
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
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
      },
      updatedAt: {
        title: 'UpdatedAt',
        type: 'string',
      },
      seller: {
        title: 'Seller',
        type: 'string',
      },
    },
  };

  source : LocalDataSource = new LocalDataSource();

  constructor(private apiServ:APIService){
    this.apiServ.getProducts().subscribe((apires : APIData) =>{
      this.source.load(apires.data);

    });

    this.source.onAdded().subscribe((product:  Product) =>{
      this.apiServ.createProduct(product).subscribe((apires : APIData) =>{
      });
    });

    this.source.onRemoved().subscribe((product:  Product  ) =>{
      this.apiServ.deleteProduct(product).subscribe((apires : APIData) =>{
      });
    });
    this.source.onUpdated().subscribe((product:  Product  ) =>{
      this.apiServ.updateProduct(product).subscribe((apires : APIData) =>{
      });
    });


  }



  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
