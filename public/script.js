document.addEventListener('DOMContentLoaded', function() {
    function updateTime() {
      const now = new Date();
      const timeElement = document.getElementById('time');
      const options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      };
      let dateTimeString = now.toLocaleString(undefined, options);
      dateTimeString = dateTimeString.replace('at', '').trim();
      const [timeString, dateString] = dateTimeString.split(', ');
      const dateOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      };
      const dateStringFormatted = now.toLocaleDateString(undefined, dateOptions);
      timeElement.innerHTML = `<div class="time">${timeString}</div><div class="date">${dateStringFormatted}</div>`;
    }
  
    updateTime();
    setInterval(updateTime, 1000);
   
    
    
    const consoleText = document.querySelector('.console-text');
    const consoleInput = document.querySelector('.console-input');
    const consoleForm = document.querySelector('.console-prompt');
    const consolePath = document.querySelector('.console-path');
    const consoleUsername = document.querySelector('.console-username');
    
    let currentDirectory = '~';
    
    consoleInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        let command = consoleInput.value.trim();
        consoleInput.value = '';
        consoleLog(`${consoleUsername.textContent}${consolePath.textContent} ${command}`);
        parseCommand(command);
      }
    });
    
    function parseCommand(command) {
      let args = command.split(' ');
      switch (args[0]) {
        case 'ls':
          consoleLog('Answers     index.html    style.css    script.js');
          break;
        case 'cd':
          if (args[1] === '..') {
            currentDirectory = '~';
          } else {
            consoleLog(`bash: cd: ${args[1]}: No such file or directory`);
          }
          consolePath.textContent = currentDirectory;
          break;
        case 'CTF':
          if (args[1]) {
            fetch(`Answers/${args[1]}.txt`)
              .then((response) => response.text())
              .then((data) => {
                consoleLog(`<pre class="language-python">${data}</pre>`, true);
              })
              .catch((error) => {
                consoleLog(`Error: ${error}`);
              });
          } else {
            consoleLog(`CTF Commands:
              1- Arithmetic
              2- Numbers
              3- Wrong Check
              4- Public Keys
              5- Update Feed
              6- Memo`);
          }
          break;
        case 'about':
          consoleLog(`Terminal Console v1.0
          Built with HTML, CSS, and JavaScript.
          Created by D3VXIX.`);
          break;
        case 'help':
          consoleLog(`
          Type 'ls' to list the files in the current directory.
          Type 'cd ..' to navigate to the parent directory.
          Type 'CTF' to see available commands.
          Type 'CTF [command number]' to view the answer.
          Type 'about' to view information about the console`
          );
        case 'clear':
          consoleText.innerHTML = '';
          consoleLog(`Welcome to the console!
    Type 'ls' to list the files in the current directory.
    Type 'cd ..' to navigate to the parent directory.
    Type 'CTF' to see available commands.
    Type 'CTF [command number]' to view the answer.
    Type 'about' to view information about the console`
    );
          break;
        default:
          consoleLog(`bash: ${args[0]}: command not found`);
      }
    }
    
    function consoleLog(message) {
      let consoleLine = document.createElement('div');
      let formattedMessage = message
        .replace(/(#[^\n]+)/g, '<span class="console-green">$1</span>') // modified regex to match whole line after '#'
        .replace(/\b(from)\b/g, '<span class="console-purple">$1</span>')
        .replace(/\b(import)\b/g, '<span class="console-purple">$1</span>')
        .replace(/\b(print)\b/g, '<span class="console-orange">$1</span>')
        .replace(/\b(def)\b/g, '<span class="console-blue">$1</span>')
        .replace(/\(/g, '<span class="console-paren">(</span>')
        .replace(/\)/g, '<span class="console-paren">)</span>')
        .replace(/\]/g, '<span class="console-bracket">]</span>')
        .replace(/\[/g, '<span class="console-bracket">[</span>')
        .replace(/\b(if)\b/g, '<span class="console-purple">$1</span>')
        .replace(/\b(return)\b/g, '<span class="console-green">$1</span>')
        .replace(/\b(True)\b/g, '<span class="console-blue">$1</span>')
        .replace(/\b(exit)\b/g, '<span class="console-bracket">$1</span>')
    
      consoleLine.innerHTML = formattedMessage;
      consoleText.appendChild(consoleLine);
      consoleText.scrollTop = consoleText.scrollHeight;
    }
    
    consoleLog(`Welcome to the console!
    Use the command [help] to get additional information about using this console.`);
    
    consolePath.textContent = currentDirectory;
  });


