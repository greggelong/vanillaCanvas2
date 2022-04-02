// event listener load fires after all assets on our web page have been fully loaded

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1'); // set canvas
    const ctx = canvas.getContext('2d'); // built in 2d api for drawing
    // you can console log ctx to see the api functions
    //console.log(ctx);
    
    let spread;
   
    //set width and height
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // button control
    const mybutton = this.document.getElementById('mybutton');
    mybutton.addEventListener('click', randomit)
    
    // with lines
    ctx.strokeStyle='yellow';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round'; // nice p5 doest have this!!
    ctx.shadowColor = 'rgba(0,0,0,0.7)';
    ctx.shadowOffsetX=10;
    ctx.shadowOffsetY =5;
    ctx.shadowBlur =10;
    let size, maxLevel, branches, scl;

    
    size = 200;
    maxLevel =5;
        //spread = 0.32;
        //console.log("boo"+spread)
    branches = 2;
    scl = 0.8; //scale
    spread = (33 * Math.PI/180)
    clearAndCall();
    

    function randomit(){
      // number of branches
      branches = Math.floor((Math.random()*3)+1)
      let ang =Math.floor((Math.random()* (90-11)+10))
      spread = ang * Math.PI/180
      scl = Math.random() * (0.8-0.3) +0.3; 
      //Math.floor(Math.random() * (max - min + 1) + min) random between two numbers
      maxLevel = Math.floor(Math.random()*(4))+2
      console.log(scl);
      // color
      let r = Math.floor(Math.random()*255);
        let g = Math.floor(Math.random()*255);
        let b = Math.floor(Math.random()*255);
        //console.log(r,g,b)
        ctx.strokeStyle = `rgb(${r},${g},${b})`; // variables inside back ticks
        // add clear and call when not using the mouse
        clearAndCall();


    }
/*
    canvas.addEventListener('mousemove', e => {
        //console.log(e.offsetX)
        spread = (e.offsetX)*0.001;
        //console.log(spread)
        // need to call the function
        
        clearAndCall();

    
    })
*/
    function clearAndCall(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        
        ctx.save(); 
        ctx.translate(canvas.width/2,canvas.height-30);
        ctx.scale(1,1);
        ctx.rotate(-90 * Math.PI/180);

        drawBranch(0);
        ctx.restore();




    }


    

    function drawBranch(level){
        
        // exit condition
        if (level > maxLevel) return;  // spits it out of the function

        // just draw the line
        ctx.beginPath();
        ctx.moveTo(0,0); // start at the translated center
        ctx.lineTo(size,0); // move along only the x
        ctx.stroke();

        // for the right side
        for (let i =0; i< branches;i++){
            ctx.save();
            ctx.translate(size-(size/branches)*i,0);
            ctx.rotate(spread);
            ctx.scale(scl,scl);

            // recursive call
            drawBranch(level+1);
            ctx.restore();
     

         // for the left side
       
            ctx.save();
            ctx.translate(size-(size/branches)*i,0);
            ctx.rotate(-spread);
            ctx.scale(scl,scl);
    
            // recursive call
            drawBranch(level+1);
            ctx.restore();
        }
    }



    
/*    
    for(let i = 0; i< sides; i++){
         
 
        // rotate after drawing the first one
        let theta =(Math.PI * 2)/sides;  // size in radians pi * 2 is a full circle
        ctx.rotate(theta); 
       

    }

    */
    ctx.restore();
 

});  // the whole program is in the anonymous function of the call back