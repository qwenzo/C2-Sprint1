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
    let user: string = localStorage.getItem('type');
    if(JSON.parse(user)=== "user"){
      console.log('1');
      this.settings.actions={
        add: false,
      edit: false,
       delete: false,
       columnTitle: 'Search',
      };
    }
    else if(JSON.parse(user) === "admin"){
      console.log('3');
      this.settings.actions={
        add: true,
      edit: true,
       delete: true,
       columnTitle: 'Search',
      };
     
    }
    else if(JSON.parse(user) === "manager"){
      console.log('2');
      this.settings.actions={
        add: true,
      edit: true,
       delete: false,
       columnTitle: 'Search',
      };
     
    }
  }

  settings = {
    // mode: 'external',
    editor: {
      config: false
    },
    add: {
      inputClass: "ID",
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
    actions: {
      add: false,
      edit: false,
       delete: false,
      columnTitle: 'Search'
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
