
var CLIENT_ID = '25809299563-3mrkg8k5gct981flgn20dvbkld1hr8gs.apps.googleusercontent.com'; // Client ID and API key from the Developer Console
var API_KEY = 'AIzaSyBPlE2t8eZ-xVBgYO3mjVzJUwiYdNUMjyU';
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"]; // Array of API discovery doc URLs for APIs used by the quickstart
var SCOPES = "https://www.googleapis.com/auth/spreadsheets"; // Authorization scopes required by the API; multiple scopes can be included, separated by spaces.


var SpreadsheetId  = '1Lk2Ni4po21fw1tbQp_4jL1kWcwapBil2OF3N2gMZmxs';
var TemplateSheetId = '1sme9DQeCuH1fuZCV_gU2I4dziQ_Kt4tS_rHe2kCTbZc'

var DateColumn     = "A";
var ValueColumn    = "B";
var NameColumn     = "C";
var CategoryColumn = "D";
var MaxRecordIndex = 500;

var OutcomeCategoriesPosition = "I2:I21";
var IncomeCategoriesPosition  = "L2:L21";

var OutcomeCategoryColumn = "I";
var IncomeCategoryColumn = "L";

var IncomeCategoryList = {};
var OutcomeCategoryList = {};

var MaxCategoryIndex = 21;

var SummaryPosition = "G2:G10";

var ExpenseListPosition = "A2:D500";
var ExpenseList = {};

var TemplateSheetName = "newTemplate";

var SheetList = {};
var CurrentSheetName = "";

var StartPosition   = 0;
var EndPosition     = 1;
var IncomePosition  = 3;
var OutcomePosition = 4;
var LimitPosition   = 6;
var BalancePosition = 8;


/************************************** ON LOAD *********************************************/
function OnWebpageLoad()
{
	UpdateCategoryLists();
	UpdateSheetList();
	UpdateCurrentExpenseList();
}

/************************************ ADD EXPENSE *******************************************/
function testFoo()
{
	AddExpense(1234, "blah", "meh");
}


function AddExpense(value, name, category)
{	
	var categoryFound = 0;
	var recordIndex
				
	for(i = 0; i < IncomeCategoryList.length; i++)
	{
		if(IncomeCategoryList[i] == category)
		{
			categoryFound = 1;
			break;
		}
	}
	
	for(i = 0; i < OutcomeCategoryList.length; i++)
	{
		if(OutcomeCategoryList[i] == category)
		{
			categoryFound = 1;
			break;
		}
	}
	
	if(categoryFound == 0)
	{
		alert("Category '" + category + "' not found!");
		return;
	}
	
	// Search first free record
	gapi.client.sheets.spreadsheets.values.get( {spreadsheetId:SpreadsheetId, range:("B1:B" + MaxRecordIndex)} ).then
	(
		function(response)
		{
		    recordIndex = (response.result.values ? response.result.values.length : 0) + 1;
		  
		    console.log("First free record found at: " + recordIndex);
		    SendExpense(value, name, category, recordIndex)
		},
		
		function(reason)
		{
			console.error('Error: ' + reason.result.error.message);
		}
	);
}

function SendExpense(value, name, category, recordIndex)
{
	var coordinates = DateColumn + recordIndex + ":" + CategoryColumn + recordIndex;
	var body = {"range":coordinates, "majorDimension":"ROWS", "values":[[GetFormattedDate(), value, name, category]]};
	
	console.log(GetFormattedDate());
	
	gapi.client.sheets.spreadsheets.values.update( {spreadsheetId:SpreadsheetId, range:coordinates, valueInputOption:'USER_ENTERED'}, body).then
	(
		function(response)
		{
			console.log(response.result);
			CheckLimit();
		}, 
		  
		function(reason)
		{
			console.error('Error: ' + reason.result.error.message);
		}
	);
}

function CheckLimit()
{
	var outcome;
	var limit;
	
	gapi.client.sheets.spreadsheets.values.get( {spreadsheetId:SpreadsheetId, range:SummaryPosition} ).then
	(
		function(response)
		{
			limit = response.result.values[LimitPosition];
			outcome = response.result.values[OutcomePosition];
			
			if((limit == 0) || (limit == null))
			{
				return;
			}
			
			if(outcome > limit)
			{
				alert("WARNING! Expense limit reached!");
			}
		}, 
		  
		function(reason)
		{
			console.error('Error: ' + reason.result.error.message);
		}
	);
}

