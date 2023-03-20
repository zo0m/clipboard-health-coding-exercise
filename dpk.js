const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const getStringHash = (data) => crypto.createHash("sha3-512").update(data).digest("hex");

const getPartitionKeyFromEvent = (event) => {
    if (!event) {
        return;
    }

    if (event.partitionKey) {
        return event.partitionKey;
    }

    const data = JSON.stringify(event);
    return getStringHash(data);
}

/**
 *
 * @param { Object | undefined } event
 * @param { string | Object | undefined } event.partitionKey
 * @returns { string }
 */
const getDeterministicPartitionKey = (event) => {
    let candidate = getPartitionKeyFromEvent(event) ?? TRIVIAL_PARTITION_KEY;

    if (typeof candidate !== "string") {
        candidate = JSON.stringify(candidate);
    }

    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
        candidate = getStringHash(candidate);
    }

    return candidate;
};

module.exports = {
    getDeterministicPartitionKey
}
