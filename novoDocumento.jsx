//ImageCatalog.jsx
//An InDesign CS6 JavaScript 
/*  
@@@BUILDINFO@@@ "ImageCatalog.jsx" 3.0.0 15 December 2009
*/ 
//Creates an image catalog from the graphic files in a selected folder. 
//Each file can be labeled with the file name, and the labels are placed on 
//a separate layer and formatted using a paragraph style ("label") you can 
//modify to change the appearance of the labels. 
// 
//For more information on InDesign scripting, go to http://www.adobe.com/products/indesign/scripting/index.html 
//Or visit the InDesign Scripting User to User forum at http://www.adobeforums.com . 
// 
//The myExtensions array contains the extensions of the graphic file types you want 
//to include in the catalog. You can remove extensions from or add extensions to this list. 
//myExtensions is a global. Mac OS users should also look at the file types in the myFileFilter function.
main();
function main(){
    
    
    
              var myNumberOfRows = 3; 
			var myNumberOfColumns = 3; 
			var myRemoveEmptyFrames = true;
			var myFitProportional = true;
			var myFitCenterContent = true;
			var myFitFrameToContent = true;
			var myHorizontalOffset = 1;
			var myVerticalOffset = 1;
			var myMakeLabels = false;
			
    
	var myFilteredFiles;
	//Make certain that user interaction (display of dialogs, etc.) is turned on.
	app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
	myExtensions = [".jpg", ".jpeg"] 
	//Display the folder browser. 
	var myFolder = Folder.selectDialog("Select the folder containing the images", ""); 
	//Get the path to the folder containing the files you want to place. 
	if(myFolder != null){ 
			if(File.fs == "Macintosh"){
				myFilteredFiles = myMacOSFileFilter(myFolder);
			}
			else{
				myFilteredFiles = myWinOSFileFilter(myFolder);
			}
        			if(myFilteredFiles.length != 0){ 
					myMakeImageCatalog(myFilteredFiles, myNumberOfRows, myNumberOfColumns, myRemoveEmptyFrames, myFitProportional, myFitCenterContent, myFitFrameToContent, myHorizontalOffset, myVerticalOffset, myMakeLabels); 
					alert("Done!");
			} 

			
	}
}
//Windows version of the file filter.
function myWinOSFileFilter(myFolder){
	var myFiles = new Array;
	var myFilteredFiles = new Array; 
	for(myExtensionCounter = 0; myExtensionCounter < myExtensions.length; myExtensionCounter++){ 
		myExtension = myExtensions[myExtensionCounter]; 
        myFiles = myFolder.getFiles("*"+ myExtension); 
		if(myFiles.length != 0){ 
			for(var myFileCounter = 0; myFileCounter < myFiles.length; myFileCounter++){ 
				myFilteredFiles.push(myFiles[myFileCounter]); 
			} 
		} 
	}	
	return myFilteredFiles;
}
function myMacOSFileFilter(myFolder){
	var myFilteredFiles = myFolder.getFiles(myFileFilter);
	return myFilteredFiles;
}
//Mac OS version of file filter
//Have to provide a separate version because not all Mac OS users use file extensions
//and/or file extensions are sometimes hidden by the Finder.
function myFileFilter(myFile){
	var myFileType = myFile.type;
	switch (myFileType){
		case "JPEG":
		case "EPSF":
		case "PICT":
		case "TIFF":
		case "8BPS":
		case "GIFf":
		case "PDF ":
			return true;
			break;
		default:
		for(var myCounter = 0; myCounter<myExtensions.length; myCounter++){
			var myExtension = myExtensions[myCounter]; 	
			if(myFile.name.indexOf(myExtension)>-1){
				return true;
				break;			
			}
		}
	}
	return false;	
}


