

window.addEventListener('load', async () => {
  
  if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        
          await window.ethereum.enable();
        
      } catch (error) {
          console.error("User denied account access");
      }
  }
 
  else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider);
  }
 
  else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }


  let contractAddress = '0xdC4d4986F4159AF6EEa5e6baAcE0913e5e6756eD'; 


  let abi=[
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "propertyId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "location",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "PropertyListed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "propertyId",
          "type": "uint256"
        }
      ],
      "name": "PropertyRemoved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "propertyId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "salePrice",
          "type": "uint256"
        }
      ],
      "name": "PropertySold",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "propertyId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "percentage",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "investor",
          "type": "address"
        }
      ],
      "name": "StakeBought",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "propertyId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "percentage",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "investor",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "StakeListedForSale",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "propertyId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "percentage",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "investor",
          "type": "address"
        }
      ],
      "name": "StakeSaleCancelled",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "propertyId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "percentage",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        }
      ],
      "name": "StakeSold",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "hasBoughtStake",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "properties",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "location",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "currentStakePercentage",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "salePrice",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isForSale",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "isListed",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "propertyCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "propertyHistory",
      "outputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "stakePriceHistory",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "stakes",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "percentage",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "investor",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "salePrice",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "forSale",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_propertyId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_location",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_price",
          "type": "uint256"
        }
      ],
      "name": "listProperty",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_propertyId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_newPrice",
          "type": "uint256"
        }
      ],
      "name": "reSellProperty",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_propertyId",
          "type": "uint256"
        }
      ],
      "name": "buyProperty",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_propertyId",
          "type": "uint256"
        }
      ],
      "name": "cancelPropertySale",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_propertyId",
          "type": "uint256"
        }
      ],
      "name": "removeProperty",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_propertyId",
          "type": "uint256"
        }
      ],
      "name": "getPropertyHistory",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            }
          ],
          "internalType": "struct PropertyMarketplace.History[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_propertyId",
          "type": "uint256"
        }
      ],
      "name": "getProperty",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "location",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "currentStakePercentage",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "salePrice",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "isForSale",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isListed",
              "type": "bool"
            }
          ],
          "internalType": "struct PropertyMarketplace.Property",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_propertyId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_stakePercentage",
          "type": "uint256"
        }
      ],
      "name": "buyStake",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_propertyId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_price",
          "type": "uint256"
        }
      ],
      "name": "sellStake",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_propertyId",
          "type": "uint256"
        }
      ],
      "name": "buyStakeFromMarketplace",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_propertyId",
          "type": "uint256"
        }
      ],
      "name": "getStakePrice",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            }
          ],
          "internalType": "struct PropertyMarketplace.StakeHistory[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getPropertyCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllProperties",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "location",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "currentStakePercentage",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "salePrice",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "isForSale",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isListed",
              "type": "bool"
            }
          ],
          "internalType": "struct PropertyMarketplace.Property[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

 
  window.contract = new web3.eth.Contract(abi, contractAddress);

 
  
  await displayProperties();
  showPage('list-property');
});

function showPage(pageId) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

async function listProperty() {
  event.preventDefault(); 
  try {
      let accounts = await web3.eth.getAccounts();
      let account = accounts[0];
      
      const propertyId = document.getElementById('propertyId1').value;
      const location = document.getElementById('propertyLocation').value;
      const priceInEth = document.getElementById('propertyPrice').value;

      if (!propertyId || !location || !priceInEth) {
          throw new Error("Please fill in all the fields.");
      }

      const price = web3.utils.toWei(priceInEth, 'ether');

      console.log("Listing property with ID:", propertyId);
      console.log("Location:", location);
      console.log("Price (in wei):", price);

      await contract.methods.listProperty(propertyId, location, price).send({ from: account })
          .on('receipt', function(receipt) {
              console.log('Property listed successfully:', receipt);
              alert('Property listed successfully!');
              
          })
          .on('error', function(error) {
              console.error('Error listing property:', error);
              alert('Error listing property');
          });
  } catch (error) {
      console.error('Error in listProperty function:', error);
      alert(error.message);
  }
}
async function buyProperty() {
  event.preventDefault(); 
  try {
      let accounts = await web3.eth.getAccounts();
      let account = accounts[0];
      
      const propertyId = document.getElementById('propertyId2').value;
      
      const priceInEth = document.getElementById('buyPropertyAmount').value;

      const price = web3.utils.toWei(priceInEth, 'ether');
      

      console.log("Listing property with ID:", propertyId);
     
      console.log("Price (in wei):", price);

      await contract.methods.buyProperty(propertyId).send({ from: account, value: price })
          .on('receipt', function(receipt) {
              console.log('Property bought successfully:', receipt);
              alert('Property bought successfully!');
             
          })
          .on('error', function(error) {
              console.error('Error buying property:', error);
              alert('Error buying property');
          });
  } catch (error) {
      console.error('Error in buyProperty function:', error);
      alert(error.message);
  }
}
async function sellProperty() {
  event.preventDefault(); 
  try {
      let accounts = await web3.eth.getAccounts();
      let account = accounts[0];
      
      const propertyId = document.getElementById('propertyId3').value;
      
      const priceInEth = document.getElementById('sellPropertyAmount').value;

      const price = web3.utils.toWei(priceInEth, 'ether');
      

      console.log("Selling property with ID:", propertyId);
     
      console.log("Price (in wei):", price);

      await contract.methods.reSellProperty(propertyId,price).send({ from: account })
          .on('receipt', function(receipt) {
              console.log('Property listed for sale successfully:', receipt);
              alert('Property listed for sale successfully!');
              
          })
          .on('error', function(error) {
              console.error('Error selling property:', error);
              alert('Error selling property');
          });
  } catch (error) {
      console.error('Error in sellProperty function:', error);
      alert(error.message);
  }
}
async function buyStake() {
  event.preventDefault(); 
  try {
      let accounts = await web3.eth.getAccounts();
      let account = accounts[0];
      
      const propertyId = document.getElementById('stakePropertyId').value;
      
      const _stakePercentage = document.getElementById('stakePercentage').value;

      const priceInEth = document.getElementById('stakeAmount').value;

      const price = web3.utils.toWei(priceInEth, 'ether');
      

      console.log("buying Stake with ID:", propertyId);
     
      console.log("Price (in wei):", price);

      await contract.methods.buyStake(propertyId,_stakePercentage).send({ from: account, value: price })
          .on('receipt', function(receipt) {
              console.log('Stake bought successfully:', receipt);
              alert('Stake bought successfully!');
              
          })
          .on('error', function(error) {
              console.error('Error buying Stake:', error);
              alert('Error buying Stake');
          });
  } catch (error) {
      console.error('Error in buyStake function:', error);
      alert(error.message);
  }
}
async function sellStake() {
  event.preventDefault(); 
  try {
      let accounts = await web3.eth.getAccounts();
      let account = accounts[0];
      
      const propertyId = document.getElementById('listStakePropertyId').value;
     
      const priceInEth = document.getElementById('listStakePrice').value;

      
      const price = web3.utils.toWei(priceInEth, 'ether');

      console.log("Selling stake with ID:", propertyId);
     
      console.log("Price (in wei):", price);

      await contract.methods.sellStake(propertyId, price).send({ from: account })
          .on('receipt', function(receipt) {
              console.log('Stake sold successfully:', receipt);
              alert('Stake sold successfully!');
              
          })
          .on('error', function(error) {
              console.error('Error Selling Stake:', error);
              alert('Error selling Stake');
          });
  } catch (error) {
      console.error('Error in sellStake function:', error);
      alert(error.message);
  }
}

