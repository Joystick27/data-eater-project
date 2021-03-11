import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivateComponent } from './activation/activate/activate.component';
import { ActivationComponent } from './activation/activation.component';

import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { DashboardItemComponent } from './dashboard/dashboard-item/dashboard-item.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadComponent } from './upload/upload.component';

const appRoutes: Routes = [
	{ path: '', redirectTo: '/auth', pathMatch: 'full' },
	{
		path: 'auth', children: [
			{ path: '', component: LoginComponent, pathMatch: 'full' },
			{ path: 'signup', component: SignupComponent }
		]
	},
	{
		path: 'activation',
		children: [
			{ path: '', component: ActivateComponent, pathMatch: 'full' },
			{ path: ':token', component: ActivationComponent }
		]
	},
	{ path: 'upload', component: UploadComponent },
	{
		path: 'dashboard',
		children: [
			{ path: '', component: DashboardComponent, pathMatch: 'full' },
			{ path: ':id', component: DashboardItemComponent }
		]
	},
	{ path: '**', redirectTo: '/dashboard' }
];
@NgModule({
	imports: [RouterModule.forRoot(appRoutes, { useHash: true, initialNavigation: 'enabled' })],
	exports: [RouterModule]
})
export class AppRoutingModule {


}