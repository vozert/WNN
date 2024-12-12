document.addEventListener('DOMContentLoaded', function() {
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');

  // Function to add a message to the chat
  function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `flex items-start ${isUser ? 'justify-end' : ''} space-x-4`;

    const iconDiv = document.createElement('div');
    iconDiv.className = `w-10 h-10 rounded-full ${
      isUser 
        ? 'bg-white/20 border-2 border-white flex items-center justify-center' 
        : 'bg-secondary/20 border-2 border-secondary flex items-center justify-center'
    }`;
    
    const icon = isUser ? 
      `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
      </svg>` :
      `<svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
          d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"/>
      </svg>`;

    iconDiv.innerHTML = icon;

    const messageContent = document.createElement('div');
    messageContent.className = `${isUser ? 'bg-secondary' : 'bg-white/5'} rounded-lg p-4 max-w-[80%]`;
    messageContent.innerHTML = `<p class="text-white">${message}</p>`;

    if (isUser) {
      messageDiv.appendChild(messageContent);
      messageDiv.appendChild(iconDiv);
    } else {
      messageDiv.appendChild(iconDiv);
      messageDiv.appendChild(messageContent);
    }

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function addTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.className = 'flex items-start space-x-4';
    typingDiv.innerHTML = `
      <div class="w-10 h-10 rounded-full bg-secondary/20 border-2 border-secondary flex items-center justify-center">
        <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <!-- Bot icon SVG -->
        </svg>
      </div>
      <div class="bg-white/5 rounded-lg p-4 max-w-[80%]">
        <div class="flex space-x-2">
          <div class="w-2 h-2 bg-gray-200 rounded-full animate-bounce"></div>
          <div class="w-2 h-2 bg-gray-200 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
          <div class="w-2 h-2 bg-gray-200 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
        </div>
      </div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  function showLoadingState() {
    const loadingMessage = `
      <div class="flex items-start space-x-4">
        <div class="w-10 h-10 rounded-full bg-secondary/20 border-2 border-secondary flex items-center justify-center">
          <div class="animate-pulse w-6 h-6 bg-secondary/40 rounded-full"></div>
        </div>
        <div class="animate-pulse bg-white/5 rounded-lg p-4 space-y-2 max-w-[80%]">
          <div class="h-4 bg-white/10 rounded w-3/4"></div>
          <div class="h-4 bg-white/10 rounded w-1/2"></div>
        </div>
      </div>
    `;
    chatMessages.insertAdjacentHTML('beforeend', loadingMessage);
  }

  function showErrorState(message) {
    const errorMessage = `
      <div class="bg-red-500/10 border-2 border-red-500 rounded-lg p-4 my-4">
        <p class="text-red-500">${message}</p>
      </div>
    `;
    chatMessages.insertAdjacentHTML('beforeend', errorMessage);
  }

  // Handle form submission
  chatForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (message) {
      addMessage(message, true);
      chatInput.value = '';
      
      // Add typing indicator
      addTypingIndicator();
      
      // Simulate bot response
      setTimeout(() => {
        removeTypingIndicator();
        addMessage('Thank you for your message. I\'m processing your request...');
      }, 1500);
    }
  });
}); 