/************************************ SHEET MANAGEMENT *******************************************/

function AddNewMonthSheet() 
{
	var params = 
	{
		spreadsheetId: TemplateSheetId,
		sheetId: 0,
	};

	var copySheetToAnotherSpreadsheetRequestBody = 
	{
		destinationSpreadsheetId: SpreadsheetId,
	};

	gapi.client.sheets.spreadsheets.sheets.copyTo(params, copySheetToAnotherSpreadsheetRequestBody).then
	(
		function(response)
		{
			console.log(response.result.sheetId);
			
			NameNewTemplate(response.result.sheetId);
		}, 
		
		function(reason) 
		{
			console.error('error: ' + reason.result.error.message);
		}
	);
}

function NameNewTemplate(id, callback)
{	
	var name = GenerateSheetName();

	var params = 
	{
		spreadsheetId: SpreadsheetId,
	};
	
	var batchUpdateSpreadsheetRequestBody = 
	{
		requests: 
		[
			{
				"updateSheetProperties": 
				{  
					"properties": 
					{
						"sheetId": id,
						"title": name,
						"index": 0,
					},
					
					"fields": "title, index",
				},
			}
		],
	};

	gapi.client.sheets.spreadsheets.batchUpdate(params, batchUpdateSpreadsheetRequestBody).then
	(
		function(response)
		{
			console.log(response.result);
			UpdateSheetList();
		}, 
		
		function(reason) 
		{
			console.error('error: ' + reason.result.error.message);
		}
	);	
}

function UpdateSheetList()
{
	gapi.client.sheets.spreadsheets.get({spreadsheetId: SpreadsheetId}).then
	(
		function(response) 
		{
			SheetList = response.result.sheets;
			
			console.log("Sheets updated:");
			
			for(i = 0; i < SheetList.length; i++)
			{
				console.log(SheetList[i].properties);
			}
			
			CurrentSheetName = SheetList[0].properties.title;
			
			if(CurrentSheetName != GenerateSheetName())
			{
				AddNewMonthSheet();
				return;
			}
		}, 

		function(response) 
		{
			console.log('Error: ' + response.result.error.message);
		}
	);
}

function ImportCategoriesToNewSheet()
{
	
}

function SetNewSheetStartAmount()
{
	
}

function GenerateSheetName()
{
	var date = new Date();
	//return ((date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1) + "." + (date.getYear() - 100));
	return "05.18";
	
}

/*************************************** CATEGORIES *********************************************/

function AddCategory(categoryName, categoryType)
{	
	var coordinates;
	var categoryIndex

	for(i = 0; i < IncomeCategoryList.length; i++)
	{
		if(IncomeCategoryList[i] == categoryName)
		{
			alert("Category '" + categoryName + "' already exist! Please choose another category name.");
			return;
		}
	}
	
	for(i = 0; i < OutcomeCategoryList.length; i++)
	{
		if(OutcomeCategoryList[i] == categoryName)
		{
			alert("Category '" + categoryName + "' already exist! Please choose another category name.");
			return;
		}
	}
	
	coordinates = categoryType == "income" ? IncomeCategoriesPosition : OutcomeCategoriesPosition;

	// Search first free category slot
	gapi.client.sheets.spreadsheets.values.get( {spreadsheetId:SpreadsheetId, range:coordinates} ).then
	(
		function(response)
		{
		    categoryIndex = (response.result.values ? response.result.values.length : 0) + 1 + 1;
		  
		    if(categoryIndex > MaxCategoryIndex)
		    {
			    alert("No more " + categoryType + " categories can be added.");
				return;
		    }
		  
		    console.log("First free " + categoryType + " category slot found at: " + categoryIndex);
			
			coordinates = (categoryType == "income" ? IncomeCategoryColumn : OutcomeCategoryColumn) + categoryIndex;
			
		    WriteCell(coordinates, categoryName, UpdateCategoryLists(null))
		},
		
		function(reason)
		{
			console.error('Error: ' + reason.result.error.message);
		}
	);
}

