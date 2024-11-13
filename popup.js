// Event listener for toggling edit mode
document.getElementById("toggleEditButton").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: toggleEditMode
      });
    });
  });
  
  // Event listener for saving the page content
  document.getElementById("saveChangesButton").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: savePageContent
      });
    });
  });
  
  // Event listener for loading saved page content
  document.getElementById("loadChangesButton").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: loadPageContent
      });
    });
  });
  
  // Event listener for highlighting text
  document.getElementById("highlightButton").addEventListener("click", () => {
    const highlightColor = document.getElementById("highlightColor").value;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: highlightText,
        args: [highlightColor]
      });
    });
  });
  
  
  // Event listener for exporting content
  document.getElementById("exportButton").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: exportContent
      });
    });
  });
  
  // Toggle document.editable mode
  function toggleEditMode() {
  let val=  document.designMode = document.designMode === "off" ? "on" : "off";
   alert("edit is "+val);
  }

  
  
  // Save the current page content to localStorage
  function savePageContent() {
    localStorage.setItem("savedContent", document.body.innerHTML);
    alert("Page content saved.");
  }
  
  // Load saved page content from localStorage
  function loadPageContent() {
    const savedContent = localStorage.getItem("savedContent");
    if (savedContent) {
      document.body.innerHTML = savedContent;
      alert("Saved content loaded.");
    } else {
      alert("No saved content found.");
    }
  }
  
  // Highlight selected text
  function highlightText(highlightColor) {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const highlight = document.createElement("span");
      highlight.style.backgroundColor = highlightColor; // Use the selected color
      range.surroundContents(highlight);
    }
  }
  
  // Export the content of the page as an HTML file
  function exportContent() {
    const content = document.documentElement.outerHTML;
    const blob = new Blob([content], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "page_content.html";
    a.click();
    URL.revokeObjectURL(url);
  }
  
  document.getElementById("exportPdfButton").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: exportAsPdf
      });
    });
  });

  function exportAsPdf() {
    const { jsPDF } = window.jspdf; // Destructure jsPDF from the library
  
    // Create a new jsPDF instance
    const doc = new jsPDF();
  
    // Get the content of the webpage (you can customize this to your needs)
    const content = document.body.innerHTML;
  
    // Add the content to the PDF. You can adjust positioning and size as needed.
    doc.html(content, {
      callback: function (doc) {
        doc.save("page_content.pdf"); // Save the PDF with the name "page_content.pdf"
      },
      margin: [10, 10, 10, 10],
      x: 10,
      y: 10
    });
  }