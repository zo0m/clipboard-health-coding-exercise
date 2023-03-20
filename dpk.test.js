const { getDeterministicPartitionKey } = require("./dpk");

describe("getDeterministicPartitionKey", () => {
    it("Returns the literal '0' when given no input", () => {
        const trivialKey = getDeterministicPartitionKey();

        expect(trivialKey).toBe("0");
    });

    it("Returns the predefined key from event", () => {
        const partitionKey = "PREDEFINED_PARTITION_KEY";
        const predefinedKey = getDeterministicPartitionKey({ partitionKey });

        expect(predefinedKey).toBe(partitionKey);
    });

    it("Generates key for existing event", () => {
        const event = {key: 1};
        const eventHash = "88b18d12b7c20a322a5b0d5f42bf9724e5fa1dc79a52a3f11848123c794f2c68aeeefef8a8d14b97b26a398086dcbd6bec9c7d9235f06d2fc19f7306f47e1444";
        const eventKey = getDeterministicPartitionKey(event);

        expect(eventKey).toBe(eventHash);
    });

    it("Generates key for empty event", () => {
        const emptyEvent = {};
        const emptyEventHash = "c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862";
        const emptyEventKey = getDeterministicPartitionKey(emptyEvent);

        expect(emptyEventKey).toBe(emptyEventHash);
    });
});
