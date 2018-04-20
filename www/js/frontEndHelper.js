  var wydatek, nazwa, kategoria;
  
	function logout(){
	//	todo : akcja wylogowania z apluikacji
		alert("logout button clicked");
	}

	 function repleaceComma(input){
		var tmpStr = input.replace(',','.');
		return tmpStr;
	}

  
  function getData (){
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
  
	function generateDropDown(){
		// to do: funckcja pobierania z GS ilości kategorii
		// - Czy potrzeba wysyłać datę?
		var incomeCats='[{"category":"QA","email":"a@b"},{"category":"PROD","email":"b@c"},{"category":"nie ma sil","email":"c@d"},{"category":"MAAAM","email":"c@d"}]';
		var NewCategories=JSON.parse(incomeCats);
		
		//add new categroy
		for(var cat in NewCategories){
			if(document.getElementById(NewCategories[cat].category)){
			}else{
				$('<option id="' + NewCategories[cat].category + '" value="' + NewCategories[cat].category + '">' + NewCategories[cat].category + '</option>').appendTo('#Category');
			}
		}

		// delete one of category
		var htmlObj = document.getElementById('Category');
		
		for(var i=1; i<=htmlObj.length;  i++){
			if(incomeCats.indexOf(htmlObj[i].value) != -1){
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
		var jsonDataForBrands='[{"category":"QA","email":"a@b"},{"category":"PROD","email":"b@c"},{"category":"DEV","email":"c@d"}]';
		var Categories=JSON.parse(jsonDataForBrands);

		for (var catName in Categories) {
			$('<option id="'+ Categories[catName].category +'" value="'+ Categories[catName].category+'">' + Categories[catName].category + '</option>').appendTo('#Category');
		
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
