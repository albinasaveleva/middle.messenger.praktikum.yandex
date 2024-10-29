export default `
  <div class="top-bar">
    <div class="info">
      <span class="name">Андрей</span>
    </div>
    <div class="actions"></div>
  </div>
  <div class="messages">
  </div>
  <div class="send-message">
    <form name="message-form" id="message-form" onsubmit="return false;">
      <div class="attach"></div>
      {{{messageInput}}}
      {{{buttonSend}}}
    </form>
  </div>
`;