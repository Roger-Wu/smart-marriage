const contracts = {
  ItemToken: {
    address: '0xDB9c98EA1782Df345F75E36b8d35C265D95B2d97',

    abi: [
      {
        "constant": false,
        "inputs": [
          {
            "name": "_historyOwner",
            "type": "address"
          }
        ],
        "name": "addHistoryOwner",
        "outputs": [
          {
            "name": "message",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "agreeMarriage",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [
          {
            "name": "message",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
      },
      {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "wish",
        "outputs": [
          {
            "name": "message",
            "type": "string"
          }
        ],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "_addresses",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "askman",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "historyOwners",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "witness",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "yesman",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }
    ],
  }
};

var app = new Vue({
  el: '#app',
  data: {
    title: '智能婚約',
    description: 'Smart Marriage',
    owner: '',
    askman: '',
    yesman: '',
    witness: '',
    addr: '',
    message: '',
    isMetamaskInstalled: false,
    contractAddress: contracts.ItemToken.address,
    accountAddress: '',
    metamaskMsg: '請安裝並登入 MetaMask 以完整體驗此遊戲',
  },
  computed: {
    shortContractAddress: function() {
      return this.contractAddress.slice(0, 12) + '...';
    },
    shortOwner: function() {
      return (!this.owner) ? '' : this.owner.slice(0, 12) + '...';
    },
    shortaskman: function() {
      return (!this.askman) ? '' : this.askman.slice(0, 12) + '...';
    },
    shortyesman: function() {
      return (!this.yesman) ? '' : this.yesman.slice(0, 12) + '...';
    },
    shortwitness: function() {
      return (!this.witness) ? '' : this.witness.slice(0, 12) + '...';
    },
    // startingPriceInEth: function() {
    //   return (this.startingPrice / 1000000000000000000).toFixed(6);
    // },
    // priceInEth: function() {
    //   return (this.price / 1000000000000000000).toFixed(6);
    // },
    // nextPriceInEth: function() {
    //   return (this.nextPrice / 1000000000000000000).toFixed(6);
    // },
  },
  methods: {
    startApp: function() {
      const eth = new Eth(web3.currentProvider);
      this.itemTokenContract = eth.contract(contracts.ItemToken.abi).at(contracts.ItemToken.address);

      this.accountAddress = web3.eth.accounts[0];

      this.fetch();

      // this.fetchItemState(this.person.itemId);
    },
    fetch: function() {
      this.itemTokenContract.owner().then((result) => {
        console.log(result);
        this.owner = result[0];
      }).catch(() => {});
      this.itemTokenContract.askman().then((result) => {
        console.log(result);
        this.askman = result[0];
      }).catch(() => {});
      this.itemTokenContract.yesman().then((result) => {
        console.log(result);
        this.yesman = result[0];
      }).catch(() => {});
      this.itemTokenContract.witness().then((result) => {
        console.log(result);
        this.witness = result[0];
      }).catch(() => {});
    },
    // fetchItemState: function(itemId) {
    //   this.itemTokenContract.allOf(itemId).then((result) => {
    //     this.owner = result._owner;
    //     this.startingPrice = result._startingPrice; // BN -> number
    //     this.price = result._price; // BN -> number
    //     this.nextPrice = result._nextPrice; // BN -> number
    //   }).catch(() => {
    //     setTimeout(() => {
    //       // console.log('itemTokenContract.allOf error. retry in 1 second');
    //       this.fetchItemState(itemId);
    //     }, 1000);
    //   });
    // },
    // buy: function () {
    //   this.itemTokenContract.buy(this.person.itemId, { from: this.accountAddress, value: this.price }).catch((error) => {
    //     window.alert(this.metamaskMsg);
    //     console.log(error);
    //   }).then((result) => {
    //     console.log(result);
    //   });
    // },
    transferOwnership: function () {
      console.log(this.addr);
      this.itemTokenContract.transferOwnership(this.addr, { from: this.accountAddress, value: 0 }).catch((error) => {
        // window.alert(this.metamaskMsg);
        console.log(error);
      }).then((result) => {
        console.log(result);
        this.message = result.message;
      });
    },
  },
  mounted () {
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      this.isMetamaskInstalled = true;
      web3js = new Web3(web3.currentProvider);
      this.startApp();
    } else {
      window.alert(this.metamaskMsg)
    }
  },
});
