import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { HttpClientModule } from '@angular/common/http';

const bootstrap = () => bootstrapApplication(AppComponent, {
  providers: [
    { provide: HttpClientModule, useClass: HttpClientModule },
  ]
});

export default bootstrap;
