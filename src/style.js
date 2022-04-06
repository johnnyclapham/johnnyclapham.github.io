function resizeView() {
    // Note: Dynamically resize the view
    var pageWidth = window.innerWidth;
    document.getElementById("tool_view").style.height = (0.6 * pageWidth);
}

export {
    resizeView
}