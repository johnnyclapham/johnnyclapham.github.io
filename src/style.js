function resizeView() {
    // Note: Dynamically resize the view
    var pageWidth = window.innerWidth;
    var pageHeight = window.innerHeight;
    document.getElementById("tool_view").style.height = (0.6 * pageWidth);
    // document.getElementById("tool_view").style.maxWidth = (pageHeight * 1);
    document.getElementById("tool_view").style.maxHeight = (0.8 * pageHeight);

}

function writeTechnicalNote() {
    var technical_note = document.getElementById("technical_note");
    technical_note.innerHTML = "Anaximander Data Visualization Tool (Work in Progress Version 0.3)";
    technical_note.style.float = "right";
    technical_note.style.fontSize = "1.07vw";
    technical_note.style.padding = "0.5%";

}

function setButtonInactive(buttonNameToDeactivate) {

    document.getElementById(buttonNameToDeactivate).style.border = "thick solid #f0b22300";
    document.getElementById(buttonNameToDeactivate).style.fontSize = "2.1vw";
    document.getElementById(buttonNameToDeactivate).style.color = "white";
}

function setButtonActive(mode) {
    // Note: Style the selected button
    var buttonName = mode + "_button";
    var button = document.getElementById(buttonName);
    button.style.borderBlockStartWidth = "thick";
    button.style.border = "thick solid #F0B323";
    button.style.color = "#F0B323";
    document.getElementById(buttonName).style.fontSize = "2.3vw";
    var buttonNameToDeactivate;
    if (mode == "circle") {
        buttonNameToDeactivate = "heat_button";
    }

    if (mode == "heat") {
        buttonNameToDeactivate = "circle_button";
    }
    // Note: We deactivate the other button
    setButtonInactive(buttonNameToDeactivate);
}

export {
    resizeView,
    writeTechnicalNote,
    setButtonActive
}