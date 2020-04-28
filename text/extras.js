function switchCalcMode()
{
	document.getElementsByClassName("sliderbar")[0].classList.toggle("active");

	if ( isCalcModeEnabled() )
	{
		clearColorSelections();
		printInput();
		clearOutput();
	}
	else
	{
		printColorSelections();
		printOutput();
		clearInput();
	}
}

function switchRingMode()
{
	document.getElementsByClassName("sliderbar")[1].classList.toggle("active");

	if ( isCalcModeEnabled() )
	{
		printInput();
		printColorTable();
		printResistance();
		clearColorSelections();
		clearOutput();
	}
	else
	{
		printColorSelections();
		printColorTable();
		printResistance()
		printOutput();
		clearInput();
	}
}

function isCalcModeEnabled()
{
	if (document.getElementsByClassName("sliderbar")[0].classList.item(1) != "active")
		return false;
	else return true;
}

function isRingModeEnabled()
{
	if (document.getElementsByClassName("sliderbar")[1].classList.item(1) != "active")
		return false;
	else return true;
}

function returnRingType(ringCount)
{
	if (ringCount < 1 || ringCount > 5)
		return null;

	switch (ringCount)
	{
		case 1:
		case 2: return ringTypes[0]; break;
		case 3: return ringTypes[ ( isRingModeEnabled() ? 0 : 1 ) ];break;
		case 4: return ringTypes[ ( isRingModeEnabled() ? 1 : 2 ) ];break;
		case 5: return ringTypes[2];break
	}
}

function returnRingID(ring)
{
	return document.getElementById("vitro_ring"+ring);
}
