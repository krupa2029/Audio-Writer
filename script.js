var speechRecognition = window.webkitSpeechRecognition

var recognition = new speechRecognition()

var textbox = $("#textbox")

var instructions= $("#instructions")

var content = ''

// let output = document.getElementById('textbox');

let buttons = document.getElementsByClassName('tool--btn');

recognition.continuous = true;

// recognition is started

recognition.onstart = function(){
    instructions.text("Voice Recognition is on")
};

recognition.onstop = function(){
    instructions.text("Voice Recognition is off!!")
};

recognition.onerror = function(){
    instructions.text("Try Again")
}

recognition.onresult = function(event)
{
    var current = event.resultIndex;

    var transcript = event.results[current][0].transcript

    content += transcript
    textbox.val(content)
}


$("#start-btn").click(function(event){
    if(content.length) {
        content += ''
    }

    recognition.start()
})

$("#stop-btn").click(function(event){
    
    recognition.stop()
})

textbox.on('input', function (){
    content = $(this).val
})

for (let btn of buttons) {
	btn.addEventListener('click', () => {
		let cmd = btn.dataset['command'];
		if(cmd === 'createlink') {
			let url = prompt("Enter the link here: ", "http:\/\/");
			document.execCommand(cmd, false, url);
		} else {
			document.execCommand(cmd, false, null);
		}
	})
}