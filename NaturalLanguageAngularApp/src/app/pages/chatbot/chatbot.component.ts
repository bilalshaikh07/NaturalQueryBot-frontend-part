import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatbotService, ChatResponse } from '../../services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  standalone: false,
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent {


  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  userInput = '';
  messages: any[] = [];
  loading = false;

  constructor(private chatService: ChatbotService) {}

  sendMessage() {
    const text = this.userInput.trim();
    if (!text) return;

    // Add user message
    this.messages.push({ sender: 'user', text });
    this.userInput = '';
    this.scrollToBottom();

    // Show loading spinner
    this.loading = true;

    // Call backend API
    this.chatService.askQuestion(text)
    .subscribe({
      next: (res: ChatResponse) => {
        this.messages.push({
          sender: 'bot',
          text: 'Here is the result:',
          query: res.query,
          rowsCount: res.rowsCount,
          data: res.data
        });
        this.loading = false;
        this.scrollToBottom();
      },
      error: (err) => {
        console.error(err);
        this.messages.push({
          sender: 'bot',
          text: '⚠️ Sorry, something went wrong.'
        });
        this.loading = false;
        this.scrollToBottom();
      }
    });
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  private scrollToBottom() {
    setTimeout(() => {
      if (this.chatContainer) {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      }
    }, 100);
  }
}
