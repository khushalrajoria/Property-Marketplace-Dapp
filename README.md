1. ReentrancyGuard contract from OpenZeppelin, which helps prevent reentrancy attacks (a type of vulnerability).

2. event is used to log information on the blockchain. indexed allows filtering logs by the indexed fields.

3. mapping is like key values pairs

4. mapping(uint=>property) public properties - means that Properties can now be listed as uint values with id like _id=1 have details about one property and so on 2 have about second, basically making it an array that can store different values

5. modifier defines reusable code that can be applied to functions.

6.nonReentrant from ReentrancyGuard prevents reentrancy attacks.means protecting from calling the function multiple times before the initial execution is completed

7. memory means temporarily stored in memory but stored means storing it permanently in the blockchain

8. List property -> checks prize and location
		-> increment property count
		-> add property mapping wali cheez se
		-> updates property history, take timestamp, owner, and price
		-> emits property listed

9. buyproperty -> retrieves property
		-> checks if for sale
		-> adds record to history
		-> transfers from oldOwner to new using transfer function
		-> emits propertysold
10. remove prop -> checks if only property
		-> checks if listed is true
		-> emits it

11. buy stake -> takes two parameters - propertyID and stake%
	        -> applies valiedstake% and isnotdefaulter 
		-> checks if the sum of poperty.currentStake% and _stakePercetange does 49%	
		-> checks if amount of ether sent is equal to stakeprice
		-> makes a new stake - wahi mapping wala
		-> updates current %

12. sell stake ->take 3 para- propID, stake%,_price
		-> wahi valid %
		-> checks if investor has enough stake to sell
		-> updates stake sale price and sets stake for sale true

13. buyStakefrommarketplace -> allows buying from another investor
				-> takes seller  and propertyID and stake%
				-> checks same parameters as previous
				-> retrieves sales struck from seller
______________ pending

14. cancelStake -> only owner can cancel
		-> sets stake price to 0 toh it can't be sold now

15. distributeRewards -> checks onlypropertyonwer modifier
			-> checks if stakes are in pool
			-> It loops through all the listed properties (i = 1 to propertyCount).
			->For each property with stakes (property.currentStakePercentage > 0), it loops through each stake percentage (j = 1 to property.currentStakePercentage).
			 -> calculates reward my rewards per x stake%
			 -> transfer function 
16. applu penaltycount -> takes two - propertyID, investor
			->retrieves stake for investor and property
			-> calculates the penaltyAmount by taking the stake.percentage and multiplying it by the penaltyPercentage(which is set to 10 in this contract).
			-> reduces stake% by penaltyamount and from totalstake%
