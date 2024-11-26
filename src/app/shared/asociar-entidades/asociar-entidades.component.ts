import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-asociar-entidades',
  templateUrl: './asociar-entidades.component.html',
  styleUrl: './asociar-entidades.component.scss'
})
export class AsociarEntidadesComponent implements OnInit {
  linkForm: FormGroup;

  firstEntity!: string;
  secondEntity!: string;

  firstEntityList: any[] = [];
  secondEntityList: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
  ) {
    this.linkForm = this.fb.group({
      firstEntity: ['', Validators.required],
      secondEntity: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.firstEntity = params['firstEntity'];
      this.secondEntity = params['secondEntity'];

      this.sharedService.getData(this.firstEntity).subscribe(data => {
        this.firstEntityList = data;
      });

      this.sharedService.getData(this.secondEntity).subscribe(data => {
        this.secondEntityList = data;
      });

    });
  }

  titleForm () {
    return `Link ${this.firstEntity} with ${this.secondEntity}`;
  }

  getDisplayName(entity: any): string {
    if ('name' in entity) {
      return entity.name;
    } else if ('title' in entity) {
      return entity.title;
    }
    return 'Unknown';
  }


  onSubmit(): void {
    if (!this.linkForm.valid) {
      return;
    }

    const linkEntitiesRequest = {
      firstEntity: this.linkForm.get('firstEntity')?.value,
      secondEntity: this.linkForm.get('secondEntity')?.value,
    };

    this.sharedService.linkEntities(this.firstEntity, this.secondEntity, linkEntitiesRequest.firstEntity, linkEntitiesRequest.secondEntity).subscribe(
      () => {
        this.toastrService.success('Entities linked successfully');
        this.linkForm.reset();
      },
      (error) => {
        this.toastrService.error('Error linking entities');
      }
    );
  }
}
