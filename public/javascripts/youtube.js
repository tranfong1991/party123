var idTracker = 1;

function httpGet(url)
{
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", url, true);
	xmlHttp.send();
	return xmlHttp.responseText;
}

function getSongs(){
	$.get("http://localhost:3000/get_songs", function(data){

		var obj = $.parseJSON(JSON.stringify(data));
		var results = obj.results;

		for(var i = 0; i<results.length; i++){
			addSong(results[i].song_name);
		}
	});
}

function parseJSON()
{
	var url = "http://gdata.youtube.com/feeds/api/videos/?v="; //concatenate with artist and song name from text
	var jsonText = httpGet(url);
	var json = JSON.parse(jsonText);
	var videoUrl = 
	//get url
}



function addSong(name)
{
	//var t = document.querySelector('#SongTemplate');
	var template = document.getElementById('SongTemplate');
	//var template = document.createElement("template");
	//var div = document.createElement("div");
	var userInput = document.getElementById('userInput').value;
	//t.id=
	template.content.querySelector('#SongDiv').innerHTML = name;
	template.content.querySelector('.Container').id = idTracker;
	//template.content.querySelector('#SongDiv').id = idTracker;
	//t.content.querySelector('#SongDiv').innerHTML = userInput;
	//document.querySelector("#SongDiv").innerHTML = "Hello!";
	// var containerElements = document.querySelectorAll('.Container');
	
	// for (var i = 0; i < container Elements.length; i++)
		// containerElements[i].id = 'container-' + i;
	//var clone = document.importNode(t.content, true);
	//clone.id = "1";
	//document.body.appendChild(template.content.cloneNode(true));
	//document.body.appendChild(template);
	document.body.appendChild(template.content.cloneNode(true));
	//document.body.appendChild(clone);
	idTracker++;
	//parseJSON();
}

function removeSong()
{
	var elem = document.getElementById("1");
	elem.parentNode.removeChild(elem);
}