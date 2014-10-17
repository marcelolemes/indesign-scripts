 var myDocument= app.activeDocument;
//Display a standard open file dialog box to select a graphic file.
var myFolder = Folder.selectDialog("Select the folder containing the images", ""); 
myFiles = myFolder.getFiles("*.jpg"); 
//If a graphic file was selected, and if you didn't press Cancel, 
//place the graphic file on the page.
if((myFiles.length != 0)&&(myFiles != null)){
    
    for (myCounter = 0; myCounter < myDocument.rectangles.length-1; myCounter++){  
        var myRectangle = myDocument.rectangles.item(myCounter); 
        var myGraphic = myRectangle.place(File(myFiles[myCounter])); 
        myRectangle.fit(FitOptions.centerContent); 
        myRectangle.fit(FitOptions.proportionally); 
        myRectangle.fit(FitOptions.frameToContent); 

}    



}