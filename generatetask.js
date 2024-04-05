let generatedIds = new Set();

async function generateTaskId() {
    const prefix = 'TK';
    let taskId;
    do {
        const min = 1000000000; // Minimum 10-digit number
        const max = 9999999999; // Maximum 10-digit number
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        taskId = prefix + randomNumber;
    } while (generatedIds.has(taskId)); // Check if the ID is already generated
    generatedIds.add(taskId); // Add the generated ID to the set
    return taskId;
}

module.exports = generateTaskId;
