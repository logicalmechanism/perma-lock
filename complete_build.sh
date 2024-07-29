#!/usr/bin/env bash
set -e

# create directories if dont exist
mkdir -p contracts
mkdir -p hashes
mkdir -p scripts/tmp

# remove old files
rm contracts/* || true
rm hashes/* || true
rm -fr build/ || true

# start building out the entire script
echo -e "\033[1;34m\nBuilding Contracts\n\033[0m"

# remove all traces
# aiken build --trace-level silent --filter-traces user-defined


# keep the traces for testing if required
aiken build --trace-level verbose --filter-traces all

###############################################################################
###############################################################################
###############################################################################

random_string=$(jq -r '.randomString' config.json)
random_cbor=$(python3 -c "import cbor2;hex_string='${random_string}';data = bytes.fromhex(hex_string);encoded = cbor2.dumps(data);print(encoded.hex())")

echo Random String: ${random_string}

echo -e "\033[1;33m Convert Perma Lock NFT Contract \033[0m"

# apply the parameters to the contract
aiken blueprint apply -o plutus.json -v perma_lock.params "${random_cbor}"

# store the plutus file in the contracts folder
aiken blueprint convert -v perma_lock.params > contracts/perma_lock_contract.plutus

###############################################################################
###############################################################################
###############################################################################

# store the script hashes in the hashes folder
echo -e "\033[1;34m\nBuilding Contract Hash Data \033[0m"

cardano-cli transaction policyid --script-file contracts/perma_lock_contract.plutus > hashes/perma_lock.hash
echo -e "\033[1;33m Perma Lock Contract Hash: $(cat hashes/perma_lock.hash) \033[0m"

# end of build
echo -e "\033[1;32m\nBuilding Complete! \033[0m"