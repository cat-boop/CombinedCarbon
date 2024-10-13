let recycleCC = 0;
let meatCC = 0;

function saveRecycleValue() {
    dropdown = document.getElementById('recycleDropdown');
    recycleCC = dropdown.value;
}
function saveMeatValue() {
    dropdown = document.getElementById('meatDropdown');
    meatCC = dropdown.value;
}

let savedValue = 0;
function saveTransportationMode() {
    const radios = document.getElementsByName('optionsRadios');
    for (const radio of radios) {
        if (radio.checked) {
            savedValue = parseInt(radio.value, 5);
            break;
        }
    }
}

function checkSavedValue() {
    switch (savedValue) {
        case 2:
            currentModal = bootstrap.Modal.getInstance(document.getElementById('transModal'));
            if (currentModal) {
                currentModal.hide();
            }
            // Open the waterModal
            const waterModal = new bootstrap.Modal(document.getElementById('waterModal'));
            waterModal.show();
            break;
    }
    switch (savedValue) {
        case 1:
            currentModal = bootstrap.Modal.getInstance(document.getElementById('transModal'));
            if (currentModal) {
                currentModal.hide();
            }
            // Open the carModal
            const waterModal = new bootstrap.Modal(document.getElementById('carModal'));
            waterModal.show();
            break;
    }
}

let savedCarType = 0;
function saveCarType() {
    const radios = document.getElementsByName('optionsRadios');
    for (const radio of radios) {
        if (radio.checked) {
            savedCarType = parseInt(radio.value, 5);
            break;
        }
    }
}

let milesValue = 0;
function saveMiles() {
    milesInput = document.getElementById('miles').value;
    milesValue = parseFloat(milesInput);
}

let kwhValue = 0;
function checkEnergy() {
    let savedEnergy;
    const radios = document.getElementsByName('energyRadio');
    for (const radio of radios) {
        if (radio.checked) {
            savedEnergy = parseInt(radio.value, 10);
            break;
        }
    }

    switch (savedEnergy) {
        case 1:
            currentModal = bootstrap.Modal.getInstance(document.getElementById('electricModal'));
            if (currentModal) {
                currentModal.hide();
            }
            // Open the meatModal
            meatModal = new bootstrap.Modal(document.getElementById('meatModal'));
            meatModal.show();
            kwhValue = 899;
            break;
    }

    let energyCheck = savedEnergy; // Assuming energyCheck should be the same as savedEnergy
    switch (energyCheck) {
        case 2:
            currentModal = bootstrap.Modal.getInstance(document.getElementById('electricModal'));
            if (currentModal) {
                currentModal.hide();
            }
            // Open the energyManualModal
            energyManualModal = new bootstrap.Modal(document.getElementById('energyManualModal'));
            energyManualModal.show();
            break;
    }
}

function saveKwh() {
    kwhInput = document.getElementById('kwh').value;
    kwhValue = parseFloat(kwhInput);
}


let totalWater = 0;
function saveWater() {
    // Retrieve the selected dishwashing method
    dishesField = document.getElementById('washes').value;
    totalWater += Number(dishesField);
}

//ALL CALCULATIONS
function finalCalc() {
    let finalCC = 0;

    finalCC += Number(recycleCC);
    
    finalCC += Number(meatCC);
    
    let totalEmissions = 0;
    if (savedValue === 1) {
        switch (savedCarType) {
            case 1:
                totalEmissions = Number(milesValue) * 0.4;
                if (totalEmissions > 120) {
                    finalCC += 0;
                } else if (totalEmissions <= 120 && totalEmissions >= 88) {
                    finalCC += 1;
                } else if (totalEmissions < 88) {
                    finalCC += 2;
                }
                break;
            case 2:
                totalEmissions = Number(milesValue) * 0.46;
                if (totalEmissions > 120) {
                    finalCC += 0;
                } else if (totalEmissions <= 120 && totalEmissions >= 88) {
                    finalCC += 1;
                } else if (totalEmissions < 88) {
                    finalCC += 2;
                }
                break;
            case 3:
                totalEmissions = Number(milesValue) * 0.26;
                if (totalEmissions > 120) {
                    finalCC += 0;
                } else if (totalEmissions <= 120 && totalEmissions >= 88) {
                    finalCC += 1;
                } else if (totalEmissions < 88) {
                    finalCC += 2;
                }
                break;
            case 4:
                finalCC += 2;
                break;
        }
    } else if (savedValue === 2) {
        finalCC += 2;
    }
    
    

    showerInput = document.getElementById('showers').value;
    showerGal = parseFloat(showerInput);
    totalWater += (showerGal * 20);


    laundryInput = document.getElementById('laundry').value;
    laundryGal = parseFloat(laundryInput);
    totalWater += (laundryGal * 27);

    if (totalWater >= 309) {
        finalCC += 0;
    }
    if (totalWater < 309 && totalWater > 225) {
        finalCC += 1;
    }
    if (totalWater <= 225) {
        finalCC += 2;
    }
   

    if (kwhValue >= 1199) {
        finalCC += 0;
    }
    else if (kwhValue < 1199 && kwhValue > 599) {
        finalCC += 1;
    }
    else if (kwhValue <= 599) {
        finalCC += 2;
    }
    document.getElementById('waterList').innerText = `${totalWater}`;
    document.getElementById('reportCC').innerText = `${finalCC}/10`;

    if (Number(finalCC) < 5) {
        document.getElementById('reportAmerican').innerText = 'worse than';
    }
    else if (Number(finalCC) == 5) {
        document.getElementById('reportAmerican').innerText = 'the same as';
    }
    else if (Number(finalCC) > 5) {
        document.getElementById('reportAmerican').innerText = 'better than';
    }


}
console.log('worked')