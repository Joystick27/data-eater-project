import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routin.module';

import { DropdownDirective } from './resources/directives/dropdown.directive';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthService } from './resources/services/auth.service';
import { RedirectService } from './resources/services/redirect.service';
import { ActivateComponent } from './activation/activate/activate.component';
import { ActivationComponent } from './activation/activation.component';
import { SettingsService } from './resources/services/settings.service';
import { SettingsComponent } from './settings/settings.component';
import { PlatformService } from './resources/services/platform.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { UploadService } from './resources/services/upload.service';
import { UploadComponent } from './upload/upload.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataService } from './resources/services/data.service';
import { DashboardItemComponent } from './dashboard/dashboard-item/dashboard-item.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		DropdownDirective,
		FooterComponent,
		LoginComponent,
		SignupComponent,
		ActivateComponent,
		ActivationComponent,
		SettingsComponent,
		UploadComponent,
		DashboardComponent,
		DashboardItemComponent
	],
	imports: [
		BrowserModule.withServerTransition({ appId: 'serverApp' }),
		NgbModule,
		ReactiveFormsModule,
		HttpClientModule,
		AppRoutingModule,
		BrowserAnimationsModule
	],
	providers: [
		AuthService,
		RedirectService,
		SettingsService,
		PlatformService,
		UploadService,
		DataService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
