//DESCRIPTION: Merge the two open documents

(function() {
	if (app.documents.length != 2) {
		alert("Please open two InDesign documents and try again.");
		return;
	} else {
		var doc1 = app.documents[0];
		var doc2 = app.documents[1];
		
		if (checkPageSizes(doc1, doc2)) {
			// docs have same page sizes
			var pHt = doc1.documentPreferences.pageHeight;
			var pWd = doc1.documentPreferences.pageWidth;

			if (!doc1.saved || !doc2.saved) {
				if (!confirm("Both documents will be saved before closing. Continue?")) {
					return;
				}
			}

			var doc1Lim = doc1.pages.length;
			var doc2Lim = doc2.pages.length;
			var file1 = doc1.fullName;
			var file2 = doc2.fullName;
			doc2.close(SaveOptions.yes);
			doc1.close(SaveOptions.yes);
			app.documentPreferences.facingPages = false;
			newDoc = app.documents.add();
			newDoc.documentPreferences.properties = {
				pagesPerDocument:Math.max(doc1Lim, doc2Lim)*2,
				pageHeight:pHt,
				pageWidth:pWd
			}
			app.importedPageAttributes.importedPageCrop = ImportedPageCropOptions.cropContent;
			var j = 0;
			app.scriptPreferences.userInteractionLevel = UserInteractionLevels.neverInteract;

			while (true) {
				app.importedPageAttributes.pageNumber = j + 1;
				if (doc1Lim > j) {
					newDoc.pages[j * 2].place(file1);
				}

				app.importedPageAttributes.pageNumber = j + 1;
				if (doc2Lim > j) {
					newDoc.pages[(j * 2) + 1].place(file2);
				}

				j++;

				if (j > Math.max(doc1Lim,doc2Lim)) break;
			}
		
			app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
			
		} else {
			alert("Two documents must have the same page size");
			return;
		}
	}

	function checkPageSizes(doc1, doc2) {
		var d1ht = doc1.documentPreferences.pageHeight;
		var d1wd = doc1.documentPreferences.pageWidth;
		var d2ht = doc2.documentPreferences.pageHeight;
		var d2wd = doc2.documentPreferences.pageWidth;
		if (d1ht != d2ht) return false;
		if (d1wd != d2wd) return false;
		return true;
	}

}())

/* I've only tested it with CS4, but I'm fairly sure it will work with CS3. It does, however, expose a bug in CS4. After the first placed page, the master items don't appear in the placed pages.
This is a very nasty bug.
*/