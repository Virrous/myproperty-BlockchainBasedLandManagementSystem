// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LandRegistry {
    struct Land {
        uint256 landId;
        uint256 landNo;
        string landLocation;
        uint256 landArea;
        string landType;
        string ownerName;
        string citizenshipNo;
        address currentOwner;
        bool isVerified;
        bool isTransferred;
        uint256 price;
    }

    struct TransferRequest {
        uint256 landId;
        address newOwner;
        bool isPending;
        bool isApproved;
    }

    address public officer;
    uint256 public nextLandId = 1;
    mapping(uint256 => Land) public lands;
    mapping(uint256 => TransferRequest) public transferRequests;

    event LandRegistered(uint256 landId, address owner, string landLocation);
    event LandRegistrationRejected(uint256 landId, string reason);
    event TransferRequested(uint256 landId, address requestedBy, address newOwner);
    event TransferApproved(uint256 landId, address newOwner);
    event TransferRequestCancelled(uint256 landId);
    event LandVerified(uint256 landId, address verifiedBy);

    modifier onlyOfficer() {
        require(msg.sender == officer, "Only officer can perform this action");
        _;
    }

    modifier onlyOwner(uint256 landId) {
        require(lands[landId].currentOwner == msg.sender, "Only current owner can initiate transfer");
        _;
    }

    constructor() {
        officer = msg.sender;
    }

    function registerLand(
        uint256 _landNo,
        string memory _landLocation,
        uint256 _landArea,
        string memory _landType,
        string memory _ownerName,
        string memory _citizenshipNo,
        uint256 _price
    ) public {
        require(_landArea > 0, "Land area must be greater than 0");
        require(bytes(_landLocation).length > 0, "Land location cannot be empty");
        require(bytes(_ownerName).length > 0, "Owner name cannot be empty");
        require(bytes(_citizenshipNo).length > 0, "Citizenship number cannot be empty");
        require(_price > 0, "Price must be greater than 0");
        require(msg.sender != address(0), "Invalid sender address");
        
        lands[nextLandId] = Land({
            landId: nextLandId,
            landNo: _landNo,
            landLocation: _landLocation,
            landArea: _landArea,
            landType: _landType,
            ownerName: _ownerName,
            citizenshipNo: _citizenshipNo,
            currentOwner: msg.sender,
            isVerified: false,
            isTransferred: false,
            price: _price
        });

        emit LandRegistered(nextLandId, msg.sender, _landLocation);
        nextLandId++;
    }

    function requestTransfer(uint256 landId, address newOwner) public onlyOwner(landId) {
        require(lands[landId].isVerified, "Land must be verified before transfer");
        require(!transferRequests[landId].isPending, "Transfer request already pending");
        require(newOwner != address(0), "Invalid new owner address");
        require(newOwner != msg.sender, "Cannot transfer to self");

        transferRequests[landId] = TransferRequest({
            landId: landId,
            newOwner: newOwner,
            isPending: true,
            isApproved: false
        });

        emit TransferRequested(landId, msg.sender, newOwner);
    }

    function approveTransfer(uint256 landId) public onlyOfficer {
        TransferRequest storage request = transferRequests[landId];
        require(request.isPending, "No pending transfer request");
        require(!request.isApproved, "Transfer already approved");

        lands[landId].currentOwner = request.newOwner;
        lands[landId].isTransferred = true;
        request.isPending = false;
        request.isApproved = true;

        emit TransferApproved(landId, request.newOwner);
    }

    function cancelTransferRequest(uint256 landId) public onlyOwner(landId) {
        TransferRequest storage request = transferRequests[landId];
        require(request.isPending, "No pending transfer request");
        require(!request.isApproved, "Transfer already approved");

        delete transferRequests[landId];
        emit TransferRequestCancelled(landId);
    }

    function verifyLand(uint256 landId) public onlyOfficer {
        Land storage land = lands[landId];
        require(!land.isVerified, "Land is already verified");
        require(land.landArea > 0, "Invalid land area");
        require(bytes(land.landLocation).length > 0, "Invalid land location");

        land.isVerified = true;
        emit LandVerified(landId, msg.sender);
    }

    function revokeVerification(uint256 landId) public onlyOfficer {
        Land storage land = lands[landId];
        require(land.isVerified, "Land is not verified");
        require(!land.isTransferred, "Cannot revoke verification of transferred land");
        
        land.isVerified = false;
        emit LandVerified(landId, msg.sender);
    }

    function updateLandPrice(uint256 landId, uint256 newPrice) public onlyOwner(landId) {
        require(newPrice > 0, "Price must be greater than 0");
        lands[landId].price = newPrice;
    }

    function getLandDetails(uint256 landId) public view returns (Land memory) {
        return lands[landId];
    }

    function getTransferRequestDetails(uint256 landId) public view returns (TransferRequest memory) {
        return transferRequests[landId];
    }
}
