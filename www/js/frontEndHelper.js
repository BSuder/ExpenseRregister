  var wydatek, nazwa, kategoria;
  
  var Cats =[{"category":"Undefined", "type":-1},{"category":"Testing", "type":1},{"category":"Test", "type":-1},{"category":"3 linia", "type":1}];
  var Wydatki = JSON.parse('');
  var History = JSON.parse('');
  
	function logout(){
	//	todo : akcja wylogowania z apluikacji
		alert("logout button clicked");
	}

	 function repleaceComma(input){
		var tmpStr = input.replace(',','.');
		return tmpStr;
	}

  
  function getNewEffort(){
	//	pobranie z frontu danych
	var tmp = document.getElementById("Amount").value;
	nazwa = document.getElementById("Title").value;
	kategoria = document.getElementById("Category").value;
	// zamiana przecinka na kropke
	tmp = repleaceComma(tmp);
	//	sprawdzenie czy wpisana zmienna do pola amount jest liczbą
	wydatek = parseFloat(tmp);
	if(isNaN(tmp)){
		alert("Error, value in Amount of effort must be a number");
	}
	else{
		return printData();
	}
	// to do wysłanie danych
	
  }
  

  function printData(){
	alert("wartosc wydatku: " + wydatek + ", nazwa: " + nazwa + ", kategoria: " + kategoria);
  }
  
  
  // to do zmiana sposobu odswiezania kategorii
	function generateDropDown(){
		// to do: funckcja pobierania z GS ilości kategorii

		//add new categroy
		for(var cat in Cats){
			if(document.getElementById(Cats[cat].category)){}
			else{
				$('<option id="' + Cats[cat].category + '" value="' + Cats[cat].category + '">' + Cats[cat].category + '</option>').appendTo('#Category');
			}
		}

		// delete one of category
		var tmp = Cats.toString();
		var htmlObj = document.getElementById('Category');
		
		for(var i=1; i<=htmlObj.length;  i++){
			if(tmp.indexOf(htmlObj[i].value) != -1){
			}else{
				i--;
				var elem = document.getElementById(htmlObj[i].value);
				elem.parentNode.removeChild(elem);
			}
		}
	}
  
    function generateBasicDropDown(){
		// to do: funckcja pobierania z GS ilości kategorii
		// - Czy potrzeba wysyłać datę?
		for (var catName in Cats) {
			$('<option id="'+ Cats[catName].category +'" value="'+ Cats[catName].category+'">' + Cats[catName].category + '</option>').appendTo('#Category');
		
		}
	}
  
  function getSummary(){
	  
	var jsonDataForBrands='[{"category":"dochod","value":"a@b"},{"category":"odchod","value":"b@c"},{"category":"gowno","value":"c@d"}]';
	var Categories=JSON.parse(jsonDataForBrands);

	var table = document.getElementById("testTable");

	var tableCnt = $('#testTable tr').length;

	// delete all inside rows
	for(var i=1; i<tableCnt; i++){
		table.deleteRow(1);			
	}

	// print new inside rows
	for (var catName in Categories) {
		// Create an empty <tr> element and add it to the 1st position of the table:
		var row = table.insertRow(1);
		// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		// Add some text to the new cells:
		cell1.innerHTML = Categories[catName].category;
		cell2.innerHTML = Categories[catName].value;
	}
	
	// set balance 
	table.deleteTFoot();
	// Create an empty <tfoot> element and add it to the table:
	var footer = table.createTFoot();

	// Create an empty <tr> element and add it to the first position of <tfoot>:
	var row = footer.insertRow(0);      

	// Insert a new cell (<td>) at the first position of the "new" <tr> element:
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var test= new Date().getTime().toString();
	// Add some bold text in the new cell:
	cell1.innerHTML = "<b>Balance</b>";
	cell2.innerHTML = "<b>" +test+  "</b>";	
  } 

  function printHistory(){
	  
	var jsonDataForBrands='[{"category":"dochod","value":"a@b"},{"category":"odchod","value":"b@c"},{"category":"gowno","value":"c@d"}]';
	var Categories=JSON.parse(jsonDataForBrands);

	var table = document.getElementById("historyTable");

	var tableCnt = $('#historyTable tr').length;

	// delete all inside rows
	for(var i=1; i<tableCnt; i++){
		table.deleteRow(1);			
	}

	// print new inside rows
	for (var catName in Categories) {
		// Create an empty <tr> element and add it to the 1st position of the table:
		var row = table.insertRow(1);
		// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		// Add some text to the new cells:
		cell1.innerHTML = Categories[catName].category;
		cell2.innerHTML = Categories[catName].value;
		cell3.innerHTML = Categories[catName].value;
		cell4.innerHTML = Categories[catName].value;
	}
	
  }
  
  function sendBalance(){
	  
	//	pobranie z frontu danych
	var tmp = document.getElementById("balance").value;
	// zamiana przecinka na kropke
	tmp = repleaceComma(tmp);
	//	sprawdzenie czy wpisana zmienna do pola amount jest liczbą
	wydatek = parseFloat(tmp);
	if(isNaN(tmp)){
		alert("Error, value in Amount of effort must be a number");
	}
	else{
		return printData();
	}
	// to do wysłanie danych
  
  }
  
  function manageCategories(){

	var table = document.getElementById("Categories");
	var tableCnt = $('#Categories tr').length;
	
	// delete all inside rows
	for(var i=1; i<tableCnt; i++){
		table.deleteRow(1);			
	}
	
	// print new inside rows
	for (var catName in Cats) {
		catName++;
		// Create an empty <tr> element and add it to the 1st position of the table:
		var row = table.insertRow(catName);
		// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		
		var tmp;
		if(Cats[catName].type == -1){
			tmp = "Effort";
		}
		else{
			tmp = "Income";
		};
		
		// Add some text to the new cells:
		cell1.innerHTML = Cats[catName].category;
		cell2.innerHTML = tmp;
		cell3.innerHTML = "<button onclick=deleteCategory("+catName+")><img src=\"img/del.png\" /></button>";
	}

	// add last row to add new category
	alert("wcisnieto przywcisk:");
	// dodanie ostatniej linijki
	var row = table.insertRow(1);
	// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	
	cell1.innerHTML = "aaaa";
	cell2.innerHTML = "test";
	cell3.innerHTML = "bbb";

  }
	
function deleteCategory(btn){
	alert("wcisnieto przywcisk: " + btn);
	delete Cats[btn];
	manageCategories();
}
  