async function buyStakefromMarket() {
  event.preventDefault(); 
  try {
      let accounts = await web3.eth.getAccounts();
      let account = accounts[0];
      
      const propertyId = document.getElementById('buyStakeMarketplacePropertyId').value;
      
      

      const priceInEth = document.getElementById('buyStakeMarketplaceAmount').value;

      const price = web3.utils.toWei(priceInEth, 'ether');
      

      console.log("buying Stake from marketplace with ID:", propertyId);
     
      console.log("Price (in wei):", price);

      await contract.methods.buyStakeFromMarketplace(propertyId).send({ from: account, value: price })
          .on('receipt', function(receipt) {
              console.log('Stake bought successfully from marketplace:', receipt);
              alert('Stake from marketplace bought successfully!');
              
          })
          .on('error', function(error) {
              console.error('Error buying Stake from marketplace:', error);
              alert('Error buying Stake from marketplace');
          });
  } catch (error) {
      console.error('Error in buyStakefromMarket function:', error);
      alert(error.message);
  }
}

async function viewPropertyHistory() {
  event.preventDefault(); 

  const propertyId = document.getElementById('viewPropertyHistoryId').value;
  if (!propertyId) {
    alert('Please enter a property ID');
    return;
  }

  try {
    const history = await contract.methods.getPropertyHistory(propertyId).call();
    console.log(history);
    displayPropertyHistory(history);
    
  } catch (error) {
    console.error('Error fetching property history:', error);
    alert('Error fetching property history');
  }
}

function displayPropertyHistory(history) {
  
  const historyDiv = document.getElementById('property-history');
  historyDiv.innerHTML = ''; 

  if (history.length === 0) {
    historyDiv.innerHTML = '<p>No history available for this property.</p>';
    return;
  }

  const table = document.createElement('table');
  table.innerHTML = `
    <tr>
      <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Owner</th>
      <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Timestamp</th>
      <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Price</th>
    </tr>
  `;

  history.forEach(entry => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${entry.owner}</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${new Date(entry.timestamp * 1000).toLocaleString()}</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${web3.utils.fromWei(entry.price, 'ether')} ETH</td>
    `;
    table.appendChild(row);
  });

  historyDiv.appendChild(table);
}
async function viewProperty() {
  event.preventDefault();
  try {
    const propertyCount = await contract.methods.getPropertyCount().call();
    const properties = [];

    for (let i = 1; i <= propertyCount; i++) {
      const prop = await contract.methods.getProperty(i).call();
      properties.push(prop);
    }

    displayProperties(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    alert('Error fetching properties');
  }
}

function displayProperties(properties) {
  const propContainer = document.getElementById('properties');
  propContainer.innerHTML = ''; 

  if (!properties || properties.length === 0) {
    propContainer.innerHTML = '<p>No properties available.</p>';
    return;
  }

  properties.forEach(prop => {
    const propTile = document.createElement('div');
    propTile.classList.add('property-tile');

    propTile.innerHTML = `
      <h3>ID: ${prop.id}</h3>
      <p>Location: ${prop.location}</p>
      <p>Price: ${prop.price/1000000000000000000} ETH</p>
    `;

    propContainer.appendChild(propTile);
  });
}
