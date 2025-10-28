import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatbotRoutingModule } from './chatbot-routing.module';
import { ChatbotComponent } from './chatbot.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ChatbotComponent],
  imports: [
    CommonModule,
    ChatbotRoutingModule,
    FormsModule
  ]
})
export class ChatbotModule { }
