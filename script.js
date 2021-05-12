const editor = document.getElementById('editor');
const upload = document.getElementById('upload');
const downloadBtn = document.getElementById("download-btn");
const savePopUp = document.getElementById("save-popup");
const cancelBtn = document.getElementById("cancel-btn");

//___________EDIT_____________
const format = (command, value) => {
	document.execCommand(command, false, value);
}

//_________DOWNLOAD_________
const download = (filename, text) => {
	//defining the data of the file using encodeURIComponent
	const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(text));

	//creating hidden element
	const element = document.createElement('a');
	element.style.display = 'none';

	element.setAttribute('href', dataStr);

	//adding the download attribute of the the hidden link
	element.setAttribute('download', filename + ".json");
	document.body.appendChild(element);

	//link click simulation
	element.click();

	document.body.removeChild(element);
}

savePopUp.addEventListener('submit', e => {
	e.preventDefault();

    const text = document.getElementById("editor").innerHTML;
    const filename = document.getElementById("file-name").value;

    download(filename, text);

	downloadBtn.classList.remove('open');
	e.stopPropagation();
}, false);

//____________UPLOAD____________

function readJSON(file) {
  const reader = new FileReader();
  reader.readAsText(file, "UTF-8");
  reader.addEventListener('load', e => {
	const plainText = JSON.parse(e.target.result);
    editor.innerHTML = plainText;
  });
}

//EVENT LISTENERS
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



