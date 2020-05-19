import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PhotosService } from 'src/app/_services/photos.service';
import { environment } from 'src/environments/environment';
import { Photo } from 'src/app/_models/photo';
import { FileUploader } from 'ng2-file-upload';
import { faTrash, faBan, faUpload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-photos-manager',
  templateUrl: './photos-manager.component.html',
  styleUrls: ['./photos-manager.component.css'],
})
export class PhotosManagerComponent implements OnInit {
  photos: Photo[];
  baseUrl = environment.gatewayUrl;
  constructor(private photosService: PhotosService, private toastr: ToastrService) {}
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  response: string;
  faTrash = faTrash;
  faBan = faBan;
  faUpload = faUpload;

  ngOnInit() {
    this.getPhotos();
    this.initializeUploader();
  }
  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 3 * 1024 * 1024,
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
        };
        this.photos.push(photo);
        this.toastr.success('Zdjęcie pomyślnie dodane');
      }
    };
  }

  getPhotos() {
    this.photosService.getPhotos().subscribe(
      (data) => {
        this.photos = data;
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }

  deletePhoto(photo: Photo) {
    this.photosService.deletePhoto(photo.id).subscribe(
      () => {
        this.toastr.info('Zdjęcie usunięte');
        this.photos = this.photos.filter((p) => p !== photo);
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }
}
