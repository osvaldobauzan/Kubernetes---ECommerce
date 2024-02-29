import { Component, inject , OnInit } from '@angular/core';
import { XutilitiesService } from '../../../services/xutilities.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { provideFirebaseApp } from '@angular/fire/app';
import { jwtDecode } from "jwt-decode";


@Component({
  selector: 'app-product-review',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    // Firestore
  ],
  providers: [
    XutilitiesService,
    
  ],
  templateUrl: './product-review.component.html',
  styleUrl: './product-review.component.css'
})
export class ProductReviewComponent implements OnInit{

  productId:string | null = null;
  reviews:any = [];
  newReview:any ={};
  userId:string | null = null;

  downloadURL$!: Observable<string>;
  private storage: Storage = inject(Storage);
  
  /**
   * Variables para imágenes
   * selectedFile: File = null;
   * fd = new FormData();
   */
  selectedFile: File | null = null;;
  fd = new FormData();
  /** */
  constructor(
    private xutilitiesService:XutilitiesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    
    let token = ''

    if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem('token') || '';
      if ( token.length > 0 && token !== null){
        // console.log("tok tok", token);
        this.userId = (JSON.parse(atob(token.split('.')[1]))).id;
      }
    }

    // Obtener product  Id de la URL
    this.route.params.subscribe(
      params => {
        this.productId = params['id'];
      }
    )

    // Obtenemos todas las Reviews del producto
    this.xutilitiesService.getReviewsByProduct(this.productId)
      .subscribe(
        res =>{
          this.reviews = res.reviews;
        },
        err => {
          console.log(err);
        }
      )
  }

  async submitReview(){

    // https://www.npmjs.com/package/@angular/fire/v/17.0.0
    // https://www.youtube.com/watch?v=gUCvOZzAXGg
    // https://github.com/Carranza12/SIGNAL-EXAMPLE-APP/blob/storage/src/app/pages/form-file/form-file.component.ts
    
    this.newReview.userId = this.userId;

    let url = '';
    if (this.selectedFile != null){
      const filePath = `/${this.selectedFile.name}`;
      const fileRef = ref(this.storage, filePath);
      const uploadFile = uploadBytesResumable(fileRef, this.selectedFile);
      uploadFile.on('state_changed',
      async () => {
        url = await getDownloadURL(fileRef);
        // console.log("url", url);
        if (url !== ''){
          this.newReview.image = url;
          // console.log('if', url);
        } else {
          // console.log('else' ,url);
          this.newReview.image = 'No image'
        }

        return this.xutilitiesService.createReview(this.productId, this.newReview)
            .subscribe(
              res => {
                window.location.reload();
              },
              err => {
                console.log(err)
              }
            )
    
      }
      );
    } else // Si no ha seleccionado fichero 
    {
      return this.xutilitiesService.createReview(this.productId, this.newReview)
                .subscribe(
                  res => {
                    // console.log(res);                
                    window.location.reload();
                  },
                  err => {
                    console.log(err)
                    
                  }
                )
    }

    return this.xutilitiesService.createReview(this.productId, this.newReview)
   
    
  }

  createFormData(event:any) {
    this.selectedFile = <File>event.target.files[0];
    this.fd.append('file', this.selectedFile, this.selectedFile.name);
   
  }

  getDecodedAccessToken(token: string): string {
    try {
      return jwtDecode(token);
    } catch(Error) {
      return '';
    }
  }
  getStarsArray(rating: number): number[] {
    return Array.from({ length: rating }, (_, i) => i + 1);
  }
}
// https://medium.com/angular-chile/subir-archivos-a-firebase-cloud-storage-con-angular-7-d735d5dbfa53
// 