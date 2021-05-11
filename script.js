const format = (command, value) => {
	document.execCommand(command, false, value);
}

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

document.getElementById("download-btn").addEventListener("click", () => {

    const text = document.getElementById("editor").innerText;
    const filename = document.getElementById("file-name").value;

    download(filename, text);
}, false);