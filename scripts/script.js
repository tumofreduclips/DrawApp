let generateCount = 1;
let canvasWidth = $(".sandwich").width();
let canvasHeight = $(".sandwich").height();
let undo = 0;
let undoCount = 0;
let code = "";
let draft = document.getElementById("draft");
let main = document.getElementById("main");
let undo_1 = document.getElementById("undo_1"); 
let undo_2 = document.getElementById("undo_2");
let undo_3 = document.getElementById("undo_3");
draft.setAttribute('width', canvasWidth);
draft.setAttribute('height', canvasHeight);
main.setAttribute('width', canvasWidth);
main.setAttribute('height', canvasHeight);
undo_1.setAttribute('width', canvasWidth);
undo_1.setAttribute('height', canvasHeight);
undo_2.setAttribute('width', canvasWidth);
undo_2.setAttribute('height', canvasHeight);
undo_3.setAttribute('width', canvasWidth);
undo_3.setAttribute('height', canvasHeight);
let ctx = draft.getContext("2d");
let mctx = main.getContext("2d");

var img = document.getElementById("outlineImage");

var imageWight = img.width;
var imageHeight = img.height;
console.log(imageWight + "old" + imageHeight)

  if (imageWight > canvasWidth && imageHeight > canvasHeight) {
    if(imageWight - canvasWidth > imageHeight - canvasHeight)
      {
        let difSize = imageWight / canvasWidth;
        imageWight = imageWight/difSize;
        imageHeight = imageHeight/difSize;
      }
      else if(imageHeight - canvasHeight > imageWight - canvasWidth)
      {
        let difSize = imageHeight / canvasHeight;
        imageWight = imageWight/difSize;
        imageHeight = imageHeight/difSize;
      }
  }
console.log(imageWight + "new" + imageHeight)

let outlineImage = new Image();
let src = "";

let imageXcoord = (canvasWidth - imageWight)/2;
let imageYcoord = (canvasHeight - imageHeight)/2;

let layoutCanvas;
let layoutctx;

let scale = 1;
let isZoom = false;
let zoomPoint = 0;
let xScroll = 0;
let yScroll = 0;
let isDown = false, prev;
let alpha = 1;
let curColor = "#8A4BFD";
let whiteColor = "#FFF";
let curSize = 15;
let brush = "brush";
let clickedLayoutId = "none";
var name = "";
let oldX = 0
let oldY = 0
let w = main.width;
let h = main.height;
ctx.lineCap = "round";
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
mctx.webkitImageSmoothingEnabled = false;
mctx.mozImageSmoothingEnabled = false;
mctx.imageSmoothingEnabled = false;

if (window.innerHeight > window.innerWidth) {
    $(".hiddenAlertsTexts").css("display","block");
    $( ".hiddenAlertsTexts" ).html( "Please use Landscape!" );
}
else {
    draft.onmousedown = function (e) {
        isDown = true;
        prev = getXY(e);
        $("#back").attr("src"," img/undo-arrow-in-a-black-circle.svg");
    };

    draft.onmousemove = function (e) {
                draft.style.opacity = alpha;                        // CSS alpha for draft
                mctx.globalAlpha = alpha;                           // context alpha for main
                if (!isDown) return;
                let point = getXY(e);
                prY = point.x;
                prY = point.y;
                if (brush == "brush") {
                    alpha = $('#brushOpacity').val();
                    if (isZoom) {
                        draw(prev.x/scale+(xScroll/scale), prev.y/scale+(yScroll/scale), point.x/scale+(xScroll/scale), point.y/scale+(yScroll/scale), curColor)
                    }
                    else
                    {
                        draw(prev.x, prev.y, point.x, point.y,curColor)
                    }
                }
                else if (brush == "stars") {
                    alpha = $('#brushOpacity').val();
                    if (isZoom) {
                        stars(prev.x/scale+(xScroll/scale), prev.y/scale+(yScroll/scale), point.x/scale+(xScroll/scale), point.y/scale+(yScroll/scale), curColor,curSize)
                    }
                    else
                    {
                        stars(prev.x, prev.y, point.x, point.y,curColor,curSize)
                    }
                }     
                else if (brush == "strokeStrange") {
                    alpha = $('#brushOpacity').val();
                    if (isZoom) {
                        strokeStrange(prev.x/scale+(xScroll/scale), prev.y/scale+(yScroll/scale), point.x/scale+(xScroll/scale), point.y/scale+(yScroll/scale), curColor,curSize)
                    }
                    else
                    {
                        strokeStrange(prev.x, prev.y, point.x, point.y,curColor,curSize)
                    }
                }           
                else if (brush == "eraser") {
                    alpha = 1;
                    if (isZoom) {
                        draw(prev.x/scale+(xScroll/scale), prev.y/scale+(yScroll/scale), point.x/scale+(xScroll/scale), point.y/scale+(yScroll/scale), whiteColor)
                    }
                    else
                    {
                        draw(prev.x, prev.y, point.x, point.y,whiteColor)
                    }
                }   
                prev = point;                                        // update prev. point
        oldX = e.pageX;
        oldY = e.pageY;
        ctx.drawImage(outlineImage, imageXcoord, imageYcoord, imageWight, imageHeight);     
    };

    draft.onmouseup = function () {
        undoCount = 0
        isDown = false;
        mctx.globalAlpha = 1;
        mctx.globalAlpha = alpha;
        mctx.drawImage(draft, 0, 0, w, h);
        ctx.clearRect(0, 0, main.width, main.height);   // clear draft

        undo++
        if (undo == 4) {
            undo = 1
        }
        var name = "undo_" + undo;
        var undoCanvas = document.getElementById(name);
        var undoCtx = undoCanvas.getContext("2d");
        undoCtx.clearRect(0, 0, w, h)
        undoCtx.drawImage(main, 0, 0, w, h);
    };
}