function DeleteCategory(categoryName)
{
	var coordinates;
	indexFound = -1;
	
	for(i = 0; i < IncomeCategoryList.length; i++)
	{
		if(IncomeCategoryList[i] == categoryName)
		{
			coordinates = IncomeCategoryColumn + (i + 2);
			indexFound = i;
			break;
		}
	}
	
	for(i = 0; i < OutcomeCategoryList.length; i++)
	{
		if(OutcomeCategoryList[i] == categoryName)
		{
			coordinates = OutcomeCategoryColumn + (i + 2);
			indexFound = i;
			break;
		}
	}
	
	if(indexFound == -1)
	{
		alert("Category to delete not found!");
		return;
	}
	
	if(indexFound == 0)
	{
		alert("Unable to delete default category!");
		return;
	}
	
	WriteCell(coordinates, "", null);
}

function UpdateCategoryLists(callback)
{
	gapi.client.sheets.spreadsheets.values.get( {spreadsheetId:SpreadsheetId, range:IncomeCategoriesPosition} ).then
	(
		function(response)
		{
			IncomeCategoryList = response.result.values;
			console.log("Income categories updated: " + IncomeCategoryList);
			
			gapi.client.sheets.spreadsheets.values.get( {spreadsheetId:SpreadsheetId, range:OutcomeCategoriesPosition} ).then
			(
				function(response)
				{
					OutcomeCategoryList = response.result.values;
					console.log("Outcome categories updated: " + OutcomeCategoryList);
					
					if(callback != null)
					{
						callback();
					}
				},
				
				function(reason)
				{
					console.error('Error: ' + reason.result.error.message);
				}
			);
		},
		
		function(reason)
		{
			console.error('Error: ' + reason.result.error.message);
		}
	);
}

/************************************* AUTHORIZATION ********************************************/

function handleClientLoad() // On load, called to load the auth2 library and API client library.
{
	console.log("handleClientLoad called");
	
  gapi.load('client:auth2', initClient);
}

function initClient() // Initializes the API client library and sets up sign-in state listeners.
{
	console.log("initClient called");
	
	gapi.client.init( {apiKey:API_KEY, clientId:CLIENT_ID, discoveryDocs:DISCOVERY_DOCS, scope:SCOPES} ).then
	(
		function()
		{
		  gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus); // Listen for sign-in state changes.
		  updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get()); // Handle the initial sign-in state.
		  
		  OnWebpageLoad();
		}
	);
}

function updateSigninStatus(isSignedIn) // Called when the signed in status changes, to update the UI appropriately. After a sign-in, the API is called.
{
	if(isSignedIn)
	{
		console.log("gapi signed in");
	}
	else
	{
		console.log("gapi NOT signed in");
	}
}

function handleAuthClick() // Sign in the user upon button click.
{
	gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick() // Sign out the user upon button click.
{
	gapi.auth2.getAuthInstance().signOut();
}


/************************************** EXPENSE LIST ********************************************/

function UpdateCurrentExpenseList()
{
	gapi.client.sheets.spreadsheets.values.get( {spreadsheetId:SpreadsheetId, range:ExpenseListPosition} ).then
	(
		function(response)
		{
			ExpenseList = response.result.values;
			
			console.log("Expense list updated");
			
			if(ExpenseList == null)
				return;
			
			for(i = 0; i < ExpenseList.length; i++)
			{
				console.log(ExpenseList[i]);
			}
		},
		
		function(reason)
		{
			console.error('Error: ' + reason.result.error.message);
		}
	);
}

/**************************************** COMMON ***********************************************/

function WriteCell(coordinate, value, callback)
{
	var body = {"range":coordinate, "majorDimension":"ROWS", "values":[[value]]};
		
	gapi.client.sheets.spreadsheets.values.update( {spreadsheetId:SpreadsheetId, range:coordinate, valueInputOption:'USER_ENTERED'}, body).then
	(
		function(response)
		{
			console.log(response.result);
			
			if(callback != null)
			{
				callback();
			}
		}, 
		  
		function(reason)
		{
			console.error('Error: ' + reason.result.error.message);
		}
	);
}

function GetFormattedDate() {
    var date = new Date();
	
	var str = date.getDate() + "." + (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1) + "." + date.getFullYear();
    return str;
}



