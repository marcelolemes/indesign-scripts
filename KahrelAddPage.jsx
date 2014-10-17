// add a page at the end of the current document,
// place a text frame on it, and link the text frame

doc = app.activeDocument
np = doc.pages.add();
marg = np.marginPreferences;
gb = [marg.top, marg.left,
	doc.documentPreferences.pageHeight - marg.bottom,
	doc.documentPreferences.pageWidth - marg.right];
oldRuler = doc.viewPreferences.rulerOrigin
doc.viewPreferences.rulerOrigin = RulerOrigin.pageOrigin;

doc.viewPreferences.rulerOrigin = oldRuler
