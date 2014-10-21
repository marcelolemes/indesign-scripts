//INICIO script EXPORTAR TUDO JPEG

if (app.documents.length != 0) {  
     var myDoc = app.activeDocument;  
     var myBaseName = myDoc.filePath.displayName;
     if (myBaseName != null) MakeJPEGfile();  
}  
else{    
     alert("Please open a document and try again.");    
}   
  
function MakeJPEGfile() {   
     for(var myCounter = 0; myCounter < myDoc.pages.length; myCounter++) {  
          if (myDoc.pages.item(myCounter).appliedSection.name != "") {  
               myDoc.pages.item(myCounter).appliedSection.name = "";  
          }  
          var myPageName = myDoc.pages.item(myCounter).name;  
          app.jpegExportPreferences.jpegQuality = JPEGOptionsQuality.maximum; // low medium high maximum  
          app.jpegExportPreferences.exportResolution = 300;
          app.jpegExportPreferences.jpegExportRange = ExportRangeOrAllPages.exportRange;  
          app.jpegExportPreferences.pageString = myPageName;  
            
          var myFilePath = new Folder(myDoc.filePath+ "/exportado/");  
          myFilePath.create();
            var myFilePath = myDoc.filePath+ "/exportado/"+ myBaseName  + "_" + myPageName + ".jpg";  
          var myFile = new File(myFilePath);  
          myDoc.exportFile(ExportFormat.jpg, myFile, false);  
     }  
}  
  
function GetFileNameOnly(myFileName) {  
     var myString = "";  
     var myResult = myFileName.lastIndexOf(".");  
     if (myResult == -1) {  
          myString = myFileName;  
     }  
     else {  
          myString = myFileName.substr(0, myResult);  
     }  
     return myString;  
} 

//FIM script EXPORTAR TUDO JPEG