var colorsRing1 = ["black","saddlebrown","red","orange","yellow","green","blue","purple","gray","white"];
var farbenRing1 = ["Schwarz","Braun","Rot","Orange","Gelb","Grün","Blau","Violett","Grau","Weiß"];

var colorsRing2 = ["black","saddlebrown","red","orange","yellow","green","blue","purple","gray","white"];
var farbenRing2 = ["Schwarz","Braun","Rot","Orange","Gelb","Grün","Blau","Violett","Grau","Weiß"];

var colorsRing3 = ["black","saddlebrown","red","orange","yellow","green","blue","purple","darkgoldenrod","silver"];
var farbenRing3 = ["Schwarz","Braun","Rot","Orange","Gelb","Grün","Blau","Violett","Gold","Silber"];
var valuesRing3 = [1,10,100,1000,10000,100000,1000000,10000000,0.1,0.01];
var unitValuesRing3 = [ 1, 1000, 1000000];

var colorsRing4 = ["saddlebrown","red","green","blue","purple","gray","darkgoldenrod","silver"];
var farbenRing4 = ["Braun","Rot","Grün","Blau","Violett","Grau","Gold","Silber"];
var valuesRing4 = ["±1%","±2%","±0,5%","±0,25%","±0,10%","±0,05%","±5%","±10%"];

var colors = [colorsRing1,colorsRing2,colorsRing3,colorsRing4];
var germanColors = [farbenRing1,farbenRing2,farbenRing3,farbenRing4];

function printResistance()
{
  document.write("<br><div id='widerstand'>");
  document.write("<div id='widerstand_mitte'>");
  for(var i= 1; i<5;i++)
    document.write("<div id='widerstand_ring"+i+"' class='widerstand_ring'></div>");
  document.write("</div>");
  document.write("</div><br>");
}

function printResultField()
{
  document.write("<br><p id='result'>Ergebnis</p><br>");
}

function printOption(value,text)
{
  document.write("<option value='"+value+"'>"+text+"</option>")
}

function printSelection(selectorID,optionCount, value, germanValue)
{
  document.write(" <select id='"+selectorID+"'>");
  for(var i = 0; i < optionCount; i++)
    printOption(value[i],germanValue[i]);
  document.write("</select>")
}

function printValueToColor()
{
  document.write("<br><h2>Wert zwischen 0.01 und 990000000 eingeben</h2>");
  document.write("<div id='wertZuFarbe'>");
  document.write("<input id='value' type='text'>");
  printSelection("tolerance",8,valuesRing4,valuesRing4);
  document.write("<button onclick='valueToColor();'>Rechnen!</button>");
  document.write("</div><br>");
}

function printColorToValue() 
{
	document.write("<div id='ringselections'>");
	for (var i = 1;i<5;i++)
	{
		document.write("<label> Ring "+i);
		printSelection("auswahl_ring"+i,(colors[i-1]).length,colors[i-1],germanColors[i-1]);	
		document.write("</label>");
	} 
	document.write("<button onClick='colorToValue()'>Rechnen!</button>")
	document.write("</div>");
}

function colorToValue()
{
	var ring1,ring2,ring3,ring4;
	
	for (var i = 0;i<colorsRing1.length;i++)
		if (returnSelectorID(1).value == colorsRing1[i] ) ring1 = " "+i;
	for (var i = 0;i<colorsRing2.length;i++)
		if(returnSelectorID(2).value == colorsRing2[i] ) ring2 = i;
	for (var i = 0;i<colorsRing3.length;i++)
		if( returnSelectorID(3).value == colorsRing3[i] ) ring3 = i;
	for (var i = 0;i<colorsRing4.length;i++)
		if(returnSelectorID(4).value == colorsRing4[i] ) ring4 = i;

	var value = parseInt(ring1+ring2) * valuesRing3[ring3];
	
	document.getElementById("tolerance").value = valuesRing4[ring4];
	
	var result = value + " Ohm " + valuesRing4[ring4];
	document.getElementById("result").innerHTML = "Ergebnis = " + result;
	
	changeRings(parseInt(ring1),parseInt(ring2),ring3,ring4);
}

function valueToColor()
{
	var faktor=1;
	var value = parseFloat(document.getElementById("value").value);

	while (value < 1 && value!=0)
	{
		value *= 10;
		faktor = faktor/10;
	} 
		
	while (value > 99)
	{
		value= value / 10;
		faktor*=10;
	} 

	var ring1, ring2, ring3, ring4;
	ring4 = document.getElementById("tolerance");
		
	value >10 ? ring1 = parseInt(value/10) : ring1 = 0;
	ring2 = parseInt(value%10);

	for (var i = 0 ; i<valuesRing3.length ; i++)
		faktor == valuesRing3[i]? ring3 = i : 0;
	for (var i = 0; i<valuesRing4.length ; i++)
		ring4.value == valuesRing4[i] ? ring4 = i : 0;

	changeRings(ring1,ring2,ring3,ring4);
	value = value * faktor;
	document.getElementById("result").innerHTML= "Ergebnis = "+ value +" Ohm "+ valuesRing4[ring4]; 
}

function changeRings(ring1,ring2,ring3,ring4)
{
	returnRingID(1).style.backgroundColor = colorsRing1[ring1];
	returnRingID(2).style.backgroundColor = colorsRing2[ring2];
	returnRingID(3).style.backgroundColor = colorsRing3[ring3];
	returnRingID(4).style.backgroundColor = colorsRing4[ring4];
}

function returnRingID( ringNbr )
{ return document.getElementById("widerstand_ring"+ringNbr); }

function returnSelectorID( ringNbr )
{ return document.getElementById("auswahl_ring"+ringNbr); }
