(function (window) {
    var document = window.document;

    var memoryBlock = 4;
    var totalInstruction = 320;
    var numberOfInstructionsInEachPage = 10;
    var memory = [];
    var instructions = [];
    var insCount = 0;
    var missingPage = 0;

    var numberOfMissingPagesSpan = document.getElementById("numberOfMissingPages");
    var pageFaultRateSpan = document.getElementById("pageFaultRate");
    //pageFaultRateSpan.setVisible(false);

    function begin() {
        document.getElementById("startBtn").disabled = true;
        init();
        $("#memoryTable  tr:not(:first)").empty("");
        chooseAlgrithm();
        document.getElementById("startBtn").disabled = false;
    }

    function init() {
        memory = new Array(memoryBlock);
        instructions = new Array(totalInstruction);
        insCount = 0;
        missingPage = 0;

        numberOfMissingPagesSpan.textContent = missingPage;
        pageFaultRateSpan.textContent = missingPage / 320;
    };

    function chooseAlgrithm() {
        var ratio = document.querySelector("input:checked");
        if (ratio.value === "FIFO") {
            FIFO();
        } else if(ratio.value === "LRU") {
            LRU();
        }
    };

    // 是否被执行过
    function isInstructionExecuted(number) {
        if (typeof instructions[number] === "undefined") {
            instructions[number] = false;
        };
        return instructions[number];
    };

    // 是否发生缺页
    function isInstructionAvailable(number) {
        for (var i = 0; i < memory.length; i++) {
            if (Math.floor(number / numberOfInstructionsInEachPage) === memory[i]) {
                return true;
            };
        };
        return false;
    };

    // 选择指令的策略
    //  0 顺序执行
    //  1 向后跳转
    // -1 向前跳转
    function FIFO() {
        var strategy = 1;
        var po = 0;
        var instruct = -1;
        while(insCount < 320) {
            if (strategy === 0) {
                instruct++;
                if (insCount % 4 === 1) {
                    strategy = -1;
                } else {
                    strategy = 1;
                };
            } else if (strategy === 1) {
                if (instruct + 1 > 319) {
                    strategy = -1;
                    continue;
                };
                instruct = Math.floor(Math.random() * (totalInstruction - (instruct + 1)) + (instruct + 1));
                strategy = 0;
            } else if (strategy === -1) {
                if (instruct - 2 < 0) {
                    strategy = 1;
                    continue;
                };

                instruct = Math.floor(Math.random() * (instruct - 1));
                strategy = 0;
            };

            if (instruct < 0) {
                instruct = -1;
                strategy = 1;
                continue;
            } else if (instruct >= 320) {
                instruct = 321
                strategy = -1;
                continue;
            };
            if (!isInstructionExecuted(instruct)) {
                if (!isInstructionAvailable(instruct)) {
                    missingPage++;
                    numberOfMissingPagesSpan.textContent = missingPage;
                    pageFaultRateSpan.textContent = missingPage / 320;
                    memory[(po++) % 4] = Math.floor(instruct / numberOfInstructionsInEachPage);
                };
                insCount++;
                instructions[instruct] = true;
            };

            var row = document.getElementById("memoryTable").insertRow();
            row.insertCell(0).innerHTML = instruct;
            row.insertCell(1).innerHTML = memory[0];
            row.insertCell(2).innerHTML = memory[1] == undefined ? "Empty" : memory[1];
            row.insertCell(3).innerHTML = memory[2] == undefined ? "Empty" : memory[2];
            row.insertCell(4).innerHTML = memory[3] == undefined ? "Empty" : memory[3];
        };
    };

    function LRU() {
        var strategy = 1;
        var stack = [0, 1, 2, 3];

        var instruct = -1;
        while(insCount < 320) {
            if (strategy === 0) {
                instruct++;
                if (insCount % 4 === 1) {
                    strategy = -1;
                } else {
                    strategy = 1;
                };
            } else if (strategy === 1) {
                if (instruct + 1 > 319) {
                    strategy = -1;
                    continue;
                };

                instruct = Math.floor(Math.random() * (totalInstruction - (instruct + 1)) + (instruct + 1));
                strategy = 0;
            } else if (strategy === -1) {
                if (instruct - 2 < 0) {
                    strategy = 1;
                    continue;
                };

                instruct = Math.floor(Math.random() * (instruct - 1));
                strategy = 0;
            };

            if (instruct < 0) {
                instruct = -1;
                strategy = 1;
                continue;
            } else if (instruct >= 320) {
                instruct = 321
                strategy = -1;
                continue;
            };

            if (!isInstructionExecuted(instruct)) {
                if (!isInstructionAvailable(instruct)) {
                    missingPage++;
                    numberOfMissingPagesSpan.textContent = missingPage;
                    pageFaultRateSpan.textContent = missingPage / 320;
                    memory[stack[0]] = Math.floor(instruct / numberOfInstructionsInEachPage);
                };

                // 调整访问顺序
                var page = Math.floor(instruct / numberOfInstructionsInEachPage);
                var block = memory.indexOf(page);
                stack.splice(stack.indexOf(block), 1);
                stack.push(block);

                insCount++;
                instructions[instruct] = true;
            };

            var row = document.getElementById("memoryTable").insertRow();
            row.insertCell(0).innerHTML = instruct;
            row.insertCell(1).innerHTML = memory[0];
            row.insertCell(2).innerHTML = memory[1] == undefined ? "Empty" : memory[1];
            row.insertCell(3).innerHTML = memory[2] == undefined ? "Empty" : memory[2];
            row.insertCell(4).innerHTML = memory[3] == undefined ? "Empty" : memory[3];
        };
    };

    document.getElementById("startBtn").addEventListener('click', begin);
})(window)

