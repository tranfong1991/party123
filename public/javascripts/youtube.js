var idTracker = 1;
var url = "https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:";
var queue = [];
var tracks = "";


function play(){
	tracks="";
	getSongs();
	var length = queue.length;
	for(var i = 0; i<length - 1; i++){
		var item = queue.shift();
		$.ajax({
			url: 'https://api.spotify.com/v1/search?type=track&q=' + encodeURIComponent(item), 
			success: function(data){
		    	var json = JSON.parse(JSON.stringify(data));
		    	var trackId = json.tracks.items[0].id;
		    	tracks = tracks + trackId + ",";
		    },
		    async: false
		});
	}
	$.ajax({
			url: 'https://api.spotify.com/v1/search?type=track&q=' + encodeURIComponent(queue.shift()), 
			success: function(data){
		    	var json = JSON.parse(JSON.stringify(data));
		    	var trackId = json.tracks.items[0].id;
		    	tracks = tracks + trackId ;
		    },
		    async: false
		});
	$('#spotify').attr('src',url + tracks);
}

function clearSong(){
	console.log("clear called client");
	$.ajax({
	    type: "DELETE",
	    url: "http://localhost:3000/",
	    success: function(msg){
	    	$('#spotify').attr('src',"");
	    }
	});
}

function getSongs(){
	$.ajax({
		url:"http://localhost:3000/get_songs",
		success: function(data){
			var obj = $.parseJSON(JSON.stringify(data));
			var results = obj.results;

			if(results){
				for(var i = 0; i<results.length; i++){
					queue.push(results[i].song_name);
				}
			}
		},
		async:false
	});
}
