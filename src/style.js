function resizeView() {
    // Note: Dynamically resize the view
    var pageWidth = window.innerWidth;
    var pageHeight = window.innerHeight;
    document.getElementById("tool_view").style.height = (0.6 * pageWidth);
    document.getElementById("tool_view").style.maxHeight = (0.8 * pageHeight);

}

export {
    resizeView
}