import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { AdminService } from '../admin.service';
import { Stuff } from '../stuff';

const URL = 'https://hwtp.herokuapp.com/stuff/file';
@Component({
  selector: 'app-admin-stuff-creator',
  templateUrl: './admin-stuff-creator.component.html',
  styleUrls: ['./admin-stuff-creator.component.scss']
})
export class AdminStuffCreatorComponent implements OnInit {

  stuffForm: FormGroup;
  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'file'});

  courses = [1, 2, 3, 4];
  semesters = [1, 2];

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.stuffForm = fb.group({
      file: ['', Validators.required],
      subject: ['', Validators.required],
      teacher: ['', Validators.required],
      course: ['', Validators.required],
      semester: ['', Validators.required],
      lab: ['', Validators.required],
      exercise: ['', Validators.required],
      price: ['', Validators.required],
    });
   }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('ImageUpload:uploaded:', item, status, response);
     };
  }

  addStuff() {
    if (this.stuffForm.valid) {
      const stuff: any = this.stuffForm.value;
      this.adminService.addStuff(stuff).subscribe((res) => {
        this.uploader.uploadAll();
        this.stuffForm.controls['file'].setValue('');
      });
    }

  }

}
