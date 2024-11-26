import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pelicula } from '../pelicula.model';
import { PeliculaService } from '../pelicula.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrl: './detalle-pelicula.component.scss'
})
export class DetallePeliculaComponent {
  reviewForm: FormGroup;
  movie!: Pelicula;
  subscription: Subscription = new Subscription();

  constructor(
    private peliculaService: PeliculaService,
    private activatedroute: ActivatedRoute,
    private toastrService: ToastrService,
    private fb: FormBuilder) {
    this.reviewForm = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(10)]],
      score: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      creator: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    const movieId = this.activatedroute.snapshot.params['id'];
    this.subscription.add(this.peliculaService.detallePelicula(movieId)
      .subscribe(movie => {
        this.movie = movie;
      }));
  }

  onSubmit(): void {
    if (this.reviewForm.valid) {
      this.peliculaService
        .crearReview(this.movie.id, this.reviewForm.value)
        .subscribe(movie => {
          window.scrollTo({ top: 0, behavior: 'smooth'});
          this.toastrService.success('Review added successfully');
          this.movie.reviews?.push({ ...this.reviewForm.value, id: "" });
          this.reviewForm.reset();
        });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
