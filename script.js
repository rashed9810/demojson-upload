const fileInfoButton = document.getElementById('fileInfoButton');
const fileInfoInput = document.getElementById('fileInfoInput');
const jsonDisplay = document.getElementById('jsonDisplay');
const jsonTable = document.getElementById('jsonTable').getElementsByTagName('tbody')[0];
const editButton = document.getElementById('editButton');
const downloadButton = document.getElementById('downloadButton');

let yourInfo = {};  

fileInfoButton.addEventListener('click', function() {
    fileInfoInput.click();
});

fileInfoInput.addEventListener('change', function(event) {
    const file = event.target.files[0];

    if (!file.type.match('application/json')) {
        alert('Only JSON files are accepted!');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            yourInfo = JSON.parse(e.target.result);
            updateDisplay();
            enableEditDownloadButtons(true);
        } catch (error) {
            alert('Error parsing JSON file!');
        }
    };
    reader.readAsText(file);
});

editButton.addEventListener('click', function() {
    yourInfo.email = 'newemail@example.com';  // Example edit
    updateDisplay();
});

downloadButton.addEventListener('click', function() {
    const blob = new Blob([JSON.stringify(yourInfo)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'edited_info.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a); // Remove the created <a> element
    URL.revokeObjectURL(url);
});

function updateDisplay() {
    jsonDisplay.innerText = JSON.stringify(yourInfo, null, 2);
    populateTable();
}

function populateTable() {
    jsonTable.innerHTML = ''; // Clear table content

    if (Object.keys(yourInfo).length === 0) {
        return; // No data to display
    }

    const row = document.createElement('tr');
    row.innerHTML = `<td>${yourInfo.name}</td><td>${yourInfo.email}</td><td>${yourInfo.phone}</td>`;

    const actionCell = document.createElement('td');
    const editIcon = createIcon('edit-icon', 'glyphicon', 'glyphicon-pencil');
    const deleteIcon = createIcon('delete-icon', 'glyphicon', 'glyphicon-trash');
    const saveIcon = createIcon('save-icon', 'glyphicon', 'glyphicon-floppy-disk');

    actionCell.appendChild(editIcon);
    actionCell.appendChild(deleteIcon);
    actionCell.appendChild(saveIcon);
    row.appendChild(actionCell);

    jsonTable.appendChild(row);

    // Implement edit, delete, and save functionalities for table entries (optional)
}

function createIcon(className1, className2, className3) {
    const icon = document.createElement('span');
    icon.classList.add(className1, className2, className3);
    return icon;
}

function enableEditDownloadButtons(enable) {
    editButton.disabled = !enable;
    downloadButton.disabled = !enable;
}
