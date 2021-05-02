import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { HomeComponent } from './home/home.component';
import { ResultComponent } from './result/result.component';
import { ReportComponent } from './report/report.component';


const routes: Routes = [
  {
    path: 'quiz',
    component: QuizComponent
  },
  {
    path: 'home',
    component: HomeComponent,

  },
  {
    path: 'result',
    component: ResultComponent

  },
  {
    path: 'report',
    component: ReportComponent

  },
  {
    path      : '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
