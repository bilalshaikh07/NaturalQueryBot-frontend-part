import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatbotComponent } from './pages/chatbot/chatbot.component';

const routes: Routes = [
  {path: '' , redirectTo:'chatbot' , pathMatch:'full'},
    {
    path: 'chatbot',
    loadChildren: () => import('./pages/chatbot/chatbot.module').then((m) => m.ChatbotModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
