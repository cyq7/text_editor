const editor = document.getElementById('editor');
const upload = document.getElementById('upload');
const downloadBtn = document.getElementById("download-btn");
const savePopUp = document.getElementById("save-popup");
const cancelBtn = document.getElementById("cancel-btn");

const format = (command, value) => {
	document.execCommand(command, false, value);
}

const download = (filename, text) => {
	const encodedStr= "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(text));

	const downloadLink = document.createElement('a');
	downloadLink.style.display = 'none';

	downloadLink.setAttribute('href', encodedStr);

	downloadLink.setAttribute('download', filename + ".json");
	document.body.appendChild(downloadLink);

	downloadLink.click();

	document.body.removeChild(downloadLink);
}

savePopUp.addEventListener('submit', e => {
	e.preventDefault();

    const text = document.getElementById("editor").innerHTML;
    const filename = document.getElementById("file-name").value;

	const userInput = { inputText: text };

    download(filename, userInput);

	downloadBtn.classList.remove('open');
	e.stopPropagation();
}, false);

const readJSON = file => {
	if (file.type && !file.type.startsWith('application/json')) {
    alert('Nieodpowiedni format pliku');
  	} else {
		const reader = new FileReader();
  		reader.readAsText(file, "UTF-8");
  		reader.addEventListener('load', e => {
			const plainText = JSON.parse(e.target.result);
    		editor.innerHTML = plainText.inputText;
  		});
	}
}

upload.addEventListener('change', e => {
	const chosenFile = e.target.files[0];
	readJSON(chosenFile);
})

downloadBtn.addEventListener('click', e => {
	downloadBtn.classList.add('open');
	e.stopPropagation();
});

cancelBtn.addEventListener('click', e => {
	downloadBtn.classList.remove('open');
	e.stopPropagation();
})

document.addEventListener("click", e => {
	if(e.target.closest(".download-btn")) {
		downloadBtn.classList.remove('open');
		e.stopPropagation();
	}
})

document.addEventListener('click', e => {
	if (!e.target.closest('#download-btn')) {
		downloadBtn.classList.remove('open');
	};
})

editor.addEventListener('dragover', e => {
	e.stopPropagation();
	e.preventDefault();
	e.dataTransfer.dropEffect = 'copy';
});

editor.addEventListener('drop', e => {
	e.stopPropagation();
	e.preventDefault();
	const chosenFile = e.dataTransfer.files[0];
	readJSON(chosenFile);
})