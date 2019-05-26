
App = {

  web3Provider: null,
  contracts: {},
  account: 0x0,
  loading: false,


  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
   
    if(typeof web3 !== 'undefined') {
      
      App.web3Provider = web3.currentProvider;
    } else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
      }
    web3 = new Web3(App.web3Provider);
   

    App.displayAccountInfo();

    return App.initContract();
  },

  displayAccountInfo: function() {
    web3.eth.getCoinbase(function(err, account) {
      if(err === null) {
        App.account = account;
        $('#account').text(account);
       // App.enable();

        web3.eth.getBalance(account, function(err, balance) {
          if(err === null) {
            $('#accountBalance').text(web3.fromWei(balance, "ether") + " ETH");
          }
        })
      }
    });
  },

  initContract: function() {
     // var chainListArtifact = require('ChainList.json');
    // const json = require('');
   // ChainList = 'ChainList.json';

    $.getJSON('ChainList.json', function(chainListArtifact) {
      // get the contract artifact file and use it to instantiate a truffle contract abstraction
      App.contracts.ChainList = TruffleContract(chainListArtifact);
      // set the provider for our contracts
      App.contracts.ChainList.setProvider(App.web3Provider);
      // listen to events
      App.listenToEvents();
      // retrieve the project from contract
      return App.reloadProjects();
    });
  },

  reloadProjects: function() {
   
    if(App.loading) {
      return;
    }
    App.loading = true;

    
    App.displayAccountInfo();

    var chainListInstance;

    App.contracts.ChainList.deployed().then(function(instance) {
      chainListInstance = instance;
      return chainListInstance.getProjectsForSale();
    }).then(function(projectIds) {
    //project placeholder retrieved and cleared 
      $('#projectsRow').empty();

      for(var i = 0; i < projectIds.length; i++) {
        var projectId = projectIds[i];
        chainListInstance.projects(projectId.toNumber()).then(function(project){
          App.displayProject(project[0], project[1], project[3], project[4], project[5]);
        });
      }
      App.loading = false;
    }).catch(function(err) {
      console.error(err.message);
      App.loading = false;
    });
  },

  displayProject: function(id, seller, name, description, price) {
    var projectsRow = $('#projectsRow');

    var etherPrice = web3.fromWei(price, "ether");

    var projectTemplate = $("#projectTemplate");
    projectTemplate.find('.panel-title').text(name);
    projectTemplate.find('.project-description').text(description);
    projectTemplate.find('.project-price').text(etherPrice + " ETH");
    projectTemplate.find('.btn-buy').attr('data-id', id);
    projectTemplate.find('.btn-buy').attr('data-value', etherPrice);

    // seller
    if (seller == App.account) {
      projectTemplate.find('.project-seller').text("You");
      projectTemplate.find('.btn-buy').hide();
    } else {
      projectTemplate.find('.project-seller').text(seller);
      projectTemplate.find('.btn-buy').show();
    }

    
    projectsRow.append(projectTemplate.html());
  },

  sellProject: function() {
    
    var _project_name = $('#project_name').val();
    var _description = $('#project_description').val();
    var _price = web3.toWei(parseFloat($('#project_price').val() || 0), "ether");

    if((_project_name.trim() == '') || (_price == 0)) {
      // nothing to sell
      return false;
    }

    App.contracts.ChainList.deployed().then(function(instance) {
      return instance.sellProject(_project_name, _description, _price, {
        from: App.account,
        gas: 500000
      });
    }).then(function(result) {

    }).catch(function(err) {
      console.error(err);
    });
  },

  // listen to events triggered by the contract
  listenToEvents: function() {
    App.contracts.ChainList.deployed().then(function(instance) {
      instance.LogSellProject({}, {}).watch(function(error, event) {
        if (!error) {
          $("#events").append('<li class="list-group-item">' + event.args._name + ' is now for sale</li>');
        } else {
          console.error(error);
        }
        App.reloadProjects();
      });

      instance.LogBuyProject({}, {}).watch(function(error, event) {
        if (!error) {
          $("#events").append('<li class="list-group-item">' + event.args._buyer + ' bought ' + event.args._name + '</li>');
        } else {
          console.error(error);
        }
        App.reloadProjects();
      });
    });
  },

  buyProject: function() {
    event.preventDefault();

    var _projectId = $(event.target).data('id');
    var _price = parseFloat($(event.target).data('value'));

    App.contracts.ChainList.deployed().then(function(instance){
      return instance.buyProject(_projectId, {
        from: App.account,
        value: web3.toWei(_price, "ether"),
        gas: 500000
      });
    }).catch(function(error) {
      console.error(error);
    });
  }
};

// $(function() {
//   $(window).load(function() {
//     App.init();
//   });

  $(window).on("load", function () {
    App.init();
});




