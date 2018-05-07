
var Cats =[{"category":"Undefined", "type":-1},{"category":"Testing", "type":1},{"category":"Test", "type":-1},{"category":"3 linia", "type":1}];
var Wydatki = JSON.parse('');
var History = JSON.parse('');
var json = {
	"chart": {
		"type": "pie",
		"data": []
	}
};
var chart;// = anychart.fromJson(json);;
 
	function logout(){
	//	todo : akcja wylogowania z apluikacji
		alert("logout button clicked");
	}

	function repleaceComma(input){
		var tmpStr = input.replace(',','.');
		return tmpStr;
	}
	
	function toNumber(inStr){
		inStr = repleaceComma(inStr);
		inStr = parseFloat(inStr);
		if(isNaN(inStr)){
			alert("Error, value in Amount of effort must be a number");
			return false;
		}
		else{
			return inStr;
		}
		
	}
  
	function getNewEffort(){
		//	pobranie z frontu danych
		var tmp = document.getElementById("Amount").value;
		var nazwa = document.getElementById("Title").value;
		var kategoria = document.getElementById("Category").value;
		// zamiana przecinka na kropke
		tmp = toNumber(tmp);
		if(tmp != false) sendData(tmp, nazwa, kategoria);
		// to do wysłanie danych
		
	}
  
	function sendData(wydatek, nazwa, kategoria){
		alert("wartosc wydatku: " + wydatek + ", nazwa: " + nazwa + ", kategoria: " + kategoria);
	}
  
	function generateDropDown(){
		// to do: funckcja pobierania z GS ilości kategorii
		
		// delete current categories
		$("#Category").children().remove();
		// add retrieved categories
		for(var cat in Cats){
				$('<option id="' + Cats[cat].category + '" value="' + Cats[cat].category + '">' + Cats[cat].category + '</option>').appendTo('#Category');

		}
	}
  
    function generateBasicDropDown(){
		// to do: funckcja pobierania z GS ilości kategorii
		// - Czy potrzeba wysyłać datę?
		for (var catName in Cats) {
			$('<option id="'+ Cats[catName].category +'" value="'+ Cats[catName].category+'">' + Cats[catName].category + '</option>').appendTo('#Category');
		
		}
		
		generateBasicPie();
	}
  
  function getSummary(){
	  
	var jsonDataForBrands='[{"category":"dochod","value":"a@b"},{"category":"odchod","value":"b@c"},{"category":"gowno","value":"c@d"}]';
	var Categories=JSON.parse(jsonDataForBrands);

	printPie();
	
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
	var test = new Date().getTime().toString();
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
		if(isNaN(wydatek)){
			alert("Error, value in Amount of effort must be a number");
		}
		else{
			alert("nowy balans: " + wydatek );
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
		
		// dodanie ostatniej linijki
		var helperChioce ="<select id=\"newCategoryType\"><option value=\"Income\">Income</option><option value=\"Effort\">Effort</option></select>";
		var helperButton = "<button onclick=SaveNewCategory()><img src=\"img/save.png\" /></button>";
		
		var row = table.insertRow(1);
		// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		
		cell1.innerHTML = "<input id=\"newCategoryName\"></input>";
		cell2.innerHTML = helperChioce;
		cell3.innerHTML = helperButton;
		
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

	}
	
	function deleteCategory(btn){
		// usuniecie kategorii 
		Cats.splice(Cats[btn] - 1, 1);
		// przeładowanie obecnych kategroii
		manageCategories();
	}

	function SaveNewCategory(){
		var CategotyName = document.getElementById("newCategoryName").value;
		var CategoryType = document.getElementById("newCategoryType").value;
		
		if(CategoryType == "Income"){CategoryType = 1;}
		else{CategoryType = -1;}
		
		var helperJSON = {"category":CategotyName, "type":CategoryType};
		Cats.push(helperJSON);
		manageCategories();
	}
	
	function SaveNewAlarmLevel(){
		var AlarmLevel = document.getElementById("EffortsAlarn").value;
		
		AlarmLevel =toNumber(AlarmLevel);
		if(AlarmLevel!=false) alert("nowy poziom alarmu: " + AlarmLevel );
	}

	function generateBasicPie() {

		json = {
			"chart": {
				"type": "pie",
				"data": ["no data", 1]
			}
		};

		// create the chart
		chart =  anychart.fromJson(json);

		// display the chart in the container
		chart.container('PieGraph');
		// set legend position
		chart.legend().position("right");
		// set items layout
		chart.legend().itemsLayout("vertical");
		
		chart.draw();

	}
	
	function printPie() {

		deletePie();
	
		var tmp = [];
		for(iter in Cats){
			tmp.push([Cats[iter].category, Cats[iter].type]);
		}

		json = {
			"chart": {
				"type": "pie",
				"data": tmp
			}
		};

		// create the chart
		chart =  anychart.fromJson(json);

		// display the chart in the container
		chart.container('PieGraph');
		// set legend position
		chart.legend().position("right");
		// set items layout
		chart.legend().itemsLayout("vertical");
		
		chart.draw();

	}
	
	function deletePie() {
		$("#PieGraph").children().remove();
	}