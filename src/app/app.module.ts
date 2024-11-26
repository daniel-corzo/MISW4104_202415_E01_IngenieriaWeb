import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActorModule } from './actor/actor.module';
import { DirectorModule } from './director/director.module';
import { GeneroModule } from './genero/genero.module';
import { PeliculaModule } from './pelicula/pelicula.module';
import { PlataformaModule } from './plataforma/plataforma.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './common/http-interceptor.service';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ActorModule,
    DirectorModule,
    GeneroModule,
    PeliculaModule,
    PlataformaModule,
    HomeModule,
    SharedModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      closeButton: true
    }),
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
