$(function(){
	home = document.querySelector("#home");
	home.querySelector("a").addEventListener('click', function(e, a){
		home.classList.add("hide-in-motion");
	});
});