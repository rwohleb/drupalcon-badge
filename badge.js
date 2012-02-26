
function printBadge(el) {
  var dataUrl = document.getElementById(el).toDataURL('image/png'); //attempt to save base64 string to server using this var  
  var windowContent = '<!DOCTYPE html>';
  windowContent += '<html>'
  windowContent += '<head><title>Print canvas</title></head>';
  windowContent += '<body>'
  windowContent += '<img src="' + dataUrl + '">';
  windowContent += '</body>';
  windowContent += '</html>';
  var printWin = window.open('','','width=340,height=260');
  printWin.document.open();
  printWin.document.write(windowContent);
  printWin.document.close();
  printWin.focus();
  printWin.print();
  //printWin.close();
}

function printBadge2Dymo(el) {
  if (printer) {
     var labelXml = '\
     <DieCutLabel Version="8.0" Units="twips">\
       <PaperOrientation>Landscape</PaperOrientation>\
       <Id>NameBadge</Id>\
       <PaperName>30256 Shipping</PaperName>\
       <DrawCommands>\
         <Path>\
           <RoundRectangle X="0" Y="0" Width="3331" Height="5760" Rx="180" Ry="180"/>\
           <RoundRectangle X="2880" Y="2520" Width="180" Height="720" Rx="120" Ry="120"/>\
         </Path>\
       </DrawCommands>\
       <ObjectInfo>\
         <ImageObject>\
           <Name>Image</Name>\
           <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
           <BackColor Alpha="0" Red="255" Green="255" Blue="255" />\
           <LinkedObjectName></LinkedObjectName>\
           <Rotation>Rotation0</Rotation>\
           <IsMirrored>False</IsMirrored>\
           <IsVariable>False</IsVariable>\
           <ImageLocation/>\
           <ScaleMode>Fill</ScaleMode>\
           <BorderWidth>0</BorderWidth>\
           <BorderColor Alpha="255" Red="0" Green="0" Blue="0" />\
           <HorizontalAlignment>Left</HorizontalAlignment>\
           <VerticalAlignment>Top</VerticalAlignment>\
         </ImageObject>\
         <Bounds X="0" Y="0" Width="8400" Height="3500" />\
       </ObjectInfo>\
     </DieCutLabel>'
    var label = dymo.label.framework.openLabelXml(labelXml);
    
    //var dataUrl = canvas.toDataURL('image/png');
    var dataUrl = document.getElementById(el).toDataURL('image/png'); //attempt to save base64 string to server using this var
    var pngBase64 = dataUrl.substr('data:image/png;base64,'.length);

    label.setObjectText('Image', pngBase64);
    
    label.print(printerName);
    
    var pngData = label.render('\
      <LabelRenderParams>\
        <PngUseDisplayResolution>True</PngUseDisplayResolution>\
      </LabelRenderParams>\
    ');
    var labelImage = document.getElementById('labelPreview');
    labelImage.src = "data:image/png;base64," + pngData;
  }
}

