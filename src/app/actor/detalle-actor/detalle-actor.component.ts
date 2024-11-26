import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Actor } from '../actor.model';
import { ActorService } from '../actor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle-actor',
  templateUrl: './detalle-actor.component.html',
  styleUrls: ['./detalle-actor.component.scss']
})
export class DetalleActorComponent implements OnInit {

  actor!: Actor;
  subscription: Subscription = new Subscription();

  constructor(
    private actorService: ActorService,
    private router: Router,
    private activatedroute: ActivatedRoute) { }

    ngOnInit(): void {

      const actorId = this.activatedroute.snapshot.params['id'];
      this.subscription.add(this.actorService.detalleActor(actorId)
        .subscribe(actor => {
        this.actor = actor;
      }));
    }
  
    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }

    redirectToMovie(movieId: string): void {
      this.router.navigate(['movies', movieId]);
    }

}
