function gerarTemplate(folder){
var pastaDestino;
var pastaFinalGlobal;
myFiles = folder.getFiles("*.jpg"); 

try {
    app.open(File("N:/INDT/TEMP "+myFiles.length+".indt" ));
    }
catch(myError){
    alert ("Falha");
    }

    var myDocument= app.activeDocument;
//If a graphic file was selected, and if you didn't press Cancel, 
//place the graphic file on the page.
    if((myFiles.length != 0)&&(myFiles != null)){
    
        for (myCounter = 0; myCounter < myDocument.rectangles.length-1; myCounter++){  
                var myRectangle = myDocument.rectangles.item(myCounter); 
                var arquivo = new File(myFiles[myCounter]);
                var pastaDestino =new Folder(arquivo.path);
                var myGraphic = myRectangle.place(arquivo); 
                myRectangle.fit(FitOptions.centerContent); 
                myRectangle.fit(FitOptions.proportionally); 
                myRectangle.fit(FitOptions.frameToContent); 
                }    

            
    } 

            // encontra a pasta anterior
            var pastaFinalIndd  = new String(pastaDestino);
            var tam1 = pastaFinalIndd.length;
            for (var cont; pastaFinalIndd[tam1] != '/'; tam1 --) { }

            // cria pasta de escape
            pastaFinalGlobal = new Folder( pastaFinalIndd.substring(0,tam1));
            pastaFinalIndd = new Folder(pastaFinalGlobal + '/ARQUIVOS INDESIGN');
           // alert ("indd "+pastaFinalIndd);
            pastaFinalIndd.create();


app.activeDocument.save(new File(pastaFinalIndd +"/"+pastaDestino.displayName+".indd"));


//INICIO script EXPORTAR TUDO JPEG

                if (app.documents.length != 0) {  
                    var myDoc = app.activeDocument;  
                    var myBaseName = myDoc.name;
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
            
            // cria pasta de escape
            var pastaFinal = new Folder(pastaFinalGlobal + '/EXPORTADA')
          //  alert ("jpg "+pastaFinal);
            pastaFinal.create();
            var myFilePath = pastaFinal+"/"+ myBaseName  + "_" + myPageName + ".jpg";  
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


app.activeDocument.close(SaveOptions.no);
}





//Display a standard open file dialog box to select a graphic file.
var myFolder = Folder.selectDialog("Selecione o curso por favor", ""); 
var myError;
var formandos = myFolder.getFiles ("20*");
// Laço formandos
 for (var y =0; y<formandos.length;y++){

// Laço pastas montagens
    var subPastas = formandos[y].getFiles ("TEMP*");
        for (var x =0; x<subPastas.length;x++){
                gerarTemplate (subPastas[x]);
                }
    
}