function drawBadge(el, multiplier) {
  if (!multiplier) {
    multiplier = 1;
  }
  
  var canvas = document.getElementById(el);
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var center = canvas.width/2;
    
    //ctx.fillStyle = "rgba(255, 255, 255, 1)";
    //ctx.fillRect(0, 0, canvas.width, canvas.height);
    canvas.width = canvas.width;
    
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var nick = document.getElementById('nick').value;
    var title = document.getElementById('title').value;
    var company = document.getElementById('company').value;
    
    var qr = document.getElementById('qr').value;
    
    var sponsor = document.getElementById('sponsor').value;
    var volunteer = document.getElementById('volunteer').value;
    var speaker = document.getElementById('speaker').value;
    var staff = document.getElementById('staff').value;
    
    if (fname.length <= 0) {
      fname = 'First';
    }
    if (lname.length <= 0) {
      lname = 'Last';
    }
    
    /*
    if (nick.length <= 0) {
      nick = 'Nick';
    }
    if (title.length <= 0) {
      title = 'Title';
    }
    if (company.length <= 0) {
      company = 'Company';
    }
    */
    
    if (qr.length <= 0) {
      //qr = 'QR Code';
      qr = fname + " " + lname + ", " + nick + ", " + title + ", " + company;
    }
    
    /*
    var img3 = new Image();
    img3.onload = function() {
      ctx.drawImage(img3,0,0);
      ctx.font = "30pt 'Arial'";
      ctx.fillStyle = "#000000";
      ctx.fillText(msg, 10, 150);
    }
    img3.src = 'Calvin5.gif';
    */
    
    // draw center fold
    ctx.strokeStyle = "#EEEEEE";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(center, 0);
    ctx.lineTo(center, canvas.height);
    ctx.closePath();
    ctx.stroke();
    
    ctx.font = "bold " + (21 * multiplier) + "pt 'Arial Black'";
    ctx.fillStyle = "#222266";
    
    ctx.fillText(fname, 65 * multiplier, 32 * multiplier);
    ctx.fillText(fname, (55 * multiplier) + center, 32 * multiplier);
    
    ctx.font = "bold " + (14 * multiplier) + "pt 'Arial Black'";
    ctx.fillStyle = "#222266";
    
    ctx.fillText(lname, 65 * multiplier, 55 * multiplier);
    ctx.fillText(lname, (55 * multiplier) + center, 55 * multiplier);
    
    ctx.font = "bold " + (16 * multiplier) + "pt 'Arial Black'";
    ctx.fillStyle = "#3489AD";
    
    ctx.fillText(nick, 65 * multiplier, 105 * multiplier);
    ctx.fillText(nick, (55 * multiplier) + center, 105 * multiplier);
    
    if (nick) {
      drawDrop(el, "#74BED6", 44 * multiplier, 92 * multiplier, 8 * multiplier, 15 * multiplier);
      drawDrop(el, "#74BED6", (34 * multiplier) + center, 92 * multiplier, 8 * multiplier, 15 * multiplier);
    }
    
    ctx.font = (8 * multiplier) + "pt 'Arial Black'";
    ctx.fillStyle = "#000000";
    
    ctx.fillText(title, 65 * multiplier, 145 * multiplier);
    ctx.fillText(title, (55 * multiplier) + center, 145 * multiplier);
    
    ctx.fillText(company, 65 * multiplier, 160 * multiplier);
    ctx.fillText(company, (55 * multiplier) + center, 160 * multiplier);
    
    drawQR(el, qr, 50 * multiplier, 175 * multiplier, 3 * multiplier);
    drawQR(el, qr, 600 * multiplier, 175 * multiplier, 3 * multiplier);
    
    ctx.font = "bold " + (9 * multiplier) + "pt 'Arial'";
    ctx.fillStyle = "#3489AD";
    
    ctx.fillText("Drupal", 62 * multiplier, 302 * multiplier);
    ctx.fillText("Drupal", (52 * multiplier) + center, 302 * multiplier);
    
    ctx.font = (7 * multiplier) + "pt 'Arial'";
    ctx.fillStyle = "#000000";
    
    ctx.fillText("Association  *  Follow us @DrupalAssoc", 105 * multiplier, 302 * multiplier);
    ctx.fillText("Association  *  Follow us @DrupalAssoc", (95 * multiplier) + center, 302 * multiplier);
    
    if (sponsor == "silver") {
      //drawRibbon(el, "#DDDDDD", center - (200 * multiplier), 183 * multiplier, 400 * multiplier, 20 * multiplier);
      drawRibbon(el, "#DDDDDD", center - (190 * multiplier), 183 * multiplier, 380 * multiplier, 20 * multiplier);
      ctx.font = "bold " + (9 * multiplier) + "pt 'Arial Black'";
      ctx.fillStyle = "#000000";
      ctx.textBaseline = "middle";
      ctx.textAlign = "right";
      ctx.fillText('Silver Sponsor', center - (53 * multiplier), 194 * multiplier);
      ctx.textAlign = "left";
      ctx.fillText('Silver Sponsor', center + (53 * multiplier), 194 * multiplier);
    }
    else if (sponsor == "gold") {
      drawRibbon(el, "#B39C07", center - (190 * multiplier), 183 * multiplier, 380 * multiplier, 20 * multiplier);
      ctx.font = "bold " + (9 * multiplier) + "pt 'Arial Black'";
      ctx.fillStyle = "#FFFFFF";
      ctx.textBaseline = "middle";
      ctx.textAlign = "right";
      ctx.fillText('Gold Sponsor', center - (53 * multiplier), 194 * multiplier);
      ctx.textAlign = "left";
      ctx.fillText('Gold Sponsor', center + (53 * multiplier), 194 * multiplier);
    }
    
    if (speaker == "true") {
      drawRibbon(el, "#009900", center - (175 * multiplier), 206 * multiplier, 350 * multiplier, 20 * multiplier);
      ctx.font = "bold " + (9 * multiplier) + "pt 'Arial Black'";
      ctx.fillStyle = "#FFFFFF";
      ctx.textBaseline = "middle";
      ctx.textAlign = "right";
      ctx.fillText("Speaker", center - (53 * multiplier), 216 * multiplier);
      ctx.textAlign = "left";
      ctx.fillText("Speaker", center + (53 * multiplier), 216 * multiplier);
    }
    
    if (volunteer == "true") {
      drawRibbon(el, "#990000", center - (160 * multiplier), 229 * multiplier, 320 * multiplier, 20 * multiplier);
      ctx.font = "bold " + (9 * multiplier) + "pt 'Arial Black'";
      ctx.fillStyle = "#FFFFFF";
      ctx.textBaseline = "middle";
      ctx.textAlign = "right";
      ctx.fillText("Volunteer", center - (53 * multiplier), 240 * multiplier);
      ctx.textAlign = "left";
      ctx.fillText("Volunteer", center + (53 * multiplier), 240 * multiplier);
    }
    
    if (staff == "true") {
      drawRibbon(el, "#000077", center - (143 * multiplier), 252 * multiplier, 286 * multiplier, 20 * multiplier);
      ctx.font = "bold " + (9 * multiplier) + "pt 'Arial Black'";
      ctx.fillStyle = "#FFFFFF";
      ctx.textBaseline = "middle";
      ctx.textAlign = "right";
      ctx.fillText("Staff", center - (53 * multiplier), 263 * multiplier);
      ctx.textAlign = "left";
      ctx.fillText("Staff", center + (53 * multiplier), 263 * multiplier);
    }
  }
}

