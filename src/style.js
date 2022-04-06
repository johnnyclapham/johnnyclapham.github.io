function resizeView() {
    // Note: Dynamically resize the view
    var pageWidth = window.innerWidth;
    var pageHeight = window.innerHeight;
    document.getElementById("tool_view").style.height = (0.6 * pageWidth);
    document.getElementById("tool_view").style.maxHeight = (0.8 * pageHeight);

}

function writeTechnicalNote() {
    var technical_note = document.getElementById("technical_note");
    technical_note.innerHTML = "Anaximander Data Visualization Tool (Work in Progress Version 0.1)";
    technical_note.style.float = "right";
    technical_note.style.fontSize = "1.07vw";
    technical_note.style.padding = "0.5%";

}

export {
    resizeView,
    writeTechnicalNote
}