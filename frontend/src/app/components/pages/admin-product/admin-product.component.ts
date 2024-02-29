import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-admin-product',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  providers: [
    ProductService
  ],
  templateUrl: './admin-product.component.html',
  styleUrl: './admin-product.component.css'
})
export class AdminProductComponent implements OnInit {

  product: any = {};
  arrayFiles: any = [];
  images:any = [];
  downloadURL$!: Observable<string>;
  
  private storage: Storage = inject(Storage);

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.images = [];
    this.arrayFiles = [];
  }

  addFile(event: any) {
    let file = <File>event.target.files[0];
    console.log("añado file")
    this.arrayFiles.push(file);
    console.log('ARRAY',this.arrayFiles)
  }

  async submitProduct() {
    console.log('length', this.arrayFiles.length);
    let r = (Math.random() + 1).toString(36).substring(2, 22);
    for (let i = 0; i < this.arrayFiles.length; i++) {
      const filePath = `/${this.arrayFiles[i].name}`;
      const fileRef = ref(this.storage, `/products/${r}/${filePath}`);
      console.log('uploadprofile');
  
      await new Promise<void>((resolve, reject) => { // Añade <void> aquí
        const uploadFile = uploadBytesResumable(fileRef, this.arrayFiles[i])
          .on(
            'state_changed',
            (snapshot) => {},
            (error) => {
              reject(error);
            },
            async () => {
              this.images[i] = await getDownloadURL(fileRef);
              this.product.image = (this.images[i]);
              
              console.log("random", r);
              this.product.id = r;
              console.log(`--> images[${i}]`, this.product.image[i]);
              resolve(); // Pasando void aquí
            }
          );
      });
    }
  
    this.product.image = this.images;
    try {
      const res = await this.productService.createProduct(this.product).toPromise();
      // window.location.reload();
    } catch (err) {
      console.log('Error return admin', err);
    }
  }
  
  

  async submitProduct2() {

    console.log('length', await this.arrayFiles.length)
    for (let i = 0; i < await this.arrayFiles.length; i++) {
      const filePath =  `/${this.arrayFiles[i].name}`;
      const fileRef = ref(this.storage, `/products/1/${filePath}`);
      console.log('uploadprofile');
      const uploadFile = uploadBytesResumable(fileRef, await this.arrayFiles[i])
              .on('state_changed', (snapshot) => { },(error) => {},
                async () => {
                  this.images[i] = await getDownloadURL(fileRef);
                  await this.product.image.push(this.images[i]);
                  console.log(`--> images[${i}]`, await this.product.image[i]);
                }
              );
      // (snapshot) => {},(error) => {},
      // try {
      //   uploadFile.on('state_changed', 
      //   async () => {
      //     this.images[i] = await getDownloadURL(fileRef);
      //     this.product.image.push(this.images[i]);
      //     console.log(`--> images[${i}]`, this.product.image[i]);
      //   }
      // );
      // } catch (error) {
      //   console.log("ERROR!!!!!!!!!!!!", error);
      // }
      
    }


    this.product.image = await this.images;
    
    console.log('this.product.image', this.product.image)
    return this.productService.createProduct(this.product)
      .subscribe(
        res => {

          console.log('RESPONSEEEEEEEEEEEEEEE', res);
          // window.location.reload();

        },
        err => {
          
          console.log('Error return admin', err)
        }
      )

  }

  async submitProduct1() {

    for (let i = 0; i < this.arrayFiles.length; i++) {
      const filePath = `/${this.arrayFiles[i].name}`;
      const fileRef = ref(this.storage, `/products/${filePath}`);
      const uploadFile = uploadBytesResumable(fileRef, this.arrayFiles[i]);
      try {
        await uploadFile.on('state_changed',
        async () => {
          this.images[i] = await getDownloadURL(fileRef);
          // await this.product.image.push(this.images[i]);
          console.log(`--> images[${i}]`, this.images[i]);
        }
      );
      } catch (error) {
        console.log("ERROR!!!!!!!!!!!!", error);
      }
      
    }


    this.product.image = await this.images;

    return await this.productService.createProduct(this.product)
      .subscribe(
        res => {
          console.log('RESPONSEEEEEEEEEEEEE',res);
        },
        err => {
          
          console.log('Error return admin', err)
        }
      )

  }

}
