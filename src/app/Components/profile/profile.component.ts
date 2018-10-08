import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { throws } from 'assert';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: User = new User();
  profileImage;
  fileImage: FileList = null;//ilerde bakılacak.Apiye gönderilip kaydedilip apiden çağırmak lazım.
  constructor(private _userService: UserService, private _toastrService: ToastrService) { }

  ngOnInit() {
    let userId = localStorage.getItem("userId");
    this._userService.getToUser(Number(userId)).subscribe(p => this.profile = p);

  }

  save() {

    this._userService.updateProfile(this.profile).subscribe(success => {
      if (success.errors) {
        this._toastrService.error(success.errors.message, success.errors.code.toString());
      }
      else {
        this._toastrService.success("Kayıt başarılı");

      }
    }, err => {
      // console.log(err);
      throw(err);
    });
  }

  upload() {
    this._userService.updateToProfileImage(this.fileImage.item(0)).subscribe(p => {
      console.log(p);
      this.profile = p.result
    });
  }
}
