// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;


contract PropertyMarketplace  {
    

    struct Property {
        uint256 id;
        string location;
        uint256 price;
        address owner;
        uint256 currentStakePercentage; 
        uint256 salePrice;
        bool isForSale;
        bool isListed;
    }

    struct Stake {
        uint256 percentage;
        address investor;
        uint256 salePrice;
        bool forSale;
    }

    struct History {
        address owner;
        uint256 timestamp;
        uint256 price;
    }

    struct StakeHistory {
        uint256 timestamp;
        uint256 price;
    }

    uint256 public propertyCount;
    uint256  totalStakePercentage; 
   
    mapping(uint256 => Property) public properties;
    
    mapping(uint256 => History[]) public propertyHistory;
   mapping(uint256 => mapping(address => bool)) public hasBoughtStake;
    mapping(uint256 => Stake) public stakes; 
    mapping(uint256 => StakeHistory[]) public stakePriceHistory; 
   
    event PropertyListed(
        uint256  propertyId,
        string location,
        uint256 price
    );
    event PropertyRemoved(uint256 propertyId);
    event PropertySold(
        uint256 propertyId,
        address newOwner,
        uint256 salePrice
    );
    event StakeBought(
        uint256 propertyId,
        uint256 percentage,
        address investor
    );
    event StakeListedForSale(
        uint256 propertyId,
        uint256 percentage,
        address investor,
        uint256 price
    );
    event StakeSaleCancelled(
        uint256  propertyId,
        uint256 percentage,
        address investor
    );
    event StakeSold(
        uint256 propertyId,
        uint256 percentage,
        address seller,
        address buyer
    );


    modifier onlyPropertyOwner(uint256 _propertyId) {
        require(
            properties[_propertyId].owner == msg.sender,
            "Only owner can perform this action"
        );
        _;
    }

    modifier isValidStakePercentage(uint256 _stakePercentage) {
        require(
            _stakePercentage > 0 && _stakePercentage <= 49,
            "Invalid stake percentage"
        );
        _;
    }

   

    
function listProperty(uint256 _propertyId, string memory _location, uint256 _price) external  { 
  

    require(bytes(_location).length > 0, "Location cannot be null");
    require(_price > 0, "Price cannot be null");
    require(properties[_propertyId].id == 0, "Property ID already exists"); 

    properties[_propertyId] = Property({
        id: _propertyId, 
        location: _location,
        price: _price,
        owner: msg.sender,
        currentStakePercentage: 0,
        isListed: true,
        salePrice: _price,
        isForSale: true
    });
   
    propertyHistory[_propertyId].push(
        History({
            owner: msg.sender,
            timestamp: block.timestamp,
            price: _price
        })
    );
    propertyCount++;
    emit PropertyListed(_propertyId, _location, _price);
}
   



    function reSellProperty(uint256 _propertyId, uint256 _newPrice) external onlyPropertyOwner(_propertyId) {
       

        Property storage property = properties[_propertyId];
        require(!property.isForSale, "Property is already listed for sale");
        require(!property.isListed, "Property is already listed and not sold yet");

        property.isForSale = true;
        property.salePrice = _newPrice;
        property.isListed = true; 

        
        propertyHistory[_propertyId].push(
            History({
                owner: msg.sender,
                timestamp: block.timestamp,
                price: _newPrice
            })
        );

        emit PropertyListed(_propertyId, property.location, _newPrice); 
    }



    function buyProperty(uint256 _propertyId) external payable {
        
        Property storage property = properties[_propertyId];
        require(property.isForSale, "Property is not for sale");
        require(msg.value == property.salePrice, "Incorrect payment amount");

        address oldOwner = property.owner;
        uint256 salePrice = property.salePrice;

        property.owner = msg.sender;
        property.isForSale = false;
        property.salePrice = 0;
        property.isListed = false;

        
        propertyHistory[_propertyId].push(
            History({
                owner: msg.sender,
                timestamp: block.timestamp,
                price: salePrice
            })
        );

        payable(oldOwner).transfer(msg.value);
        emit PropertySold(_propertyId, msg.sender, salePrice);
    }

    function cancelPropertySale(
        uint256 _propertyId
    ) external onlyPropertyOwner(_propertyId) {
      
        Property storage property = properties[_propertyId];
        require(property.isForSale, "Property is not listed for sale");

        property.isForSale = false;
        property.salePrice = 0;

        emit PropertyRemoved(_propertyId);
    }

    function removeProperty(
        uint256 _propertyId
    ) external onlyPropertyOwner(_propertyId) {
        

        require(properties[_propertyId].isListed, "Property not listed");
        properties[_propertyId].isListed = false;
        properties[_propertyId].isForSale = false;
        emit PropertyRemoved(_propertyId);
    }

    function getPropertyHistory(
        uint256 _propertyId
    ) external view returns (History[] memory) {
        return propertyHistory[_propertyId];
    }

    function getProperty(
        uint256 _propertyId
    ) external view returns (Property memory) {
        return properties[_propertyId];
    }
    //stake logics

    function buyStake(uint256 _propertyId, uint256 _stakePercentage) external payable {
        Property storage property = properties[_propertyId];
        require(property.isListed, "Property not listed");
        require(!hasBoughtStake[_propertyId][msg.sender], "You already own a stake in this property");
        require(property.currentStakePercentage + _stakePercentage <= 50, "Exceeds available stake");

        uint256 stakePrice = (property.price * _stakePercentage) / 100;
        require(msg.value == stakePrice, "Incorrect payment amount");

       
        stakes[_propertyId] = Stake({
            percentage: _stakePercentage,
            investor: msg.sender,
            salePrice: 0,
            forSale: false
        });

        property.currentStakePercentage += _stakePercentage;
        hasBoughtStake[_propertyId][msg.sender] = true;

        stakePriceHistory[_propertyId].push(StakeHistory({timestamp: block.timestamp, price: stakePrice}));

        payable(property.owner).transfer(stakePrice);
        emit StakeBought(_propertyId, _stakePercentage, msg.sender);
    }

    function sellStake(uint256 _propertyId, uint256 _price) external {
        require(stakes[_propertyId].investor == msg.sender, "You don't own this stake");
        
        stakes[_propertyId].salePrice = _price;
        stakes[_propertyId].forSale = true;
        
        emit StakeListedForSale(_propertyId, stakes[_propertyId].percentage, msg.sender, _price);
    }

    function buyStakeFromMarketplace(uint256 _propertyId) external payable {
        Stake storage stake = stakes[_propertyId];
        require(stake.forSale, "Stake not for sale");
        require(msg.value == stake.salePrice, "Incorrect price");
        require(!hasBoughtStake[_propertyId][msg.sender], "You already own a stake in this property");

        payable(stake.investor).transfer(msg.value);

        stake.investor = msg.sender;
        stake.salePrice = 0;
        stake.forSale = false;
        hasBoughtStake[_propertyId][msg.sender] = true;
        
        emit StakeSold(_propertyId, stake.percentage, stake.investor, msg.sender);
    }

    

    function getStakePrice(
        uint256 _propertyId
    ) external view returns (StakeHistory[] memory) {
        return stakePriceHistory[_propertyId];
    }
    function getPropertyCount() public view returns (uint256) {
    return propertyCount;
}
    function getAllProperties() public view returns (Property[] memory) {
    Property[] memory allProperties = new Property[](propertyCount);
    for (uint256 i = 1; i <= propertyCount; i++) {
        allProperties[i - 1] = properties[i];
    }
    return allProperties;
}

 
}