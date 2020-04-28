var colors = ["black","saddlebrown","red","#ff6600","yellow","green","blue","purple","gray","white","darkgoldenrod","#c0c0c0", "transparent"];
var farben = ["Schwarz","Braun","Rot","Orange","Gelb","Grün","Blau","Violett","Grau","Weiß","Gold","Silber","Keine"];

var ringTypes = [
					[0,1,2,3,4,5,6,7,8,9,"-","-","-"],
					[1,10,100,1000,10000,100000,1000000,10000000,100000000,1000000000,0.1,0.01, "-"],
					["-","±1%","±2%","-","-","±0,5%","±0,25%","±0,10%","±0,05%","-","±5%","±10%","±20%"]
				];

function printColorTable()
{
	document.getElementsByClassName("colorTable")[0].innerHTML = buildColorTable();
}

function buildColorTable()
{
	var text = "<table id='colorTable'>"+buildColorTableHeader();

	for (var rowCount = 0; rowCount<colors.length;rowCount++)
	{
		text += buildColorRow(rowCount);
	}

	text += "</table>";

	return text;
}

function buildColorTableHeader()
{
	var text = "<tr> <th>Farbe</th>";

	for (var ringCount = 1; ringCount < (isRingModeEnabled() ? 6 : 5) ; ringCount++) 
	{
		text += "<th>Ring "+ringCount+"</th>";
	}
	text += "</tr>";
	return text;
}

function buildColorRow(row)
{
	var text = "";

	text += "<tr>"+ "<td>"+farben[row]+"</td>";

	for (var ringCount = 1; ringCount < (isRingModeEnabled() ? 6 : 5); ringCount++) 
	{ 
		text += "<td>"+		
		returnRingType(ringCount)[row]+
		"</td>";
	}

	text += "</tr>"
	return text;	
}

function printResistance()
{
	document.getElementsByClassName("resistance")[0].innerHTML = 
	"<div id='wire'></div>"+
	"<div id='vitro_body'>"+
	buildRings(isRingModeEnabled() ? 5 : 4);+
	"</div>";
}

function buildRings(rings)
{
	var text = "";
	for (var i = 1; i<= rings ;i++)
		text += "<div id='vitro_ring"+i+"' class='vitro_ring'></div>";

	return text;
}

function printColorSelections()
{
	document.getElementsByClassName("ringColors")[0].innerHTML = buildColorSelections(isRingModeEnabled() ? 5 : 4);
}

function buildColorSelections(ringCount)
{
	var text = "";
	for (var i = 1; i < (isRingModeEnabled() ? 6 : 5); i++)
	{
		text += "<table id='selector"+i+"'><tr><th> Ring "+i+" </th></tr>"+
		"<tr>"+
		buildColorFrames(i)+
		"</tr>"
		text += "</table>";
	}
	return text;
}

function buildColorFrames(ring)
{
	var text = "";
	var array = returnRingType(ring);

	for (var i = 0; i < array.length; i++) 
	{
		if (array[i] == "-")
			i++;
		if (array[i] != "-" && array[i] != null)
			text += "<td onClick=\"changeRingColor("+ring+","+i+")\" style='background-color:"+colors[i]+";' class='colorFrame'></td>";
	}
	return text;
}

function printInput()
{
	document.getElementsByClassName("input")[0].innerHTML = "<input id='input'></input> Ω "+buildToleranceSelector()+" <button onClick='calcResistance();'>Rechnen!</button>";
}

function buildToleranceSelector()
{
	var text = "<select id='tolerance'>";

	for (var i = 0; i < ringTypes[2].length; i++)
	{
		if (ringTypes[2][i] != "-")
			text += "<option value='"+i+"'>"+ringTypes[2][i]+"</option>";		
	}
	text += "</select>";

	return text;
}

function printOutput()
{
	document.getElementsByClassName("output")[0].innerHTML = "<div id='output'>Ergebnis</div>"
}

function clearInput()
{
	document.getElementsByClassName("input")[0].innerHTML = "";
}

function clearColorSelections()
{
	document.getElementsByClassName("ringColors")[0].innerHTML = "";
}

function clearOutput()
{
	document.getElementsByClassName("output")[0].innerHTML = "";
}