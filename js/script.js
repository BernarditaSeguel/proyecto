

 const menu = document.querySelector(".menu");
 const menuMain = menu.querySelector(".menu-main");
 const goBack = menu.querySelector(".go-back");
 const menuTrigger = document.querySelector(".mobile-menu-trigger");
 const closeMenu = menu.querySelector(".mobile-menu-close");
 let subMenu;
 menuMain.addEventListener("click", (e) =>{
 	if(!menu.classList.contains("active")){
 		return;
 	}
   if(e.target.closest(".menu-item-has-children")){
   	 const hasChildren = e.target.closest(".menu-item-has-children");
      showSubMenu(hasChildren);
   }
 });
 goBack.addEventListener("click",() =>{
 	 hideSubMenu();
 })
 menuTrigger.addEventListener("click",() =>{
 	 toggleMenu();
 })
 closeMenu.addEventListener("click",() =>{
 	 toggleMenu();
 })
 document.querySelector(".menu-overlay").addEventListener("click",() =>{
 	toggleMenu();
 })
 function toggleMenu(){
 	menu.classList.toggle("active");
 	document.querySelector(".menu-overlay").classList.toggle("active");
 }
 function showSubMenu(hasChildren){
    subMenu = hasChildren.querySelector(".sub-menu");
    subMenu.classList.add("active");
    subMenu.style.animation = "slideLeft 0.5s ease forwards";
    const menuTitle = hasChildren.querySelector("i").parentNode.childNodes[0].textContent;
    menu.querySelector(".current-menu-title").innerHTML=menuTitle;
    menu.querySelector(".mobile-menu-head").classList.add("active");
 }

 function  hideSubMenu(){  
    subMenu.style.animation = "slideRight 0.5s ease forwards";
    setTimeout(() =>{
       subMenu.classList.remove("active");	
    },300); 
    menu.querySelector(".current-menu-title").innerHTML="";
    menu.querySelector(".mobile-menu-head").classList.remove("active");
 }
 
 window.onresize = function(){
 	if(this.innerWidth >991){
 		if(menu.classList.contains("active")){
 			toggleMenu();
 		}
 	}

	 if(this.innerWidth >728){
		if(menu.classList.contains("active")){
			toggleMenu();
		}
	}

	if(this.innerWidth >425){
		if(menu.classList.contains("active")){
			toggleMenu();
		}
	}

	 if(this.innerWidth >375){
		if(menu.classList.contains("active")){
			toggleMenu();
		}
	}

	if(this.innerWidth >320){
		if(menu.classList.contains("active")){
			toggleMenu();
		}
	}

	if(this.innerWidth >227){
		if(menu.classList.contains("active")){
			toggleMenu();
		}
	}
 }


 


 
 const slides=document.querySelector(".slider").children;
 const prev=document.querySelector(".prev");
 const next=document.querySelector(".next");
 const indicator=document.querySelector(".indicator");
 let index=0;


   prev.addEventListener("click",function(){
       prevSlide();
       updateCircleIndicator(); 
       resetTimer();
   })

   next.addEventListener("click",function(){
      nextSlide(); 
      updateCircleIndicator();
      resetTimer();
      
   })


    function circleIndicator(){
        for(let i=0; i< slides.length; i++){
        	const div=document.createElement("div");
                div.setAttribute("onclick","indicateSlide(this)")
                div.id=i;
                if(i==0){
                	div.className="active";
                }
               indicator.appendChild(div);
        }
    }
    circleIndicator();

    function indicateSlide(element){
         index=element.id;
         changeSlide();
         updateCircleIndicator();
         resetTimer();
    }
     
    function updateCircleIndicator(){
    	for(let i=0; i<indicator.children.length; i++){
    		indicator.children[i].classList.remove("active");
    	}
    	indicator.children[index].classList.add("active");
    }

   function prevSlide(){
   	 if(index==0){
   	 	index=slides.length-1;
   	 }
   	 else{
   	 	index--;
   	 }
   	 changeSlide();
   }

   function nextSlide(){
      if(index==slides.length-1){
      	index=0;
      }
      else{
      	index++;
      }
      changeSlide();
   }

   function changeSlide(){
   	       for(let i=0; i<slides.length; i++){
   	       	 slides[i].classList.remove("active");
   	       }

       slides[index].classList.add("active");
   }

   function resetTimer(){
   	  clearInterval(timer);
   	  timer=setInterval(autoPlay,4000);
   }
 
  
  function autoPlay(){
      nextSlide();
      updateCircleIndicator();
  }

  let timer=setInterval(autoPlay,4000);



  	if ('WebSocket' in window) {
		(function () {
			function refreshCSS() {
				var sheets = [].slice.call(document.getElementsByTagName("link"));
				var head = document.getElementsByTagName("head")[0];
				for (var i = 0; i < sheets.length; ++i) {
					var elem = sheets[i];
					var parent = elem.parentElement || head;
					parent.removeChild(elem);
					var rel = elem.rel;
					if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
						var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
						elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
					}

					parent.appendChild(elem);
				}
			}
			var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
			var address = protocol + window.location.host + window.location.pathname + '/ws';
			var socket = new WebSocket(address);
			socket.onmessage = function (msg) {
				if (msg.data == 'reload') window.location.reload();
				else if (msg.data == 'refreshcss') refreshCSS();
			};
			if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
				console.log('Live reload enabled.');
				sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
			}
		})();
	}
