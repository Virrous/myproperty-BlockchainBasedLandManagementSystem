// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Registry {
    struct Land {
        uint256 landId;
        uint256 landNumber;
        string landmark;
        uint256 area;
        string landType;
        string ownerName;
        string citizenshipNo;
        address currentOwner;
        bool isVerified;
        bool isTransferred;
    }

    uint256 public nextLandId = 1;
    mapping(uint256 => Land) public lands;
    address public officer;

    event LandRegistered(
        uint256 indexed landId,
        uint256 landNumber,
        string landmark,
        uint256 area,
        string landType,
        string ownerName,
        string citizenshipNo,
        address indexed owner
    );

    modifier onlyOfficer() {
        require(msg.sender == officer, "Only officer can register land");
        _;
    }

    constructor() {
        officer = msg.sender;
    }

    function registerLand(
        uint256 _landNumber,
        string memory _landmark,
        uint256 _area,
        string memory _landType,
        string memory _ownerName,
        string memory _citizenshipNo
    ) public onlyOfficer {
        lands[nextLandId] = Land({
            landId: nextLandId,
            landNumber: _landNumber,
            landmark: _landmark,
            area: _area,
            landType: _landType,
            ownerName: _ownerName,
            citizenshipNo: _citizenshipNo,
            currentOwner: msg.sender,
            isVerified: false,
            isTransferred: false
        });
        emit LandRegistered(
            nextLandId,
            _landNumber,
            _landmark,
            _area,
            _landType,
            _ownerName,
            _citizenshipNo,
            msg.sender
        );
        nextLandId++;
    }
   function getLandDetails(uint256 landId) public view returns (Land memory) {
    return lands[landId];
}
// function getLandDetails(uint256 landId) public view returns (string memory landmark, uint256 area, string memory landType) {
//     Land memory land = lands[landId];
//     return (land.landmark, land.area, land.landType);
// }
}
