let links = document.getElementsByClassName("link");

// console.log(links);

links = Array.prototype.slice.call( links );

links.forEach( function(link) {

  link.addEventListener("click", function() {

    console.log(this.textContent);

  });

});