function drawRibbon(el, color, left, top, width, height) {
  var canvas = document.getElementById(el);
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    
    ctx.fillStyle = color;
    
    ctx.beginPath();
    ctx.moveTo(left, top);
    ctx.lineTo(left + width, top);
    ctx.lineTo(left + width - 10, top + height/2);
    ctx.lineTo(left + width, top + height);
    ctx.lineTo(left, top + height);
    ctx.lineTo(left + 10, top + height/2);
    ctx.fill();
  }
}

function drawDrop(el, color, left, top, width, height) {
  var canvas = document.getElementById(el);
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    
    ctx.fillStyle = color;
    
    ctx.beginPath();
    ctx.moveTo(left + (width/2), top);
    ctx.lineTo(left + (width/2) - (width/3), top + (height/3));
    ctx.bezierCurveTo(left - width, top + height,    left + (width * 2), top + height,    left + (width/2) + (width/3), top + (height/3));
    ctx.lineTo(left + (width/2), top);
    ctx.fill();
  }
}

function drawQR(el, text, left, top, dotsize) {
  var codeVersion = 4; // 1-40 see http://www.denso-wave.com/qrcode/qrgene2-e.html
  var errLevel = QRErrorCorrectLevel.L; // L, M, Q, or H
  var padding = 10; // white area around QRCode
  
  if (dotsize < 1) {
    dotsize = 1;
  }
  
  var canvas = document.getElementById(el);
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    
    try {
      // QR Code Error Correction Capability 
      // Higher levels improves error correction capability while decreasing the amount of data QR Code size.
      // QRErrorCorrectLevel.L (5%) QRErrorCorrectLevel.M (15%) QRErrorCorrectLevel.Q (25%) QRErrorCorrectLevel.H (30%)
      // eg. L can survive approx 5% damage...etc.
      var qr = new QRCode(codeVersion, errLevel); 
      qr.addData(text);
      qr.make();
    }
    catch(err) {
      var errorChild = document.createElement("p");
      var errorMSG = document.createTextNode("QR Code FAIL! " + err);
      errorChild.appendChild(errorMSG);
      return errorChild;
    }
    
    var qrsize = qr.getModuleCount();
    var shiftForPadding = padding/2;
    
    for (var r = 0; r < qrsize; r++) {
      for (var c = 0; c < qrsize; c++) {
        if (qr.isDark(r, c)) {
          ctx.fillStyle = "rgb(0,0,0)"; // black
        }
        else {
          ctx.fillStyle = "rgb(255,255,255)"; // white
        }
        ctx.fillRect ((c*dotsize) + shiftForPadding + left, (r*dotsize) + shiftForPadding + top, dotsize, dotsize);   // x, y, w, h
      }  
    }
  }
}

function clearBadge(el) {
  $('#input :input').val('');
  drawBadge(el);
}