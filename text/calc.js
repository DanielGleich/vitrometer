
function calcResistance()
{
	if ( !isRingModeEnabled() )  // 4 Ringe
	{
		if ( !isCalcModeEnabled() ) // 4 Ringe: Farbe zu Wert
		{
			if (returnRingID(1).value != null && returnRingID(2).value != null && returnRingID(3).value != null && returnRingID(4).value != null )
			{
				var ring1 = parseInt(returnRingID(1).value);
				var ring2 = parseInt(returnRingID(2).value);

				var ring3Id = parseInt(returnRingID(3).value);
				ring3 = ringTypes[1][ring3Id];

				var ring4Id = parseInt(returnRingID(4).value);
				ring4 = ringTypes[2][ring4Id];

				var value = (ring1*10+ring2)*ring3+"Ω "+ring4; // Umrechnung mit Faktor

				document.getElementById("output").innerHTML = "Ergebnis = " + value;
			}
		}

		else // 4 Ringe: Farbe Wert zu Farbe
		{
			clearOutput();

			var multiplier=1;
			var tempvalue = parseFloat(document.getElementById("input").value); // TODO: "," zu "." replacen 

			if (tempvalue < 0.01 || tempvalue > 990000000)
			document.getElementsByClassName("output")[0].innerHTML = "So einen Widerstand gibt es nicht!"
			else 
			{
				multiplier = minimizeValues(tempvalue)[1];
				var value= minimizeValues(tempvalue)[0];


				var rings = new Array();

				rings[4] = parseInt(document.getElementById("tolerance").value);
				
				value >10 ? rings[1] = parseInt(value/10) : rings[1] = 0;
				rings[2] = parseInt(value%10);

				for (var i = 0 ; i<ringTypes[1].length ; i++)
					multiplier == ringTypes[1][i]? rings[3] = i : null;

				for (var i = 0; i<ringTypes[2].length ; i++)
					rings[4] == ringTypes[2][i] ? ring[4] = i : null;
					
				for (var i = 1; i < rings.length; i++) 
				{
					returnRingID(i).style.backgroundColor = colors[rings[i]];
					returnRingID(i).value = rings[i];
				}
			}
		}
	}	

	else if ( isRingModeEnabled() ) // 5 Ringe
	{
		if ( !isCalcModeEnabled() ) // 5 Ringe: Farbe zu Wert
		{
			if (returnRingID(1).value != null && returnRingID(2).value != null && returnRingID(3).value != null && returnRingID(4).value != null && returnRingID(5).value != null )
			{
				var ring1 = parseInt(returnRingID(1).value);
				var ring2 = parseInt(returnRingID(2).value);
				var ring3 = parseInt(returnRingID(3).value);
				var ring4 = ringTypes[1][parseInt(returnRingID(4).value)];
				var ring5 = ringTypes[2][parseInt(returnRingID(5).value)];

				var value = (ring1*100+ring2*10+ring3) * ring4+"Ω "+ring5;
				document.getElementById("output").innerHTML = "Ergebnis = " + value;
			}
		}

		else // 5 Ringe: Farbe zu Wert 
		{
			clearOutput();

			var multiplier=1;
			var tempvalue = parseFloat(document.getElementById("input").value); // TODO: "," zu "." replacen 

			if (tempvalue < 0.01 || tempvalue > 999000000000)
			document.getElementsByClassName("output")[0].innerHTML = "So einen Widerstand gibt es nicht!"
			else 
			{
				var rings = new Array();
				multiplier = minimizeValues(tempvalue)[1];
				var value= minimizeValues(tempvalue)[0];

				rings[5] = parseInt(document.getElementById("tolerance").value);
				
				rings[1] = value >100 ? parseInt(value/100) : rings[1] = 0;
				if (value > 100)
					value %= 100;
				rings[2] = value >10 ? parseInt(value/10) : rings[2] = 0;
				rings[3] = parseInt(value%10);

				for (var i = 0 ; i<ringTypes[1].length ; i++)
					multiplier == ringTypes[1][i]? rings[4] = i : null;

				for (var i = 0; i<ringTypes[2].length ; i++)
					rings[4] == ringTypes[2][i] ? ring[5] = i : null;
					
				for (var i = 1; i < rings.length; i++) 
				{
					returnRingID(i).style.backgroundColor = colors[rings[i]];
					returnRingID(i).value = rings[i];
				}
				console.log(rings);
			}
		}
	}
}

function changeRingColor(ring,colorID)
{
	document.getElementById("vitro_ring"+ring).style.backgroundColor = colors[colorID];
	document.getElementById("vitro_ring"+ring).value = colorID;
	calcResistance();
}

function minimizeValues(value)
{
	var values = [value,1];

	if (values[0]%1) //Wenn Value eine Kommazahl ist, hochrechnen
	{
		do
		{
			values[0] *= 10;
			values[1] = values[1]/10;
		} while (values[0]%1);
	}
				
	if (!(values[0]%10)) // Wenn Value dreistellig ist
	{
		do
		{
			values[0]= values[0] / 10;
			values[1]*=10;
		} while (!(values[0]%10));
	}
	return values;
}