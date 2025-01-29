// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LandTransfer {
    struct Land {
        string owner;
        string ownerCitizenship;
        string ownerAddress;
        string landNumber;
        string landArea;
        string taxClearance;
        string location;
    }

    mapping(uint256 => Land) public lands;
    uint256 public landCount;

    event LandRegistered(uint256 landId, string owner);

    // Function to register land details
    function registerLand(
        string memory owner,
        string memory ownerCitizenship,
        string memory ownerAddress,
        string memory landNumber,
        string memory landArea,
        string memory taxClearance,
        string memory location
    ) public {
        landCount++;
        lands[landCount] = Land(
            owner,
            ownerCitizenship,
            ownerAddress,
            landNumber,
            landArea,
            taxClearance,
            location
        );

        emit LandRegistered(landCount, owner);
    }

    // Function to retrieve land details
    function getLandDetails(uint256 landId)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        Land memory land = lands[landId];
        return (
            land.owner,
            land.ownerCitizenship,
            land.ownerAddress,
            land.landNumber,
            land.landArea,
            land.taxClearance,
            land.location
        );
    }
}