function myGetParagraphStyleNames(myDocument){
	var myStyleNames = new Array;
	var myAddLabelStyle = true;
	for(var myCounter = 0; myCounter < myDocument.paragraphStyles.length; myCounter++){
		myStyleNames.push(myDocument.paragraphStyles.item(myCounter).name);
		if (myDocument.paragraphStyles.item(myCounter).name == "Labels"){
			myAddLabelStyle = false;
		}
	}
	if(myAddLabelStyle == true){
		myStyleNames.push("Labels");
	}
	return myStyleNames;
}
function myMakeImageCatalog(myFiles, myNumberOfRows, myNumberOfColumns, myRemoveEmptyFrames, myFitProportional, myFitCenterContent, myFitFrameToContent, myHorizontalOffset, myVerticalOffset, myMakeLabels, myLabelType, myLabelHeight, myLabelOffset, myLabelStyle,  myLayerName){
	var myPage, myFile, myCounter, myX1, myY1, myX2, myY2, myRectangle, myLabelStyle, myLabelLayer; 
	var myParagraphStyle, myError;
	var myFramesPerPage = myNumberOfRows * myNumberOfColumns;  
	var myDocument = app.documents.add(); 
	myDocument.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.points; 
	myDocument.viewPreferences.verticalMeasurementUnits = MeasurementUnits.points; 
	var myDocumentPreferences = myDocument.documentPreferences;  
	var myNumberOfFrames = myFiles.length; 
	var myNumberOfPages = Math.round(myNumberOfFrames / myFramesPerPage); 
	if ((myNumberOfPages * myFramesPerPage) < myNumberOfFrames){  
		myNumberOfPages++; 
	}
	
	myDocumentPreferences.pagesPerDocument = (myNumberOfPages);  
	myDocumentPreferences.facingPages = true;  
	var myPage = myDocument.pages.item(0);  
	var myMarginPreferences = myPage.marginPreferences; 
	var myLeftMargin = myMarginPreferences.left;  
	var myTopMargin = myMarginPreferences.top;  
	var myRightMargin = myMarginPreferences.right;  
	var myBottomMargin = myMarginPreferences.bottom;  
	var myLiveWidth = (myDocumentPreferences.pageWidth - (myLeftMargin + myRightMargin)) + myHorizontalOffset
	var myLiveHeight = myDocumentPreferences.pageHeight - (myTopMargin + myBottomMargin)
	var myColumnWidth = myLiveWidth / myNumberOfColumns
	var myFrameWidth = myColumnWidth - myHorizontalOffset
	var myRowHeight = (myLiveHeight / myNumberOfRows)
	var myFrameHeight = myRowHeight - myVerticalOffset
	var myPages = myDocument.pages;
	// Construct the frames in reverse order. Don't laugh--this will  
	// save us time later (when we place the graphics).  
	for (myCounter = myDocument.pages.length-1; myCounter >= 0; myCounter--){  
		myPage = myPages.item(myCounter); 
		for (var myRowCounter = myNumberOfRows; myRowCounter >= 1; myRowCounter--){  
			myY1 = myTopMargin + (myRowHeight * (myRowCounter-1));
			myY2 = myY1 + myFrameHeight;
			for (var myColumnCounter = myNumberOfColumns; myColumnCounter >= 1; myColumnCounter--){  
				myX1 = myLeftMargin + (myColumnWidth * (myColumnCounter-1));
				myX2 = myX1 + myFrameWidth;
				myRectangle = myPage.rectangles.add(myDocument.layers.item(-1), undefined, undefined, {geometricBounds:[myY1, myX1, myY2, myX2], strokeWeight:0, strokeColor:myDocument.swatches.item("None")});  
			} 
		}
	}
	// Because we constructed the frames in reverse order, rectangle 1  
	// is the first rectangle on page 1, so we can simply iterate through  
	// the rectangles, placing a file in each one in turn. myFiles = myFolder.Files;  
	for (myCounter = 0; myCounter < myNumberOfFrames; myCounter++){  
		myFile = myFiles[myCounter];  
		myRectangle = myDocument.rectangles.item(myCounter); 
		myRectangle.place(File(myFile)); 
		myRectangle.label = myFile.fsName.toString();
		//Apply fitting options as specified.
		if(myFitProportional){
			myRectangle.fit(FitOptions.proportionally); 
		}
		if(myFitCenterContent){
			myRectangle.fit(FitOptions.centerContent); 
		}
		if(myFitFrameToContent){
			myRectangle.fit(FitOptions.frameToContent); 
		}
		//Add the label, if necessary.
		if(myMakeLabels == true){ 
			myAddLabel(myRectangle, myLabelType, myLabelHeight, myLabelOffset, myLabelStyle, myLayerName);
		} 
	}
	if (myRemoveEmptyFrames == 1){  
		for (var myCounter = myDocument.rectangles.length-1; myCounter >= 0;myCounter--){  
			if (myDocument.rectangles.item(myCounter).contentType == ContentType.unassigned){ 
				myDocument.rectangles.item(myCounter).remove(); 
			}  
			else{ 
				//As soon as you encounter a rectangle with content, exit the loop. 
				break; 
			} 
		}
	}
}
//Function that adds the label.
function myAddLabel(myFrame, myLabelType, myLabelHeight, myLabelOffset, myLabelStyleName, myLayerName){
	var myDocument = app.documents.item(0);
	var myLabel;
	var myLabelStyle = myDocument.paragraphStyles.item(myLabelStyleName);
	var myLabelLayer = myDocument.layers.item(myLayerName);
	var myLink =myFrame.graphics.item(0).itemLink;
	//Label type defines the text that goes in the label.
	switch(myLabelType){
		//File name
		case 0:
			myLabel = myLink.name;
			break;
		//File path
		case 1:
			myLabel = myLink.filePath;
			break;
		//XMP description
		case 2:
			try{
				myLabel = myLink.linkXmp.description;
				if(myLabel.replace(/^\s*$/gi, "")==""){
					throw myError;
				}
			}
			catch(myError){
				myLabel = "No description available.";
			}
			break;
		//XMP author
		case 3:
			try{
				myLabel = myLink.linkXmp.author
				if(myLabel.replace(/^\s*$/gi, "")==""){
					throw myError;
				}
			}
			catch(myError){
				myLabel = "No author available.";
			}
			break;
	}
	var myX1 = myFrame.geometricBounds[1]; 
	var myY1 = myFrame.geometricBounds[2] + myLabelOffset; 
	var myX2 = myFrame.geometricBounds[3]; 
	var myY2 = myY1 + myLabelHeight;
	var myTextFrame = myFrame.parent.textFrames.add(myLabelLayer, undefined, undefined,{geometricBounds:[myY1, myX1, myY2, myX2], contents:myLabel}); 
	myTextFrame.textFramePreferences.firstBaselineOffset = FirstBaseline.leadingOffset; 
	myTextFrame.parentStory.texts.item(0).appliedParagraphStyle = myLabelStyle;				
}
