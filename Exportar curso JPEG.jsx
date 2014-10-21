//INICIO script EXPORTAR TUDO JPEG

function exportarDocumento(myDocument){
    
        try{
            app.open(myDocument);
            
            }
        catch(myError){

        }
    var myDoc =app.activeDocument;
        var myBaseName = myDoc.name;
        if (myBaseName != null) MakeJPEGfile();  

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
            
            var myFilePath = new Folder(myDoc.filePath+ "/exportada/");  
            myFilePath.create();
            var myFilePath = myDoc.filePath+ "/exportada/"+ myBaseName  + "_" + myPageName + ".jpg";  
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

 app.activeDocument.close(SaveOptions.no);
}
//FIM script EXPORTAR TUDO JPEG


var myFolder = Folder.selectDialog("Selecione o curso por favor", ""); 
var myError;
var arquivos;
var myDocument;
var formandos = myFolder.getFiles ("20*");
// Laço formandos
 for (var y =0; y<formandos.length;y++){

// Laço pastas montagens
    var subPastas = formandos[y].getFiles ("ARQUIVOS INDESIGN*");
    
        for (var x =0; x<subPastas.length;x++){
            arquivos = subPastas[x].getFiles ("*.indd");
             if (arquivos.length>0){
                for(var z =0; z<arquivos.length;z++){
                    exportarDocumento (arquivos[z]); 
                 }
             }
             
                }
    
}